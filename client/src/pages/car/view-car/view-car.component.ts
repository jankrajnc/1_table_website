import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { Car } from 'src/models/car';
import { CarRestService } from '../../../apis/car-rest.service';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.scss']
})
export class ViewCarComponent implements OnInit {

  /*========================================================================================*/
  /* ===== Variables ===== */
  /*========================================================================================*/
  public carData!: FormGroup;
  public isDataAvailable!: boolean;
  private id!: number;
  private carRestService = new CarRestService(this.http);

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private activatedRouter: ActivatedRoute) { }

  /*========================================================================================*/
  /* ===== Initializer functions ===== */
  /*========================================================================================*/

  ngOnInit(): void {
    this.isDataAvailable = false;
    this.setFormData();
  }

  // Gets car data based on the provided ID.
  private setFormData() {
    // Get the URL parameters.
    this.activatedRouter.params.subscribe((params: any) => {
      this.id = params['idCar'];
      this.carRestService.getCar(this.id).subscribe((carData: Car[]) => {
        this.initializeForm(carData[0]);
        this.isDataAvailable = true;
      });
    });
  }


  // Initializes a form based on already existing car information or creates an empty form.
  private initializeForm(carInfo: Car) {
    this.carData = this.formBuilder.group({
      brand: [carInfo.brand, Validators.required],
      make: [carInfo.make, Validators.required],
      color: [carInfo.color],
      ccs: [carInfo.ccs, Validators.required],
      hp: [carInfo.hp, Validators.required],
      price: [carInfo.price, Validators.required],
      electric: [carInfo.electric, Validators.required]
    });
  }

  /*========================================================================================*/
  /* ===== Button functions ===== */
  /*========================================================================================*/

  public returnToTable() {
    this.router.navigate(["../car-table"]);
  }

  public editCar() {
    this.router.navigate(["../edit-car", this.id]);
  }

}
