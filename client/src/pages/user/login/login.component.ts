import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

//import { AuthUtil } from "../../../utils/auth-util";
import { UserRest } from "../../../apis/user-rest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  /*----- Variables -----*/
  //providers
  private userRest: UserRest = new UserRest(this.http);

  //html variables
  public loginData!: FormGroup;
  public toggleCSS = 0;
  public authenticationStatus!: boolean;

  /*----- Constructor -----*/
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.authenticationStatus = true;
    this.initializeForm();
  }

  /*----- Initializers -----*/
  //initializes the login form
  private initializeForm() {
    this.loginData = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  /*----- General functions -----*/

  /*----- Button functions -----*/
  //logs in the user
  public loginUser() {
    if (this.loginData.valid) {
      this.userRest.login(this.loginData.value).subscribe((returnData: any) => {
        if (returnData.authenticated) {
          this.authenticationStatus = true;
          localStorage.setItem("accessToken", returnData.accessToken);
          setTimeout(() => {
            this.router.navigate(["../car-table"]);
          }, 100);
        } else {
          this.authenticationStatus = false;
        }
      });
    } else {
      this.toggleCSS = 1;
    }
  }

  //logs in the user
  public cancelLogin() {
    this.router.navigate(["../car-table"]);
  }

}