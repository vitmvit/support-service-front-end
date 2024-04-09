import {NgIf, NgStyle} from '@angular/common';
import {Component, HostListener, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ChatModel} from '../../../../model/entity/chat.model';
import {MessageCreateDto} from '../../../../model/dto/message.create.dto';
import {MessageModel} from '../../../../model/entity/message.model';
import {UserModel} from "../../../../model/entity/user.model";
import {ChatService} from '../../../../service/chat.service';
import {SessionService} from "../../../../service/session.service";
import {UserService} from "../../../../service/user.service";
import {MenuComponent} from "../../menu/menu/menu.component";

@Component({
  selector: 'app-cabinet-page-chat',
  standalone: true,
  imports: [
    MenuComponent,
    NgIf,
    NgStyle,
    FormsModule],
  templateUrl: './cabinet-page-chat.component.html',
  styleUrl: './cabinet-page-chat.component.css'
})
export class CabinetPageChatComponent implements OnInit{
  itemName = "message-page";

  user!: UserModel;
  role!: string;
  id!: number;
  currentChat!: ChatModel;
  listMessages!: MessageModel[];
  currentUsername!: string;
  currentSupport!: string;
  newMessage!: string;

  windowH!: number;
  windowW!: number;
  headerH!: number;
  chatH!: number;
  sendH!: number;
  elem!: HTMLElement;
  send!: HTMLElement;

  private refreshIntervalId: any;

  displayStyle = "none";

  constructor(private sessionService: SessionService,
              private userService: UserService,
              private chatService: ChatService,
              private router: Router,
              private route: ActivatedRoute
  ) {
    sessionService.checkSession();
    route.params.subscribe(params => this.id = params["id"]);
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.reloadPage();
  }

  // После инициализации представления компонента
  ngAfterViewInit() {
    // @ts-ignore
    this.elem = document.getElementById("header"); // Получаем элемент заголовка
    this.headerH = this.elem.offsetHeight // Получаем высоту заголовка
    // @ts-ignore
    this.send = document.getElementById("send"); // Получаем элемент отправки сообщения
    this.sendH = this.send.offsetHeight // Получаем высоту элемента отправки
    this.chatH = this.windowH - this.headerH - this.sendH // Вычисляем высоту чата
  }

  ngOnInit(): void {
    this.newMessage = ""

    this.getMe();
    this.getChat();

    // Устанавливаем интервал обновления каждую секунду
    this.refreshIntervalId = setInterval(() => {
      this.getChat();
    }, 1000);

    this.windowH = window.screen.height; // Получаем высоту окна
    this.windowW = window.screen.width; // Получаем ширину окна
  }

  // Создание сообщения
  createMessage(){
    if(this.newMessage != ""){
      this.chatService.createMessage(new MessageCreateDto(this.currentChat.id, this.currentSupport, this.newMessage)).subscribe({
        next: (newMessage) => {
          this.newMessage = ""
          this.getChat();
        }
      });
    }
  }

  // Получение чата по идентификатору
  getChat(){
    this.chatService.getChatById(this.id).subscribe({
      next: (chatModel) => {
        this.listMessages = chatModel.messageList
        this.currentUsername = chatModel.userName
        this.currentSupport = chatModel.supportName
        this.currentChat = chatModel
        this.toDate()
      }
    });
  }

  toDate() {
    for (let i = 0; i < this.listMessages.length; i++) {
      this.listMessages[i].createDate = new Date(this.listMessages[i].createDate).toLocaleString()
    }
  }

  // Переход к списку чатов
  toChats() {
    this.router.navigateByUrl('auth/cabinet/message');
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

  openPopup() {
    this.displayStyle = "block";
  }

  closePopup() {
    this.displayStyle = "none";
  }

  // Закрытие диалога
  closeDialog() {
    this.chatService.setStatusToClose(this.currentChat.id).subscribe({
      next: (chatModel2) => {
        this.reloadPage()
      }
    });
    this.closePopup()
  }

  reloadPage(): void {
    window.location.reload();
  }
}