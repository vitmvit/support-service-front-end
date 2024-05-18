import {NgStyle} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {StateTemplateCreateDto} from '../../../../model/dto/state.template.create.dto';
import {StateTemplateUpdateDto} from '../../../../model/dto/state.template.update.dto';
import {ErrorModel} from '../../../../model/entity/error.model';
import {ImageModel} from '../../../../model/entity/image.model';
import {StateTemplateModel} from '../../../../model/entity/state.template.model';
import {UserModel} from '../../../../model/entity/user.model';
import {ImageService} from '../../../../service/image.service';
import {SessionService} from '../../../../service/session.service';
import {StateService} from '../../../../service/state.service';
import {UserService} from '../../../../service/user.service';
import {ImageCardComponent} from '../../component/image-card/image-card.component';
import {ImageStateTemplateComponent} from '../../component/image-state-template/image-state-template.component';
import {MenuComponent} from '../../menu/menu/menu.component';
import {ActuatorService} from "../../../../service/actuator.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-cabinet-state-template-create',
    standalone: true,
    imports: [MenuComponent, ImageStateTemplateComponent, ImageCardComponent, NgStyle, FormsModule],
    templateUrl: './cabinet-state-template-create.component.html',
    styleUrl: './cabinet-state-template-create.component.css'
})
export class CabinetStateTemplateCreateComponent implements OnInit {

    itemName = "add-state-template"

    user!: UserModel
    role!: string
    login!: string
    name!: string
    description!: string
    images!: ImageModel[]
    templates!: StateTemplateModel[]
    imageUuid!: string
    toDeleteTemplate!: number
    errorModel!: ErrorModel | undefined
    base64!: string
    image!: File | undefined
    newImageUuid!: string
    choiceTemplate!: StateTemplateModel | undefined
    alertMessage: string | undefined = undefined
    alertWarning: string | undefined = undefined

    displayStyleDeleteTemplate = "none"
    displayStyleEditTemplate = "none"
    displayStyleAddImage = "none"

    constructor(private sessionService: SessionService,
                private imageService: ImageService,
                private stateService: StateService,
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
        this.getTemplates()
    }

    // Получение информации о текущем пользователе
    getMe() {
        this.userService.me(this.sessionService.getLogin()).subscribe({
            next: (response) => {
                this.user = response;
                this.role = response.role
                this.login = response.login

            },
            error: () => {
                this.sessionService.logOff()
            }
        });
    }

    getTemplates() {
        this.stateService.getStateTemplates().subscribe({
            next: (stats) => {
                this.templates = stats
            }
        })
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
                error: (fault2) => {
                    this.errorModel = new ErrorModel("Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!", fault2.status)
                }
            }
        );
    }

    deleteTemplate() {
        this.stateService.deleteStateTemplate(this.toDeleteTemplate).subscribe({
                next: () => {
                    this.closePopupDeleteTemplate()
                    this.getTemplates()
                }
            }
        )
    }

    choiceImage(model: StateTemplateModel) {
        this.choiceTemplate = model
        this.name = model.name
        this.description = model.description
        this.newImageUuid = model.uuidImage
        this.getBase64(model.uuidImage)
        this.openPopupEditTemplate()
    }

    changeImage(uuid: string) {
        this.newImageUuid = uuid
        this.getBase64(this.newImageUuid)
        this.closePopupAddImage()
    }

    createStateTemplate() {
        if (this.name && this.description && this.newImageUuid) {
            this.stateService.createStateTemplate(new StateTemplateCreateDto(this.name, this.description, this.newImageUuid)).subscribe({
                next: () => {
                    this.closePopupEditTemplate()
                    this.getTemplates()
                    this.alertMessage = "Шаблон успешно создан!"
                }
            })
        } else {
            this.alertWarning = "Необходимо заполнить все поля!"
        }
    }

    updateStateTemplate() {
        if (this.choiceTemplate && this.name != "" && this.description != "" && this.newImageUuid != "") {
            this.stateService.updateStateTemplate(new StateTemplateUpdateDto(this.choiceTemplate.id, this.name, this.description, this.newImageUuid)).subscribe({
                next: () => {
                    this.closePopupEditTemplate()
                    this.getTemplates()
                    this.alertMessage = "Шаблон успешно обновлен!"
                }
            })
        } else {
            this.alertWarning = "Необходимо заполнить все поля!"
        }
    }

    openPopupDeleteTemplate(id: number) {
        this.toDeleteTemplate = id
        this.displayStyleDeleteTemplate = "block"
    }

    closePopupDeleteTemplate() {
        this.displayStyleDeleteTemplate = "none"
    }

    openPopupEditTemplate() {
        this.displayStyleEditTemplate = "block"
    }

    closePopupEditTemplate() {
        this.choiceTemplate = undefined
        this.name = ""
        this.description = ""
        this.imageUuid = ""
        this.base64 = ""
        this.displayStyleEditTemplate = "none"
        this.closeAlertWarning()
    }

    openPopupAddImage() {
        this.displayStyleAddImage = "block"
    }

    closePopupAddImage() {
        this.displayStyleAddImage = "none"
    }

    closeAlertWarning() {
        this.alertWarning = undefined
    }

    closeAlert() {
        this.alertMessage = undefined
    }
}