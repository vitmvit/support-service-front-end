import {Component} from '@angular/core';
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {SessionService} from "../../../service/session.service";

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {

  constructor(private sessionService: SessionService,
              private router: Router) {
  }

  // Метод для перехода на страницу авторизации или на страницу кабинета в зависимости от наличия токена и логина в sessionService
  login(): void {
    if (this.sessionService.getToken() != null && this.sessionService.getLogin() != null) {
      this.router.navigateByUrl('auth/cabinet');
    } else {
      this.router.navigateByUrl('login');
    }
  }
}
