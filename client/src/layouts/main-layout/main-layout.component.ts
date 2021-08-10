import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GeneralUtil } from "../../utils/general-util";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  /*========================================================================================*/
  /* ===== Variables ===== */
  /*========================================================================================*/
  public loggedIn!: boolean;
  private generalUtil: GeneralUtil = new GeneralUtil(this.modalService);

  /*========================================================================================*/
  /* ===== Constructor ===== */
  /*========================================================================================*/
  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
    this.isLoggedIn();
  }

  /*========================================================================================*/
  /* ===== Initializers ===== */
  /*========================================================================================*/
  
  // Checks if the user is logged in and sets a public variable. This determines the content of the navigation bar.
  public isLoggedIn() {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken === undefined || accessToken === null) {
      this.loggedIn = false;
    } else {
      this.loggedIn = true;
    }
  }

  // Logs the user out by removing the access token.
  public logout() {
    localStorage.removeItem("accessToken");
    this.loggedIn = false;
    this.generalUtil.showInformationModal("logout");
  }

}
