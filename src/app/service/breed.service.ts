import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {BreedModel} from "../model/entity/breed.model";
import {BreedCreateDto} from "../model/dto/breed.create.dto";
import {BreedUpdateDto} from "../model/dto/breed.update.dto";
import {ApiService} from "./api.service";

@Injectable({providedIn: "root"})
export class BreedService {

    constructor(private httpClient: HttpClient,
                private apiService: ApiService,
                private sessionService: SessionService) {
    }

    getBreeds(): Observable<BreedModel[]> {
        return this.httpClient.get<BreedModel[]>(
            this.apiService.getApiHost + "/api/v1/breeds",
            this.sessionService.getHeaderToken(),
        );
    }

    getBreedByAnimalTypeId(id: number): Observable<BreedModel[]> {
        return this.httpClient.get<BreedModel[]>(
            this.apiService.getApiHost + "/api/v1/breeds/type/" + id,
            this.sessionService.getHeaderToken(),
        );
    }

    createBreed(model: BreedCreateDto): Observable<BreedModel> {
        return this.httpClient.post<BreedModel>(
            this.apiService.getApiHost + "/api/v1/breeds",
            model,
            this.sessionService.getHeaderToken(),
        );
    }

    updateBreed(model: BreedUpdateDto): Observable<BreedModel> {
        return this.httpClient.put<BreedModel>(
            this.apiService.getApiHost + "/api/v1/breeds",
            model,
            this.sessionService.getHeaderToken(),
        );
    }

    deleteBreed(id: number): Observable<void> {
        return this.httpClient.delete<void>(
            this.apiService.getApiHost + "/api/v1/breeds/" + id,
            this.sessionService.getHeaderToken()
        );
    }
}
