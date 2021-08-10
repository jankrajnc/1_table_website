/* ===== Angular ===== */
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
/* ===== Our components ===== */
import { Car } from 'src/models/car';
import { CarRest } from '../../../apis/car-rest';

@Component({
  selector: 'app-edit-car',
  templateUrl: './edit-car.component.html',
  styleUrls: ['./edit-car.component.scss']
})
export class EditCarComponent implements OnInit {

  /*========================================================================================*/
  /* ===== Variables ===== */
  /*========================================================================================*/
  public carData!: FormGroup;
  public invalidForm = 0;
  public isDataAvailable!: boolean;
  private id!: number;
  private carRestService = new CarRest(this.http);

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

  // Stores the car information into the database. If the form is invalid it shows the invalid fields via CSS.
  public saveCar() {
    if (this.carData.valid) {
      this.carRestService.updateCar(this.id, this.carData.value).subscribe(() => {
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
    this.router.navigate(["../car-table"]);
  }

}
