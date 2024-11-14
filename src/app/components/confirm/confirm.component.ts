import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
	selector: 'ui-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.css'],
	standalone: true,
	imports: [MatIcon]
})
export class ConfirmComponent {
	@Input() title: string = 'Confirm Action';
	@Input() text: string = 'Are you sure you want to proceed?';

	@Output() close = new EventEmitter<void>();
	@Output() confirm = new EventEmitter<void>();

	onClose() {
		this.close.emit();
	}

	onConfirm() {
		this.confirm.emit();
	}
}