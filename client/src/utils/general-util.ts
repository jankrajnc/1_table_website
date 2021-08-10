/* ===== Angular ===== */
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
/* ===== External libraries ===== */
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
/* ===== Our components ===== */
import { ConfirmationModalComponent } from '../components/modal-windows/confirmation-modal.component';
import { InformationModalComponent } from '../components/modal-windows/information-modal.component';

export class GeneralUtil {

    /*========================================================================================*/
    /* ===== Variables ===== */
    /*========================================================================================*/
    private modalRef!: BsModalRef;

    /*========================================================================================*/
    /* ===== Constructor ===== */
    /*========================================================================================*/
    constructor(private modalService?: BsModalService) { }

    /*========================================================================================*/
    /* ===== General functions ===== */
    /*========================================================================================*/

    // Shows the information type modal window. We can set the type of the content by providing the correct arguments.
    public showInformationModal(type: string) {
        try {
            this.modalRef = this.modalService!.show(InformationModalComponent, { keyboard: true, initialState: { type: type } });
        } catch (error) {
            console.error('Error: ', error);
        }
    }

    // Shows the confirmation type (user chooses Yes/No) modal window. 
    // We can set the type of the content by providing the correct arguments.
    public showConfirmationModal(type: string): Observable<boolean> {
        try {
            this.modalRef = this.modalService!.show(ConfirmationModalComponent, { keyboard: true, initialState: { type: type } });
            return this.modalRef.content.confirmation.pipe(map(value => {
                return value;
            }));
        } catch (error) {
            console.error('Error: ', error);
            return throwError(error);
        }
    }

}
