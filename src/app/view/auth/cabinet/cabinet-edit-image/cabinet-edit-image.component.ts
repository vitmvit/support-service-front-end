import {NgClass, NgStyle} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {ErrorModel} from '../../../../model/entity/error.model';
import {ImageModel} from '../../../../model/entity/image.model';
import {UserModel} from '../../../../model/entity/user.model';
import {ImageService} from '../../../../service/image.service';
import {SessionService} from '../../../../service/session.service';
import {UserService} from '../../../../service/user.service';
import {ImageCardComponent} from '../../component/image-card/image-card.component';
import {MenuComponent} from '../../menu/menu/menu.component';
import {ActuatorService} from "../../../../service/actuator.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-cabinet-edit-image',
    standalone: true,
    imports: [MenuComponent, ImageCardComponent, NgStyle, NgClass, FormsModule],
    templateUrl: './cabinet-edit-image.component.html',
    styleUrl: './cabinet-edit-image.component.css'
})
export class CabinetEditImageComponent implements OnInit {

    itemName = "add-image"

    user!: UserModel
    role!: string
    login!: string
    images!: ImageModel[]
    toDeleteImageUuid!: string
    errorModel!: ErrorModel | undefined
    base64!: string
    newBase64!: string | ArrayBuffer | null
    image!: File | undefined
    alertMessage: string | undefined = undefined
    alertWarning: string | undefined = undefined

    displayStyleDeleteImage = "none"
    displayStyleAddImage = "none"

    constructor(private sessionService: SessionService,
                private imageService: ImageService,
                private userService: UserService,
                private actuatorService: ActuatorService,
                private router: Router
    ) {
        this.actuatorService.getHealthService().subscribe({
            error: () => {
                this.router.navigateByUrl('page500');
            }
        })

        sessionService.checkSession()
    }

    ngOnInit(): void {
        this.getMe()
        this.getImages()
    }

    // Получение информации о текущем пользователе
    getMe() {
        this.userService.me(this.sessionService.getLogin()).subscribe({
            next: (response) => {
                this.user = response
                this.role = response.role
                this.login = response.login
            },
            error: () => {
                this.sessionService.logOff()
            }
        });
    }

    getImages() {
        this.imageService.getStateImages().subscribe({
            next: (chats) => {
                this.images = chats
            }
        });
    }

    // Метод для получения base64-строки изображения по UUID
    getBase64(uuid: string) {
        this.errorModel = undefined
        this.imageService.getStateImage(uuid).subscribe(
            {
                next: (response) => {
                    this.base64 = response
                },
                error: (fault) => {
                    this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault.status)
                }
            }
        );
    }

    deleteImage() {
        this.imageService.delete(this.toDeleteImageUuid).subscribe({
            next: () => {
                this.closePopupDeleteImage()
                this.getImages()
            }
        })
    }

    fileSelect(event: any) {
        this.image = event.target.files[0]
        this.handleUpload(event)
    }

    handleUpload(event: any) {
        const file = event.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            this.newBase64 = reader.result
        };
    }

    createImage() {
        if (this.image) {
            this.imageService.saveStateImage(this.image).subscribe({
                next: () => {
                    this.closePopupAddImage()
                    this.getImages()
                    this.alertMessage = "Изображение успешно загружено!"
                },
                error: (fault) => {
                    this.errorModel = new ErrorModel("Ошибка сохранения! Обратитесь в службу технической поддержки!", fault.status)
                }
            })
        } else {
            this.alertWarning = "Необходимо выбрать изображение!"
        }
    }

    openPopupDeleteImage(id: string) {
        this.toDeleteImageUuid = id
        this.getBase64(this.toDeleteImageUuid)
        this.displayStyleDeleteImage = "block"
    }

    closePopupDeleteImage() {
        this.displayStyleDeleteImage = "none"
    }

    openPopupAddImage() {
        this.displayStyleAddImage = "block"
    }

    closePopupAddImage() {
        this.displayStyleAddImage = "none"
        this.closeAlertWarning()
    }

    closeAlert() {
        this.alertMessage = undefined
    }

    closeAlertWarning() {
        this.alertWarning = undefined
    }
}
