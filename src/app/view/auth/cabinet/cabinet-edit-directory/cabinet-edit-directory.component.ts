import {NgClass, NgStyle} from '@angular/common';
import {Component, OnInit} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {AnimalTypeCreateDto} from '../../../../model/dto/animal.type.create.dto';
import {AnimalTypeUpdateDto} from '../../../../model/dto/animal.type.update.dto';
import {BreedCreateDto} from '../../../../model/dto/breed.create.dto';
import {BreedUpdateDto} from '../../../../model/dto/breed.update.dto';
import {AnimalTypeModel} from '../../../../model/entity/animal.type.model';
import {BreedModel} from '../../../../model/entity/breed.model';
import {UserModel} from '../../../../model/entity/user.model';
import {AnimalTypeService} from '../../../../service/animal.type.service';
import {BreedService} from '../../../../service/breed.service';
import {SessionService} from '../../../../service/session.service';
import {UserService} from '../../../../service/user.service';
import {MenuComponent} from '../../menu/menu/menu.component';
import {ActuatorService} from "../../../../service/actuator.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-cabinet-edit-directory',
    standalone: true,
    imports: [MenuComponent, NgClass, NgStyle, FormsModule],
    templateUrl: './cabinet-edit-directory.component.html',
    styleUrl: './cabinet-edit-directory.component.css'
})
export class CabinetEditDirectoryComponent implements OnInit {

    itemName = "add-directory";

    user!: UserModel
    role!: string
    login!: string
    animalTypeList!: AnimalTypeModel[]
    animalTypeListForSearch!: AnimalTypeModel[]
    breedList!: BreedModel[]
    activeTab = 'animals'
    criteriaType!: string
    newType!: string
    typeName!: string
    newName!: string
    type!: AnimalTypeModel
    searchType!: string
    alertMessage: string | undefined = undefined
    alertWarning: string | undefined = undefined

    displayStyleAddData = "none"
    displayStyleDeleteData = "none"
    displayStyleUpdateData = "none"

    toDelete!: AnimalTypeModel | BreedModel
    toUpdate!: AnimalTypeModel | BreedModel

