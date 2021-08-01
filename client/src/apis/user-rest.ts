import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/models/user';

@Injectable({
  providedIn: 'root'
})

export class UserRest {

  constructor(public http: HttpClient) { }

  private domain = 'http://localhost:3000/';
  private serverUrl = this.domain + 'users';

  public signUp(userData: User) {
    const url = `${this.serverUrl}/signup`;
    return this.http.post<User>(url, userData);
  }

  public login(credentials: User) {
    const url = `${this.serverUrl}/login`;
    return this.http.post<User>(url, credentials);
  }

  public authorize(accessToken: String) {
    const url = `${this.serverUrl}/authorize`;
    return this.http.post<any>(url, {accessToken: accessToken});
  }

}
