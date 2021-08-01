import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { BsModalService } from 'ngx-bootstrap/modal';
import { Observable, Subject } from 'rxjs';
import { UserRest } from "../apis/user-rest";
import { GeneralUtil } from "./general-util";

@Injectable({
  providedIn: 'root'
})
export class AuthUtil implements CanActivate {


  private userRest: UserRest = new UserRest(this.http!);
  private generalUtil: GeneralUtil = new GeneralUtil(this.modalService);

  constructor(private http?: HttpClient, private router?: Router, private modalService?: BsModalService) { }

  /*----- Router function -----*/
  //checks if the user is logged, if not opens a modal window to alert the user
  public canActivate(): Observable<boolean> {
    let subject = new Subject<boolean>();
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      this.authorizeUser(accessToken).subscribe(authorized => {
        if (!authorized) {
          this.generalUtil.showConfirmationModal("login").subscribe((confirmation) => {
            if (confirmation) {
              this.router!.navigate(["../login"]);
            }
            subject.next(false);
          });
        } else {
          subject.next(true);
        }
      });
    } else {
      this.generalUtil.showConfirmationModal("login").subscribe((confirmation) => {
        if (confirmation) {
          this.router!.navigate(["../login"]);
        }
        subject.next(false);
      });
    }
    return subject.asObservable();
  }


  //logs in the user
  public authorizeUser(accessToken: String): Observable<boolean> {
    let subject = new Subject<boolean>();
    this.userRest.authorize(accessToken).subscribe((returnedObject) => {
      subject.next(returnedObject.authorized);
    });
    return subject.asObservable();
  }

}
