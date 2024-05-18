import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";

@Component({
    selector: 'app-page404',
    standalone: true,
    imports: [
        RouterLink,
        RouterLinkActive
    ],
    templateUrl: './page404.component.html',
    styleUrl: './page404.component.css'
})
export class Page404Component {

    constructor(private router: Router) {
    }

    cabinet() {
        this.router.navigateByUrl("auth/cabinet")
    }
}
