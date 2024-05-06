import {NgStyle} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErrorModel} from '../../../../model/entity/error.model';
import {UserModel} from '../../../../model/entity/user.model';
import {SessionService} from '../../../../service/session.service';
import {UserService} from '../../../../service/user.service';
import {MenuComponent} from '../../menu/menu/menu.component';

@Component({
  selector: 'app-cabinet-page-control-user-delete',
  standalone: true,
  imports: [
    MenuComponent,
    FormsModule,
    NgStyle
  ],
  templateUrl: './cabinet-page-control-user-delete.component.html',
  styleUrl: './cabinet-page-control-user-delete.component.css'
})
export class CabinetPageControlUserDeleteComponent implements OnInit{

  itemName = "control-page";

  user!: UserModel;
  role!: string;
  searchLogin!: string;
  searchRole!: string;
  openRoles!: string[];
  findUser!: UserModel | undefined;
  loginToDelete!: string;
  errorModel!: ErrorModel | undefined;

  displayStyle = "none";

  constructor(private sessionService: SessionService,
              private userService: UserService) {
    sessionService.checkSession();
  }

  ngOnInit(): void {
    this.openRoles = ["ADMIN", "SUPPORT", "USER", "VET"]
    this.searchRole = "";
    this.searchLogin = "";
    this.findUser = undefined

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

  // Поиск пользователя
  searchUser(){
    this.errorModel = undefined
    this.findUser = undefined
    // Проверка заполнения всех полей
    if(this.searchLogin != "" && this.searchRole != ""){
      this.userService.findUserByLoginAndRole(this.searchLogin, this.searchRole).subscribe({
        next: (response) => {
          this.findUser = response
          this.loginToDelete = response.login
        },
        error: (fault) => {
          if(fault.status == 500){
            this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault.status);
          }
        }
      });
    }else{
      this.errorModel = new ErrorModel("Необходимо заполнить все поля!", 404);
    }
  }

  // Удаление пользователя
  deleteUser(){
    this.userService.deleteUserByLogin(this.searchLogin).subscribe({
      next: () => {
        this.closePopup()
        this.reloadPage()
      },
      error: (fault) => {
        this.closePopup()
        this.errorModel = new ErrorModel("вы не можете удалить свой аккаунт!", fault.status);
      }
    });
  }

  openPopup() {
    if (this.searchLogin != "" && this.searchRole != ""){
      this.displayStyle = "block";
    } else{
      this.errorModel = new ErrorModel("Необходимо заполнить все поля!", 404);
    }
  }

  closePopup() {
    this.displayStyle = "none";
  }

  reloadPage(): void {
    window.location.reload();
  }
}
