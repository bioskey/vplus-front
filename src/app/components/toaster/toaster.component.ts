import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { ToastEvent, ToastService } from '../../services/toast/toast.service';
import { ToastComponent } from '../toast/toast.component';

@Component({
  selector: 'app-toaster',
  standalone: true,
  imports: [ToastComponent],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToasterComponent {
  currentToasts: ToastEvent[] = [];

  constructor(
    private toastService: ToastService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscribeToToasts();
  }

  subscribeToToasts() {
    this.toastService.toastEvents.subscribe((toast) => {
      const currentToast: ToastEvent = {
        type: toast.type,
        title: toast.title,
        message: toast.message,
      };
      this.currentToasts.push(currentToast);
      this.cdr.detectChanges();
    });
  }

  dispose(index: number) {
    this.currentToasts.splice(index, 1);
    this.cdr.detectChanges();
  }
}
