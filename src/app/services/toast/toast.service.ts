import { Injectable, TemplateRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';

export enum EventTypes {
  success = 'success',
  error = 'error',
  warning = 'warning',
  info = 'info'
}

export interface ToastEvent {
  message: string;
  title: string;
  type: EventTypes;
}

export interface Toast {
	classname?: string;
	delay?: number;
  title: string;
  message?: string;
  type?: EventTypes;
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  toastEvents: Observable<ToastEvent>;
  toasts: Observable<Toast>;

  private _toastEvents = new Subject<ToastEvent>();
  private _toastsEvents = new Subject<Toast>();
  
  constructor() {
    this.toastEvents = this._toastEvents.asObservable();
    this.toasts = this._toastsEvents.asObservable();
  }

  showToast(title: string, message: string, type: EventTypes) {
    this._toastEvents.next({
      message,
      title,
      type
    });
  }

  show(toast: Toast) {
    this._toastsEvents.next(toast);
	}
}
