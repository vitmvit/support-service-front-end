import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {AnimalTypeModel} from "../model/entity/animal.type.model";
import {AnimalTypeCreateDto} from "../model/dto/animal.type.create.dto";
import {AnimalTypeUpdateDto} from "../model/dto/animal.type.update.dto";
import {ApiService} from "./api.service";

@Injectable({providedIn: "root"})
export class AnimalTypeService {

    constructor(private httpClient: HttpClient,
                private apiService: ApiService,
                private sessionService: SessionService) {
    }

    getAnimalTypeById(id: number): Observable<AnimalTypeModel> {
        return this.httpClient.get<AnimalTypeModel>(
            this.apiService.getApiHost + "/api/v1/animalTypes/" + id,
            this.sessionService.getHeaderToken()
        );
    }

    getAnimalTypes(): Observable<AnimalTypeModel[]> {
        return this.httpClient.get<AnimalTypeModel[]>(
            this.apiService.getApiHost + "/api/v1/animalTypes",
            this.sessionService.getHeaderToken()
        );
    }

    createAnimalType(model: AnimalTypeCreateDto): Observable<AnimalTypeModel> {
        return this.httpClient.post<AnimalTypeModel>(
            this.apiService.getApiHost + "/api/v1/animalTypes",
            model,
            this.sessionService.getHeaderToken()
        );
    }

    updateAnimalType(model: AnimalTypeUpdateDto): Observable<AnimalTypeModel> {
        return this.httpClient.put<AnimalTypeModel>(
            this.apiService.getApiHost + "/api/v1/animalTypes",
            model,
            this.sessionService.getHeaderToken()
        );
    }

    deleteAnimalType(id: number): Observable<void> {
        return this.httpClient.delete<void>(
            this.apiService.getApiHost + "/api/v1/animalTypes/" + id,
            this.sessionService.getHeaderToken()
        );
    }
}
