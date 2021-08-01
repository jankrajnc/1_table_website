import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-information-modal',
    templateUrl: './information-modal.component.html'
})

export class InformationModalComponent {

    public title!: string;
    public content!: string;
    public type!: string;

    constructor(public modalRef: BsModalRef) {
        setTimeout(() => {
            this.setContent();
        }, 10);
    }

    // Sets modal window content based on type.
    private setContent() {
        switch (this.type) {
            case "logout": {
                this.title = "Logout notification";
                this.content = "You have logged out.";
                break;
            }
            case "duplicate": {
                this.title = "Duplicate entry error";
                this.content = "A duplicate name has been found in the database. No data has been inserted!"
                    + "Please enter a unique name.";
                break;
            }
        }
    }

    public onConfirm() {
        this.modalRef.hide();
        window.location.reload();
    }

}