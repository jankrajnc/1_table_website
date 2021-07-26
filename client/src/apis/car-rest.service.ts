import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Car } from 'src/models/car';

@Injectable({
  providedIn: 'root'
})

export class CarRestService {

  constructor(public http: HttpClient) { }

  private domain = 'http://localhost:3000/';
  private serverUrl = this.domain + 'cars';

  public getCars() {
    return this.http.get<Car[]>(this.serverUrl);
  }

  public getCar(id: number) {
    const url = `${this.serverUrl}/${id}`;
    return this.http.get<Car[]>(url);
  }

  public createCar(carData: Car) {
    return this.http.post<Car>(this.serverUrl, carData);
  }

  public updateCar(id: number, carData: Car) {
    const url = `${this.serverUrl}/${id}`;
    return this.http.put<Car>(url, carData);
  }

  public deleteCar(id: number) {
    const url = `${this.serverUrl}/${id}`;
    return this.http.delete<any>(url);
  }

}
