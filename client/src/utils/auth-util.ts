/* ===== Angular ===== */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
/* ===== External libraries ===== */
import { BsModalService } from 'ngx-bootstrap/modal';
/* ===== Our components ===== */
import { UserRest } from "../apis/user-rest";
import { GeneralUtil } from "./general-util";

@Injectable({
  providedIn: 'root'
})
export class AuthUtil implements CanActivate {

  /*========================================================================================*/
  /* ===== Variables ===== */
  /*========================================================================================*/
  private userRest: UserRest = new UserRest(this.http!);
  private generalUtil: GeneralUtil = new GeneralUtil(this.modalService);

  /*========================================================================================*/
  /* ===== Constructor ===== */
  /*========================================================================================*/
  constructor(private http?: HttpClient, private router?: Router, private modalService?: BsModalService) { }

  /*========================================================================================*/
  /* ===== Router function ===== */
  /*========================================================================================*/

  // An interface function connected to the routing module. Checks if the user can use a route or not.
  // Checks if the user is logged, if not opens a modal window to alert the user.
  public canActivate(): Observable<boolean> {
    let subject = new Subject<boolean>();
    // Try to get the access token and check if it's present.
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      // Authorize the user.
      this.authorizeUser(accessToken).subscribe(authorized => {
        if (authorized) {
          subject.next(true);
        } else {
          // If the person isn't authorized, then we tell him to login, because the token is invalid, it might've expired.
          this.generalUtil.showConfirmationModal("login").subscribe((confirmation) => {
            if (confirmation) {
              this.router!.navigate(["../login"]);
            } else {
              this.router!.navigate(["../car-table"]);
            }
            subject.next(false);
          });
        }
      });
    } else {
      // If the token wasn't found, then the user should login.
      this.generalUtil.showConfirmationModal("login").subscribe((confirmation) => {
        if (confirmation) {
          this.router!.navigate(["../login"]);
        } else {
          this.router!.navigate(["../car-table"]);
        }
        subject.next(false);
      });
    }
    return subject.asObservable();
  }


  /*========================================================================================*/
  /* ===== General functions ===== */
  /*========================================================================================*/

  // Authorized the user by checking if the access token is present and valid.
  public authorizeUser(accessToken: String): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.userRest.authorize(accessToken).subscribe((returnedObject) => {
      subject.next(returnedObject.authorized);
    });
    return subject.asObservable();
  }

}
