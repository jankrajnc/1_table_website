/* ===== Angular ===== */
import { Component } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
/* ===== External libraries ===== */
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { BsModalService } from 'ngx-bootstrap/modal';
/* ===== Our components ===== */
import { CarRest } from '../apis/car-rest';
import { GeneralUtil } from '../utils/general-util';

// The HTML code is written here directly, as it's so short and simple that it does no justify a separate file.
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

  /*========================================================================================*/
  /* ===== Variables ===== */
  /*========================================================================================*/
  private params: any;
  private carRestService: CarRest = new CarRest(this.http);
  private generalUtil: GeneralUtil = new GeneralUtil(this.modalService);

  /*========================================================================================*/
  /* ===== Constructor ===== */
  /*========================================================================================*/
  constructor(private http: HttpClient, private router: Router, private modalService: BsModalService) { }

  /*========================================================================================*/
  /* ===== Initializers ===== */
  /*========================================================================================*/
  public agInit(params: any): void {
    this.params = params;
  }

  /*========================================================================================*/
  /* ===== Button functions ===== */
  /*========================================================================================*/
  
  // Navigates to the view car page.
  public viewCar() {
    this.router.navigate(["../view-car", this.params.data.id]);
  }

  // Navigates to the edit car page, which checks if the user is authorized to access it.
  public editCar() {
    this.router.navigate(["../edit-car", this.params.data.id]);
  }

  // Deletes the selected car, but before it opens a modal window where the user must confirm their action.
  public deleteCar() {
    this.generalUtil.showConfirmationModal("delete").subscribe((confirmation) => {
      console.log(confirmation);
      if (confirmation) {
        // Immediately remove the deleted entry from the view.
        this.params.api.updateRowData({ remove: [this.params.data] });
        this.carRestService.deleteCar(this.params.data.id).subscribe();
      }
    });
  }

  /*========================================================================================*/
  /* ===== General functions ===== */
  /*========================================================================================*/

  public refresh(params: any): boolean {
    return true;
  }

}