import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ErrorModel} from '../../../../model/entity/error.model';
import {StateTemplateModel} from '../../../../model/entity/state.template.model';
import {ImageService} from '../../../../service/image.service';

@Component({
    selector: 'app-image-state-template',
    standalone: true,
    imports: [],
    templateUrl: './image-state-template.component.html',
    styleUrl: './image-state-template.component.css'
})
export class ImageStateTemplateComponent implements OnInit {

    recordVal!: StateTemplateModel;
    base64!: string;
    errorModel!: ErrorModel | undefined;
    @Output() itemClick: EventEmitter<any> = new EventEmitter();

    constructor(private imageService: ImageService) {
    }

    // Геттер для получения модели изображения
    get record(): StateTemplateModel {
        return this.recordVal;
    }

    // Сеттер для установки модели изображения
    @Input()
    set record(value: StateTemplateModel) {
        this.recordVal = value;
        // Получение base64-строки изображения при установке модели
        this.getBase64(this.recordVal.uuidImage);
    }

    ngOnInit() {
    }

    // Метод для получения base64-строки изображения по UUID
    getBase64(uuid: string) {
        this.errorModel = undefined
        this.imageService.getStateImage(uuid).subscribe(
            {
                next: (response) => {
                    this.base64 = response;
                },
                error: (fault2) => {
                    this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault2.status);
                }
            }
        );
    }
}