import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {SessionService} from "./session.service";
import {ChatModel} from "../model/entity/chat.model";
import {MessageCreateDto} from "../model/dto/message.create.dto";
import {ApiService} from "./api.service";


@Injectable({providedIn: "root"})
export class ChatService {

    constructor(private httpClient: HttpClient,
                private apiService: ApiService,
                private sessionService: SessionService) {
    }

    // Получить чаты, связанные с определенным пользователем поддержки
    getMyChats(name: string): Observable<ChatModel[]> {
        return this.httpClient.get<ChatModel[]>(
            this.apiService.getApiHost + "/api/v1/chats/supportName/" + name,
            this.sessionService.getHeaderToken()
        );
    }

    // Получить чат по его идентификатору
    getChatById(id: number): Observable<ChatModel> {
        return this.httpClient.get<ChatModel>(
            this.apiService.getApiHost + "/api/v1/chats/" + id,
            this.sessionService.getHeaderToken()
        );
    }

    // Получить чаты, связанные с определенным пользователем и пользователем поддержки
    getChatsByUserName(name: string, supportName: string): Observable<ChatModel[]> {
        return this.httpClient.get<ChatModel[]>(
            this.apiService.getApiHost + "/api/v1/chats/userName/like/" + name + "/" + supportName,
            this.sessionService.getHeaderToken()
        );
    }

    // Получить свободные чаты
    getFreeChats(): Observable<ChatModel[]> {
        return this.httpClient.get<ChatModel[]>(
            this.apiService.getApiHost + "/api/v1/chats/status/SUPPORT/FREE",
            this.sessionService.getHeaderToken()
        );
    }

    getSupportChats(): Observable<ChatModel[]> {
        return this.httpClient.get<ChatModel[]>(
            this.apiService.getApiHost + "/api/v1/chats/type/SUPPORT",
            this.sessionService.getHeaderToken()
        );
    }

    // Создать новое сообщение в чате
    createMessage(model: MessageCreateDto): Observable<MessageCreateDto> {
        return this.httpClient.post<MessageCreateDto>(
            this.apiService.getApiHost + "/api/v1/chats/messages", model,
            this.sessionService.getHeaderToken()
        );
    }

    // Назначить пользователя поддержки для чата
    setSupport(id: number, login: string): Observable<ChatModel> {
        return this.httpClient.post<ChatModel>(
            this.apiService.getApiHost + "/api/v1/chats/support/" + id + "/" + login,
            this.sessionService.getHeaderToken()
        );
    }

    // Установить статус "OPEN" для чата
    setStatusToOpen(id: number): Observable<ChatModel> {
        return this.httpClient.post<ChatModel>(
            this.apiService.getApiHost + "/api/v1/chats/status/" + id + "/OPEN",
            this.sessionService.getHeaderToken()
        );
    }

    // Установить статус "CLOSED" для чата
    setStatusToClose(id: number): Observable<ChatModel> {
        return this.httpClient.post<ChatModel>(
            this.apiService.getApiHost + "/api/v1/chats/status/" + id + "/CLOSED",
            this.sessionService.getHeaderToken()
        );
    }
}
