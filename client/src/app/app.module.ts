import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AgGridModule } from 'ag-grid-angular';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CarTableComponent } from '../pages/car/car-table/car-table.component';
import { AddCarComponent } from '../pages/car/add-car/add-car.component';
import { EditCarComponent } from '../pages/car/edit-car/edit-car.component';
import { ViewCarComponent } from '../pages/car/view-car/view-car.component';
import { LoginComponent } from '../pages/user/login/login.component';
import { SignupComponent } from '../pages/user/signup/signup.component';
import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { ConfirmationModalComponent } from '../components/modal-windows/confirmation-modal.component';
import { InformationModalComponent } from '../components/modal-windows/information-modal.component';



@NgModule({
  declarations: [
    AppComponent,
    CarTableComponent,
    AddCarComponent,
    EditCarComponent,
    ViewCarComponent,
    LoginComponent,
    SignupComponent,
    MainLayoutComponent,
    ConfirmationModalComponent,
    InformationModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