    constructor(private sessionService: SessionService,
                private userService: UserService,
                private animalTypeService: AnimalTypeService,
                private breedService: BreedService,
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
        this.toggle(this.activeTab)
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

    updateData() {
        if (this.newName && this.toUpdate && this.newName != "") {
            if (this.activeTab == 'animals') {
                this.animalTypeService.updateAnimalType(new AnimalTypeUpdateDto(this.toUpdate.id, this.newName)).subscribe({
                    next: () => {
                        this.getDataByCancel()
                        this.closePopupUpdateData()
                        this.alertMessage = "Тип животного успешно обновлен!"
                    },
                    error: (fault) => {
                        if (fault.status == 500) {
                            this.alertWarning = "Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!"
                        } else {
                            this.alertWarning = "Перепроверьте данные!"
                        }
                    }
                })
            } else if (this.activeTab == 'breeds') {
                this.breedService.updateBreed(new BreedUpdateDto(this.toUpdate.id, this.newName)).subscribe({
                    next: () => {
                        this.getDataByCancel()
                        this.closePopupUpdateData()
                        this.alertMessage = "Порода успешно добавлена!"
                    },
                    error: (fault) => {
                        if (fault.status == 500) {
                            this.alertWarning = "Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!"
                        } else {
                            this.alertWarning = "Перепроверьте данные!"
                        }
                    }
                })
            }
        } else {
            this.alertWarning = "Необходимо заполнить все поля!"
        }
    }

    deleteData() {
        if (this.activeTab == 'animals') {
            this.animalTypeService.deleteAnimalType(this.toDelete.id).subscribe({
                next: () => {
                    this.getDataByCancel()
                    this.closePopupDeleteData()
                }
            })
        } else if (this.activeTab == 'breeds') {
            this.breedService.deleteBreed(this.toDelete.id).subscribe({
                next: () => {
                    this.getDataByCancel()
                    this.closePopupDeleteData()
                }
            })
        }
    }

    createAnimalType() {
        if (this.newType) {
            this.animalTypeService.createAnimalType(new AnimalTypeCreateDto(this.newType)).subscribe({
                next: () => {
                    this.criteriaType = ""
                    this.getDataByCancel()
                    this.closePopupAddData()
                    this.alertMessage = "Тип животного успешно добавлен!"
                },
                error: (fault) => {
                    if (fault.status == 500) {
                        this.alertWarning = "Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!"
                    } else {
                        this.alertWarning = "Перепроверьте данные!"
                    }
                }
            })
        } else {
            this.alertWarning = "Необходимо заполнить все поля!"
        }
    }

    createBreed() {
        if (this.newType && this.type && this.newType != "") {
            this.breedService.createBreed(new BreedCreateDto(this.newType, this.type.id)).subscribe({
                next: () => {
                    this.criteriaType = ""
                    this.searchType = ""
                    this.typeName = ""
                    this.getDataByCancel()
                    this.closePopupAddData()
                    this.alertMessage = "Порода успешно добавлена!"
                },
                error: (fault) => {
                    if (fault.status == 500) {
                        this.alertWarning = "Возникла непредвиденная ошибка на стороне сервера. Перезагрузите старницу позже!"
                    } else {
                        this.alertWarning = "Перепроверьте данные!"
                    }
                }
            })
        } else {
            this.alertWarning = "Необходимо заполнить все поля!"
        }
    }

    getDataByCriteria() {
        if (this.activeTab == 'animals') {
            this.animalTypeList = this.animalTypeList.filter(item =>
                item.name.toLowerCase().includes(this.criteriaType.toLowerCase())
            )
        } else if (this.activeTab == 'breeds') {
            this.breedList = this.breedList.filter(item =>
                item.name.toLowerCase().includes(this.criteriaType.toLowerCase())
            )
            this.animalTypeListForSearch = this.animalTypeListForSearch.filter(item =>
                item.name.toLowerCase().includes(this.searchType.toLowerCase())
            )
        }
    }

    getDataBySearchType() {
        this.animalTypeListForSearch = this.animalTypeListForSearch.filter(item =>
            item.name.toLowerCase().includes(this.searchType.toLowerCase())
        )
    }

    getDataByCancel() {
        this.criteriaType = ""
        this.searchType = ""
        if (this.activeTab == 'animals') {
            this.animalTypeService.getAnimalTypes().subscribe({
                next: (list) => {
                    this.animalTypeList = list.slice().sort((a, b) => a.name.localeCompare(b.name))
                }
            })
        } else if (this.activeTab == 'breeds') {
            this.breedService.getBreeds().subscribe({
                next: (list) => {
                    this.breedList = list.slice().sort((a, b) => a.name.localeCompare(b.name))
                }
            })
            this.animalTypeService.getAnimalTypes().subscribe({
                next: (list) => {
                    this.animalTypeListForSearch = list.slice().sort((a, b) => a.name.localeCompare(b.name))
                }
            })
        }
    }

    toggle(activeTab: string) {
        if (activeTab == 'animals') {
            this.activeTab = "animals"
            this.closeAlertWarning()
            this.closeAlert()
        } else if (activeTab == 'breeds') {
            this.activeTab = "breeds"
            this.closeAlertWarning()
            this.closeAlert()
        }
        this.getDataByCancel()
    }

    openPopupAddData() {
        this.displayStyleAddData = "block"
    }

    closePopupAddData() {
        this.displayStyleAddData = "none"
        this.closeAlertWarning()
    }

    openPopupDeleteData(item: AnimalTypeModel | BreedModel) {
        this.toDelete = item
        this.displayStyleDeleteData = "block"
    }

    closePopupDeleteData() {
        this.displayStyleDeleteData = "none"
    }

    openPopupUpdateData(item: AnimalTypeModel | BreedModel) {
        this.toUpdate = item
        this.displayStyleUpdateData = "block"
    }

    closePopupUpdateData() {
        this.displayStyleUpdateData = "none"
        this.closeAlertWarning()
    }

    closeAlertWarning() {
        this.alertWarning = undefined
    }

    closeAlert() {
        this.alertMessage = undefined
    }
}