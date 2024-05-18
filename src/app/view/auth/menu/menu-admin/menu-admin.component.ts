import {Component, Input} from '@angular/core';
import {SessionService} from "../../../../service/session.service";
import {Router} from "@angular/router";
import {NgClass} from '@angular/common';

@Component({
    selector: 'app-menu-admin',
    standalone: true,
    imports: [NgClass],
    templateUrl: './menu-admin.component.html',
    styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {

    @Input() itemName!: string;

    constructor(private sessionService: SessionService,
                private router: Router) {
        this.sessionService.checkCookies();
    }

    // Метод для выхода из учетной записи
    logOff() {
        this.sessionService.clear();
        this.router.navigateByUrl('index');
    }
}
