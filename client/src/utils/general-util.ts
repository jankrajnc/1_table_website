import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ConfirmationModalComponent } from '../components/modal-windows/confirmation-modal.component';
import { InformationModalComponent } from '../components/modal-windows/information-modal.component';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class GeneralUtil {

    private modalRef!: BsModalRef;

    constructor(private modalService?: BsModalService) { }

    public showInformationModal(type: string) {
        // try catch, or check if modalService is empty
        this.modalRef = this.modalService!.show(InformationModalComponent, { keyboard: true, initialState: { type: type } });
    }

    public showConfirmationModal(type: string): Observable<boolean> {
        // try catch, or check if modalService is empty
        this.modalRef = this.modalService!.show(ConfirmationModalComponent, { keyboard: true, initialState: { type: type } });
        return this.modalRef.content.confirmation.pipe(map(value => {
            return value;
        }));
    }

}
