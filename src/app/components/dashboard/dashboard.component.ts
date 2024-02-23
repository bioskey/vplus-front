import { Component } from '@angular/core';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [TimeComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
