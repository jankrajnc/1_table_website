import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainLayoutComponent } from '../layouts/main-layout/main-layout.component';
import { CarTableComponent } from '../pages/car/car-table/car-table.component';
import { AddCarComponent } from '../pages/car//add-car/add-car.component';
import { EditCarComponent } from '../pages/car/edit-car/edit-car.component';
import { ViewCarComponent } from '../pages/car/view-car/view-car.component';
import { LoginComponent } from '../pages/user/login/login.component';
import { SignupComponent } from '../pages/user/signup/signup.component';

const routes: Routes = [

  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: CarTableComponent },
      { path: 'car-table', component: CarTableComponent },
      { path: 'add-car', component: AddCarComponent },
      { path: 'edit-car/:idCar', component: EditCarComponent },
      { path: 'view-car/:idCar', component: ViewCarComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'login', component: LoginComponent }
    ]
  },

  { path: '**', redirectTo: 'home' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
