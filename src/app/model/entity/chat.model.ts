import {MessageModel} from "./message.model";

export class ChatModel {

  public id: number; // Идентификатор чата
  public supportName: string; // Имя поддержки
  public userName: string; // Имя пользователя
  public messageList: MessageModel[]; // Список сообщений
  public status: string; // Статус чата
  public createDate: Date; // Дата создания
  public updateDate: Date; // Дата обновления

  constructor(id: number,
              supportName: string,
              userName: string,
              messageList: MessageModel[],
              status: string,
              createDate: Date,
              updateDate: Date) {
    this.id = id;
    this.supportName = supportName;
    this.userName = userName;
    this.messageList = messageList;
    this.status = status;
    this.createDate = createDate;
    this.updateDate = updateDate;
  }
}
