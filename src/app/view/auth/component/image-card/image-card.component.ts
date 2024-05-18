import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ErrorModel} from '../../../../model/entity/error.model';
import {ImageModel} from '../../../../model/entity/image.model';
import {ImageService} from '../../../../service/image.service';

@Component({
    selector: 'app-image-card',
    standalone: true,
    imports: [],
    templateUrl: './image-card.component.html',
    styleUrl: './image-card.component.css'
})
export class ImageCardComponent implements OnInit {

    recordVal!: ImageModel;
    base64!: string;
    errorModel!: ErrorModel | undefined;
    @Output() itemClick: EventEmitter<any> = new EventEmitter();

    constructor(private imageService: ImageService) {
    }

    // Геттер для получения модели изображения
    get record(): ImageModel {
        return this.recordVal;
    }

    // Сеттер для установки модели изображения
    @Input()
    set record(value: ImageModel) {
        this.recordVal = value;
        // Получение base64-строки изображения при установке модели
        this.getBase64(this.recordVal.generatedName);
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