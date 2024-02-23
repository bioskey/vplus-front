import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { EventTypes } from '../../services/toast/toast.service';
import bootstrap, { Toast } from 'bootstrap';
import { fromEvent, take } from 'rxjs';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss'
})
export class ToastComponent {

  constructor( @Inject(DOCUMENT) private document: Document, private renderer: Renderer2) {}

  @Output() disposeEvent = new EventEmitter();

  @ViewChild('toastElement', { static: true })
  toastEl!: ElementRef;

  @Input()
  type!: EventTypes;

  @Input()
  title!: string;

  @Input()
  message!: string;

  toast!: Toast;

  ngOnInit() {
    this.show();
  }

  show() {
    // const toastLiveExample = this.document.getElementById('liveToast');
    // bootstrap.Toast.getOrCreateInstance(toastLiveExample);

    this.toast = new Toast(
      'toast',
      this.type === EventTypes.error
        ? {
          autohide: false,
        }
        : {
          delay: 5000,
        }
    );

    fromEvent(this.toastEl.nativeElement, 'hidden.bs.toast')
      .pipe(take(1))
      .subscribe(() => this.hide());

    this.toast.show();
  }

  hide() {
    this.toast.dispose();
    this.disposeEvent.emit();
  }
}
