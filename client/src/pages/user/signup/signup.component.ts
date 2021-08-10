/* ===== Angular ===== */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/* ===== External libraries ===== */
import { BsModalService } from 'ngx-bootstrap/modal';
/* ===== Our components ===== */
import { GeneralUtil } from "../../../utils/general-util";
import { UserRest } from "../../../apis/user-rest";


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  /*========================================================================================*/
  /* ===== Variables ===== */
  /*========================================================================================*/
  private userRest: UserRest = new UserRest(this.http);
  private generalUtil: GeneralUtil = new GeneralUtil(this.modalService);
  public signupData!: FormGroup;
  public toggleCSS = 0;

  /*========================================================================================*/
  /* ===== Constructor ===== */
  /*========================================================================================*/
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  /*========================================================================================*/
  /* ===== Initializers ===== */
  /*========================================================================================*/

  // Initializes an empty sign up form.
  private initializeForm() {
    this.signupData = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  /*========================================================================================*/
  /* ===== Button functions ===== */
  /*========================================================================================*/
  
  // Signs up the user.
  public signupUser() {
    // Check if the data is valid.
    if (this.signupData.valid) {
      // Try to save the data.
      this.userRest.signUp(this.signupData.value).subscribe((returnData: any) => {
        // Check the server return for duplicates, no rows affected = nothing changed in the database, a duplicate.
        if (returnData.affectedRows == 0) {
          // Show a modal window informing the user of the duplicate username.
          this.generalUtil.showInformationModal("duplicate");
        } else {
          // If the entry wasn't a duplicate we navigate the user to the login page.
          setTimeout(() => {
            this.router.navigate(["../login"]);
          }, 100);
        }
      });
    } else {
      // This shows a red border for incorrect fields.
      this.toggleCSS = 1;
    }
  }

  // Cancels the sign up process and returns you back to the table view.
  public cancelSignup() {
    this.router.navigate(["../car-table"]);
  }

}