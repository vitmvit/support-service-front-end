import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../../model/entity/user.model";
import {ChatModel} from "../../../../model/entity/chat.model";
import {SessionService} from "../../../../service/session.service";
import {UserService} from "../../../../service/user.service";
import {ChatService} from "../../../../service/chat.service";
import {MenuComponent} from "../../menu/menu/menu.component";

@Component({
  selector: 'app-cabinet-page-general-messages',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './cabinet-page-general-messages.component.html',
  styleUrl: './cabinet-page-general-messages.component.css'
})
export class CabinetPageGeneralMessagesComponent implements OnInit {

  itemName = "general-message-page";

  user!: UserModel;
  role!: string;
  login!: string;
  chats!: ChatModel[];

  constructor(private sessionService: SessionService,
              private userService: UserService,
              private chatService: ChatService
  ) {
  }

  ngOnInit(): void {
    this.getMe();
    // Получение списка свободных чатов
    this.chatService.getFreeChats().subscribe({
      next: (chatModel) => {
        this.chats = chatModel
      }
    });
  }

  // Назначение поддержки чату
  setSupport(id: number): void {
    this.chatService.setSupport(id, this.sessionService.getLogin()).subscribe({
      next: (chatModel1) => {
        console.log(chatModel1.supportName)
        this.chatService.setStatusToOpen(id).subscribe({
          next: (chatModel2) => {
            console.log(chatModel2.status)
            this.reloadPage()
          }
        });
      }
    });
  }

  // Получение информации о текущем пользователе
  getMe() {
    this.userService.me(this.sessionService.getLogin()).subscribe({
      next: (response) => {
        this.user = response;
        this.role = response.role;
        this.login = response.login;

      },
      error: () => {
        this.sessionService.logOff();
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}


