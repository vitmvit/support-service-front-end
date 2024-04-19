import {NgStyle} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {UserCreateDto} from '../../../../model/dto/user.create.dto';
import {ErrorModel} from '../../../../model/entity/error.model';
import {UserModel} from "../../../../model/entity/user.model";
import {SessionService} from "../../../../service/session.service";
import {UserService} from "../../../../service/user.service";
import {MenuComponent} from "../../menu/menu/menu.component";

@Component({
  selector: 'app-cabinet-page-control-user-create',
  standalone: true,
  imports: [
    MenuComponent,
    FormsModule,
    NgStyle
  ],
  templateUrl: './cabinet-page-control-user-create.component.html',
  styleUrl: './cabinet-page-control-user-create.component.css'
})
export class CabinetPageControlUserCreateComponent implements OnInit {

  itemName = "control-page";

  user!: UserModel;
  role!: string;
  errorModel!: ErrorModel | undefined;

  newLogin!: string;
  newPassword!: string;
  newPasswordConfirm!: string;
  newRole!: string;

  openRoles!: string[]

  displayStyle = "none";

  constructor(private sessionService: SessionService,
              private userService: UserService) {
    sessionService.checkSession();
  }

  ngOnInit(): void {
    this.openRoles = ["ADMIN", "SUPPORT"]

    this.newLogin = "";
    this.newPassword = "";
    this.newPasswordConfirm = "";
    this.newRole = "";

    this.getMe();
  }

  createUser(){
    this.errorModel = undefined
    // Проверка заполнения всех полей
    if (this.newLogin != "" && this.newPassword != "" && this.newPasswordConfirm != "" && this.newRole != ""){
      this.userService.createUser(new UserCreateDto(this.newLogin, this.newPassword, this.newPasswordConfirm, this.newRole)).subscribe({
        next: (response) => {
          this.newLogin = "";
          this.newPassword = "";
          this.newPasswordConfirm = "";
          this.newRole = "";
        },
        error: (fault) =>
        {
          // Проверка ошибок ввода данных
          if (this.newLogin == "" || this.newPassword == "" || this.newPasswordConfirm == "" || this.newRole == ""){
            this.errorModel = new ErrorModel("Необходимо заполнить все поля!", 404);
          }else if(this.newPassword != this.newPasswordConfirm){
            this.errorModel = new ErrorModel("Перепроверьте пароль!", fault.status);
          }
        }
      });
    } else{
      this.errorModel = new ErrorModel("Необходимо заполнить все поля!", 404);
    }
    this.closePopup()
  }

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

  openPopup() {
    // Проверка заполнения всех полей
    if (this.newLogin != "" && this.newPassword != "" && this.newPasswordConfirm != "" && this.newRole != ""){
      this.displayStyle = "block";
    } else{
      this.errorModel = new ErrorModel("Необходимо заполнить все поля!", 404);
    }
  }

  closePopup() {
    this.displayStyle = "none";
  }
}
