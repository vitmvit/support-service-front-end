import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {SessionService} from "./session.service";
import {Observable} from "rxjs";
import {StateTemplateModel} from "../model/entity/state.template.model";
import {StateTemplateCreateDto} from "../model/dto/state.template.create.dto";
import {StateTemplateUpdateDto} from "../model/dto/state.template.update.dto";
import {ApiService} from "./api.service";

@Injectable({providedIn: "root"})
export class StateService {

    constructor(private httpClient: HttpClient,
                private apiService: ApiService,
                private sessionService: SessionService) {
    }

    getStateTemplates(): Observable<StateTemplateModel[]> {
        return this.httpClient.get<StateTemplateModel[]>(
            this.apiService.getApiHost + "/api/v1/stateTemplates",
            this.sessionService.getHeaderToken()
        );
    }

    createStateTemplate(model: StateTemplateCreateDto): Observable<StateTemplateModel> {
        return this.httpClient.post<StateTemplateModel>(
            this.apiService.getApiHost + "/api/v1/stateTemplates", model,
            this.sessionService.getHeaderToken()
        );
    }

    updateStateTemplate(model: StateTemplateUpdateDto): Observable<StateTemplateModel> {
        return this.httpClient.put<StateTemplateModel>(
            this.apiService.getApiHost + "/api/v1/stateTemplates", model,
            this.sessionService.getHeaderToken()
        );
    }

    deleteStateTemplate(id: number): Observable<void> {
        return this.httpClient.delete<void>(
            this.apiService.getApiHost + "/api/v1/stateTemplates/" + id,
            this.sessionService.getHeaderToken()
        );
    }
}
