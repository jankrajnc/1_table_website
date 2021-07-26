/*----- Angular -----*/
import { Component, NgZone } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ICellRendererAngularComp } from 'ag-grid-angular';

import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { CarRestService } from '../apis/car-rest.service';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConfirmationModalComponent } from '../components/confirmation-modal.component';

@Component({
  selector: 'car-actions',
  template: `<div class="d-flex flex-row bd-highlight mb-3">
  <button class='btn btn-sm' (click)="viewCar()" title="View" style='background-color:transparent;'>
    <i class="fas fa-eye fa-lg"></i>
  </button>
  <button class='btn btn-sm' (click)="editCar()" title="Edit" style='background-color:transparent;'>
    <i class="fas fa-edit fa-lg"></i>
  </button>
  <button class='btn btn-sm' (click)="deleteCar()" title="Delete" style='background-color:transparent;'>
    <i class="fas fa-times fa-lg"></i>
  </button>
</div>`
})

export class CarTableActions implements ICellRendererAngularComp {

  /*----- Variables -----*/
  private params: any;
  private carRestService = new CarRestService(this.http);
  private modalRef!: BsModalRef;

  /*----- Constructor -----*/
  constructor(private http: HttpClient, private router: Router, private modalService: BsModalService, private zone: NgZone) {
  }

  /*----- Initializers -----*/
  public agInit(params: any): void {
    this.params = params;
  }

  /*----- Button functions -----*/
  public viewCar() {
    this.zone.run(() => {
      if (this.params.context != undefined) {
        this.params.context.componentParent.unloadHandler();
      }
      this.router.navigate(["../view-car", this.params.data.id]);
    });
  }

  public editCar() {
    this.zone.run(() => {
      if (this.params.context != undefined) {
        this.params.context.componentParent.unloadHandler();
      }
      this.router.navigate(["../edit-car", this.params.data.id]);
    });
  }

  public deleteCar() {
    this.showConfirmationModal("delete").subscribe((confirmation) => {
      if (confirmation) {
        this.params.api.updateRowData({ remove: [this.params.data] });
        this.carRestService.deleteCar(this.params.data.id).subscribe();
      }
    });
  }

  /*----- General functions -----*/
  public showConfirmationModal(type: string): Observable<boolean> {
    this.modalRef = this.modalService.show(ConfirmationModalComponent, { keyboard: true, initialState: { type: type } });
    return this.modalRef.content.confirmation.pipe(map(value => {
      return value;
    }));
  }

  public refresh(params: any): boolean {
    return true;
  }

}