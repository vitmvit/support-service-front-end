import {Component, OnInit} from '@angular/core';
import {UserModel} from "../../../../model/entity/user.model";
import {SessionService} from "../../../../service/session.service";
import {UserService} from "../../../../service/user.service";
import {MenuComponent} from "../../menu/menu/menu.component";
import {ChatService} from "../../../../service/chat.service";
import {ChatModel} from "../../../../model/entity/chat.model";
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {Router} from '@angular/router';
import {ActuatorService} from "../../../../service/actuator.service";

@Component({
    selector: 'app-cabinet-page-messages',
    standalone: true,
    imports: [
        MenuComponent,
        FormsModule,
        ReactiveFormsModule],
    templateUrl: './cabinet-page-messages.component.html',
    styleUrl: './cabinet-page-messages.component.css'
})
export class CabinetPageMessagesComponent implements OnInit {

    itemName = "message-page";

    user!: UserModel;
    role!: string;
    login!: string;
    chats!: ChatModel[];
    userName!: string;

    constructor(private sessionService: SessionService,
                private userService: UserService,
                private chatService: ChatService,
                private actuatorService: ActuatorService,
                private router: Router
    ) {
        this.actuatorService.getHealthService().subscribe({
            error: () => {
                this.router.navigateByUrl('page500');
            }
        })
    }

    ngOnInit(): void {
        this.getMe();
        // Получение списка чатов пользователя
        this.chatService.getMyChats(this.sessionService.getLogin()).subscribe({
            next: (chatModel) => {
                this.chats = chatModel.sort((a, b) => {
                    return new Date(b.updateDate).getTime() - new Date(a.updateDate).getTime();
                });
                this.chats = chatModel.sort((a, b) => b.status.localeCompare(a.status));
                this.toDate()
            }
        });
    }

    toDate() {
        for (let i = 0; i < this.chats.length; i++) {
            this.chats[i].createDate = new Date(this.chats[i].createDate).toLocaleString()
            this.chats[i].updateDate = new Date(this.chats[i].updateDate).toLocaleString()
        }
    }

    // Переход к чату
    toChat(id: number) {
        this.router.navigate(['/auth/cabinet/chat', id]);
    }

    // Получение списка чатов пользователя
    getMyChat() {
        this.chatService.getMyChats(this.sessionService.getLogin()).subscribe({
            next: (chatModel) => {
                this.chats = chatModel
            }
        });
    }

    // Поиск чатов по имени пользователя
    search() {
        this.chatService.getChatsByUserName(this.userName, this.user.login).subscribe({
            next: (chatModel) => {
                this.chats = chatModel
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
}
