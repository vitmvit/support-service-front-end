import {DatePipe} from "@angular/common";

export class MessageModel {

  public id: number; // Идентификатор сообщения
  public chatId: number; // Идентификатор чата
  public senderName: string; // Имя отправителя
  public content: string; // Содержимое сообщения
  public createDate: DatePipe; // Дата создания сообщения

  constructor(id: number,
              chatId: number,
              senderName: string,
              content: string,
              createDate: DatePipe) {
    this.id = id;
    this.chatId = chatId;
    this.senderName = senderName;
    this.content = content;
    this.createDate = createDate;
  }
}
