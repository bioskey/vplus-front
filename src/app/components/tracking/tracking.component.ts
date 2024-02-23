import { Component } from '@angular/core';
import { TimeComponent } from '../time/time.component';

@Component({
  selector: 'app-tracking',
  standalone: true,
  imports: [TimeComponent],
  templateUrl: './tracking.component.html',
  styleUrl: './tracking.component.scss'
})
export class TrackingComponent {

}
