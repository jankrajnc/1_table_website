import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { GeneralUtil } from "../../../utils/general-util";
import { UserRest } from "../../../apis/user-rest";
import { BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  /*----- Variables -----*/
  //providers
  private userRest: UserRest = new UserRest(this.http);
  private generalUtil: GeneralUtil = new GeneralUtil(this.modalService);

  //html variables
  public signupData!: FormGroup;
  public toggleCSS = 0;

  /*----- Constructor -----*/
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  /*----- Initializers -----*/
  //initializes the login form
  private initializeForm() {
    this.signupData = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  /*----- General functions -----*/

  /*----- Button functions -----*/
  //logs in the user
  public signupUser() {
    if (this.signupData.valid) {
      this.userRest.signUp(this.signupData.value).subscribe((returnData: any) => {
        console.log(returnData);
        if (returnData.affectedRows == 0) {
          this.generalUtil.showInformationModal("duplicate");
        } else {
          setTimeout(() => {
            this.router.navigate(["../login"]);
          }, 100);
        }
      });
    } else {
      this.toggleCSS = 1;
    }
  }

  //logs in the user
  public cancelSignup() {
    this.router.navigate(["../car-table"]);
  }

}