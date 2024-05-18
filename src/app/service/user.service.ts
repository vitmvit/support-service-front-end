import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserModel} from "../model/entity/user.model";
import {SessionService} from "./session.service";
import {PasswordUpdateDto} from "../model/dto/password.updare.dto";
import {UserCreateDto} from "../model/dto/user.create.dto";
import {ApiService} from "./api.service";


@Injectable({providedIn: "root"})
export class UserService {

    constructor(private httpClient: HttpClient,
                private apiService: ApiService,
                private sessionService: SessionService) {
    }

    // Метод для получения информации о текущем пользователе
    me(login: string): Observable<UserModel> {
        return this.httpClient.get<UserModel>(
            this.apiService.getApiHost + "/api/v1/users/" + login,
            this.sessionService.getHeaderToken()
        );
    }

    // Метод для обновления пароля пользователя
    passwordUpdate(dto: PasswordUpdateDto): Observable<UserModel> {
        return this.httpClient.put<UserModel>(
            this.apiService.getApiHost + "/api/v1/users/password",
            dto,
            this.sessionService.getHeaderToken()
        );
    }

    // Метод для создания нового пользователя
    createUser(dto: UserCreateDto): Observable<UserModel> {
        return this.httpClient.post<UserModel>(
            this.apiService.getApiHost + "/api/v1/admin",
            dto,
            this.sessionService.getHeaderToken()
        );
    }

    // Метод для поиска пользователя по логину и роли
    findUserByLoginAndRole(login: string, role: string): Observable<UserModel> {
        return this.httpClient.get<UserModel>(
            this.apiService.getApiHost + "/api/v1/admin/" + login + "/" + role,
            this.sessionService.getHeaderToken()
        );
    }

    // Метод для удаления пользователя по логину
    deleteUserByLogin(login: string): Observable<void> {
        return this.httpClient.delete<void>(
            this.apiService.getApiHost + "/api/v1/admin/" + login,
            this.sessionService.getHeaderToken()
        );
    }
}
