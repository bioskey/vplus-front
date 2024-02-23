import { NgTemplateOutlet } from "@angular/common";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from "@angular/core";
import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";
import { Toast, ToastService } from "../../services/toast/toast.service";

@Component({
    selector: 'app-toasts',
    standalone: true,
    imports: [NgbToastModule, NgTemplateOutlet],
    template: `
		@for (toast of toasts; track toast) {
			<ngb-toast
                [header]="toast.title"
				[class]="toast.classname"
				[autohide]="true"
				[delay]="toast.delay || 5000"
			>
                {{toast.message}}
			</ngb-toast>
		}
	`,
    host: { class: 'toast-container position-fixed top-0 end-0 p-3', style: 'z-index: 1200' },
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ToastsContainer implements OnInit {
    toasts: Toast[] = [];
    toastService = inject(ToastService);

    constructor(private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        this.toastService.toasts.subscribe((toast) => {
            this.toasts.push(toast);
            this.cdr.detectChanges();
        });
    }
}
