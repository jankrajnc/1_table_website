import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Car } from 'src/models/car';
import { CarRest } from '../../../apis/car-rest';

@Component({
  selector: 'app-add-car',
  templateUrl: './add-car.component.html',
  styleUrls: ['./add-car.component.scss']
})
export class AddCarComponent implements OnInit {

  /*========================================================================================*/
  /* ===== Variables ===== */
  /*========================================================================================*/
  public carData!: FormGroup;
  public invalidForm = 0;
  private carRestService = new CarRest(this.http);

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  /*========================================================================================*/
  /* ===== Events ===== */
  /*========================================================================================*/
  @HostListener("window:beforeunload", ["$event"])
  unloadHandler() {
    sessionStorage.removeItem("selectedCar");
  }

  @HostListener('window:popstate', ['$event'])
  onPopState() {
    sessionStorage.removeItem("selectedCar");
  }

  /*========================================================================================*/
  /* ===== Initializer functions ===== */
  /*========================================================================================*/

  ngOnInit(): void {
    this.setFormData();
  }

  // Gets data of a selected car, otherwise it sends an empty object.
  private setFormData() {
    const selectedCar = sessionStorage.getItem("selectedCar");
    if (selectedCar) {
      const carObject: Car = JSON.parse(selectedCar);
      this.initializeForm(carObject);
    } else {
      const carObject: Car = new Car();
      this.initializeForm(carObject);
    }
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

  // Stores the car information into the database. If the form is invalid it shows the invalid fields via CSS.
  public saveCar() {
    if (this.carData.valid) {
      this.carRestService.createCar(this.carData.value).subscribe(() => {
        sessionStorage.removeItem("selectedCar");
        setTimeout(() => {
          this.router.navigate(["../car-table"]);
        }, 100);
      });
    } else {
      this.invalidForm = 1;
      window.scrollTo(0, 0);
    }
  }

  public cancelCreation() {
    sessionStorage.removeItem("selectedCar");
    this.router.navigate(["../car-table"]);
  }

}
