/* ===== Angular ===== */
import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
/* ===== External libraries ===== */
import { BsModalService } from 'ngx-bootstrap/modal';
/* ===== Our components ===== */
import { CarRest } from "../../../apis/car-rest";
import { Car } from "../../../models/car";
import { GeneralUtil } from "../../../utils/general-util";



@Component({
  selector: 'app-car-table',
  templateUrl: './car-table.component.html',
  styleUrls: ['./car-table.component.scss']
})
export class CarTableComponent implements OnInit {

  /*========================================================================================*/
  /* ===== Variables ===== */
  /*========================================================================================*/
  @ViewChild('carTable') carTable: any;
  @ViewChild('searchBar') searchBar: any;
  public carData!: Car[];
  public columnDefinitions: any;
  private carRestApi: CarRest = new CarRest(this.http);
  private carModel: Car = new Car();
  private generalUtil: GeneralUtil = new GeneralUtil(this.modalService);

  /*========================================================================================*/
  /* ===== Constructor ===== */
  /*========================================================================================*/
  constructor(private router: Router, private http: HttpClient, private modalService: BsModalService) { }

  /*========================================================================================*/
  /* ===== Initializer functions ===== */
  /*========================================================================================*/

  ngOnInit(): void {
    this.setColumnDefinitions();
    this.setCarData();
  }

  // Gets column definitions for the table, as well as setting the software count for the column definitions.
  private setColumnDefinitions() {
    this.columnDefinitions = this.carModel.getCarColumnDefinitions();
  }

  // Gets data from the database and sets it.
  public setCarData() {
    this.carRestApi.getCars().subscribe((getData: any) => {
      this.carData = getData;
    });
  }

  // If no rows are present, show the user a short message about this.
  public onModelUpdated() {
    if (this.carTable.api.rowModel.rowsToDisplay.length === 0) {
      this.carTable.api.showNoRowsOverlay();
    }
    if (this.carTable.api.rowModel.rowsToDisplay.length > 0) {
      this.carTable.api.hideOverlay();
    }
  }

  /*========================================================================================*/
  /* ===== Button functions ===== */
  /*========================================================================================*/

  // Uses the ag-grid quick filter to filter based on all fields.
  public searchTable(event: any) {
    const searchString = event.target.value.toLowerCase();
    this.carTable.api.setQuickFilter(searchString);
  }

  /*
    Add a new car to the database.
      No row selected => fresh form
      One row selected => form initializes with existing data
      Multiple rows selected => error in the form of a modal window
  */
  public addCar() {
    const selectedRow = this.carTable.gridOptions.api.getSelectedRows();
    if (selectedRow.length === 0) {
      this.router.navigate(["../add-car"]);
    }
    else if (selectedRow.length === 1) {
      sessionStorage.setItem("selectedCar", JSON.stringify(selectedRow[0]));
      this.router.navigate(["../add-car"]);
    }
    else if (selectedRow.length > 1) {
      this.generalUtil.showInformationModal("row_selection");
    }
  }

  // Removes all set filters.
  public clearFilters() {
    this.searchBar.nativeElement.value = null;
    this.carTable.api.setQuickFilter(null);
    this.carTable.gridOptions.api.setFilterModel(null);
  }

}
