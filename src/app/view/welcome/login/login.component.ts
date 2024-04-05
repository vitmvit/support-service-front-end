import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../service/session.service";
import {SignService} from "../../../service/sign.service";
import {SignInModel} from "../../../model/entity/sign.in.model";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {ErrorModel} from "../../../model/entity/error.model";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgIf} from '@angular/common';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from "../../../service/user.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterLinkActive
  ]
})
export class LoginComponent implements OnInit {

  login!: string;
  password!: string;
  errorModel!: ErrorModel | undefined;

  constructor(private signService: SignService,
              private sessionService: SessionService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.errorModel = undefined
  }

  // Метод для перехода на страницу index
  index(): void {
    this.router.navigateByUrl('index');
  }

  // Метод для выполнения аутентификации
  signIn(): void {
    let user = new SignInModel(this.login, this.password);
    this.signService.signIn(user).subscribe({
      next: (tokenModel) => {
        // Получение роли из токена
        const role = this.getRoleInToken(tokenModel.accessToken)
        if (role != 'USER') {
          // Получение логина из токена
          const login = this.getLoginInToken(tokenModel.accessToken)
          if (login == this.login) {
            this.sessionService.setToken(tokenModel.accessToken);
            this.userService.me(login).subscribe({
              next: (user) => {
                if (user !== undefined) {
                  this.sessionService.setLogin(user.login);
                  this.router.navigateByUrl('auth/cabinet');
                }
              },
              error: (fault2) => {
                this.errorModel = new ErrorModel("Double check your details!", fault2.status);
              }
            });
          }
        } else {
          this.errorModel = new ErrorModel("No access!", 302);
        }
      },
      error: (fault1) => {
        this.errorModel = new ErrorModel("Double check your details!", fault1.status);
      }
    });
  }

  // Метод для получения логина из JWT-токена
  getLoginInToken(tkn: string): string {
    const helper = new JwtHelperService();
    const jsonToken = JSON.stringify(helper.decodeToken(tkn));
    const jsonParse = JSON.parse(jsonToken);
    const sub = jsonParse["sub"];
    return sub == null ? "" : sub;
  }

  // Метод для получения роли из JWT-токена
  getRoleInToken(tkn: string): string {
    const helper = new JwtHelperService();
    const jsonToken = JSON.stringify(helper.decodeToken(tkn))
    const jsonParse = JSON.parse(jsonToken)
    return jsonParse["role"]
  }
}
