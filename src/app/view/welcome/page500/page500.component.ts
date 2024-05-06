import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ActuatorService } from '../../../service/actuator.service';

@Component({
  selector: 'app-page500',
  standalone: true,
  imports: [],
  templateUrl: './page500.component.html',
  styleUrl: './page500.component.css'
})
export class Page500Component {

  constructor(
      private actuatorService: ActuatorService,
      private router: Router
  ) {
    actuatorService.getHealthService().subscribe({
      next: () => {
        this.router.navigateByUrl('index');
      }
    })
  }
}
