import { Component, Output, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-confirmation-modal',
    templateUrl: './confirmation-modal.component.html'
})

export class ConfirmationModalComponent {

    public title!: string;
    public content!: string;
    public type!: string;

    @Output() confirmation = new EventEmitter();

    constructor(public modalRef: BsModalRef) {
        setTimeout(() => {
            this.setContent();
        }, 10);
    }

    // Sets modal window content based on type.
    private setContent() {
        switch (this.type) {
            case "delete": {
                this.title = "Confirm deletion";
                this.content = "Are you sure want to delete this table entry?";
                break;
            }
        }
    }

    public onConfirm() {
        this.confirmation.emit(true);
        this.modalRef.hide();
    }

    public onCancel() {
        this.confirmation.emit(false);
        this.modalRef.hide();
    }

}