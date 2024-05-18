import {Component, Input} from '@angular/core';
import {MenuAdminComponent} from "../menu-admin/menu-admin.component";
import {MenuEditorComponent} from '../menu-editor/menu-editor.component';
import {MenuSupportComponent} from "../menu-support/menu-support.component";

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [
        MenuAdminComponent,
        MenuSupportComponent,
        MenuEditorComponent
    ],
    templateUrl: './menu.component.html',
    styleUrl: './menu.component.css'
})
export class MenuComponent {

    @Input() role!: string;
    @Input() itemName = "my-profile";

    constructor() {
    }
}
