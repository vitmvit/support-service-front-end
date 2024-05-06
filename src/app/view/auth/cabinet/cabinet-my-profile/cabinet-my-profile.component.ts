import {Component, OnInit} from '@angular/core';
import {SessionService} from "../../../../service/session.service";
import {UserModel} from "../../../../model/entity/user.model";
import {UserService} from "../../../../service/user.service";
import {MenuComponent} from "../../menu/menu/menu.component";
import {NgStyle} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {PasswordUpdateDto} from "../../../../model/dto/password.updare.dto";
import {Router} from '@angular/router';
import {ErrorModel} from '../../../../model/entity/error.model';

@Component({
  selector: 'app-cabinet-my-profile',
  standalone: true,
  imports: [
    MenuComponent,
    NgStyle,
    FormsModule
  ],
  templateUrl: './cabinet-my-profile.component.html',
  styleUrl: './cabinet-my-profile.component.css'
})
export class CabinetMyProfileComponent implements OnInit {

  itemName = "my-profile";

  user!: UserModel;
  role!: string;

  oldPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  errorModel!: ErrorModel | undefined;

  displayStyle = "none";

  constructor(private sessionService: SessionService,
              private router: Router,
              private userService: UserService) {
    sessionService.checkSession();
  }

  ngOnInit(): void {
    this.oldPassword = "";
    this.newPassword = "";
    this.confirmPassword = "";
    this.errorModel = undefined

    this.getMe();
  }

  // Получение информации о текущем пользователе
  getMe() {
    this.userService.me(this.sessionService.getLogin()).subscribe({
      next: (response) => {
        this.user = response;
        this.role = response.role;
      },
      error: () => {
        this.sessionService.logOff();
      }
    });
  }

  // Метод для изменения пароля
  editPassword() {
    this.errorModel = undefined
    if (this.oldPassword != "" && this.newPassword != "" && this.confirmPassword != "") {
      this.userService.passwordUpdate(new PasswordUpdateDto(this.sessionService.getLogin(), this.oldPassword, this.newPassword, this.confirmPassword)).subscribe({
        next: (response) => {
          this.closePopup();
          this.logOff();
        },
        error: (fault) => {
          if (fault.status == 500) {
            this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault.status);
          } else {
            this.errorModel = new ErrorModel("Перепроверьте данные!", fault.status)
          }
        }
      });
    } else {
      this.errorModel = new ErrorModel("Необходимо заполнить все поля!", 404)
    }
  }

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  logOff() {
    this.sessionService.clear();
    this.router.navigateByUrl('index');
  }

  reloadPage(): void {
    window.location.reload();
  }
}
