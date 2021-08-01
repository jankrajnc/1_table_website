import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserRest } from "../apis/user-rest";

@Injectable({
  providedIn: 'root'
})
export class AuthUtil {


  private userRest: UserRest = new UserRest(this.http);

  constructor(private http: HttpClient) { }

  //logs in the user
  public async authenticateUser(accessToken: String) {
    //await this.userRest.authenticate(accessToken);

    this.userRest.authenticate(accessToken).subscribe((authenticated) => {
      console.log(authenticated);
      //return null;
    });
  }

}
