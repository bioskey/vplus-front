import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-time',
  standalone: true,
  imports: [CommonModule],
  template: `<span class="fs-09 ms-3 text-secondary">{{currentDate | date: 'EEEE d MMMM, hh:mm:ss'}}</span>`
})
export class TimeComponent implements OnInit {
  currentDate: Date = new Date();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { }

  ngOnInit(): void {
    // Client only code.
    if (isPlatformBrowser(this.platformId)) {
      setInterval(() => {
        this.currentDate = new Date();
      }, 1000);
    }
  }
}
