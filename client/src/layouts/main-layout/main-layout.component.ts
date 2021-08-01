import { Component, OnInit } from '@angular/core';
import { GeneralUtil } from "../../utils/general-util";
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  /*----- Variables -----*/
  //html variables
  public loggedIn!: boolean;
  private generalUtil: GeneralUtil = new GeneralUtil(this.modalService);

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.isLoggedIn();
  }

   /*----- Initializers -----*/
  //checks if the user is logged in
  private isLoggedIn() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === undefined || accessToken === null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  public logout() {
    localStorage.removeItem("accessToken");
    this.loggedIn = false;
    this.generalUtil.showInformationModal("logout");
  }

}
