import {NgClass} from '@angular/common';
import {Component, Input} from '@angular/core';
import {Router} from '@angular/router';
import {SessionService} from '../../../../service/session.service';

@Component({
    selector: 'app-menu-editor',
    standalone: true,
    imports: [NgClass],
    templateUrl: './menu-editor.component.html',
    styleUrl: './menu-editor.component.css'
})
export class MenuEditorComponent {

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
