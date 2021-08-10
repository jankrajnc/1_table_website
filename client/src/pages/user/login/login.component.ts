/* ===== Angular ===== */
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
/* ===== Our components ===== */
import { UserRest } from "../../../apis/user-rest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  /*========================================================================================*/
  /* ===== Variables ===== */
  /*========================================================================================*/
  private userRest: UserRest = new UserRest(this.http);
  public loginData!: FormGroup;
  public toggleCSS = 0;
  public authenticationStatus!: boolean;

  /*========================================================================================*/
  /* ===== Constructor ===== */
  /*========================================================================================*/
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.authenticationStatus = true;
    this.initializeForm();
  }

  /*========================================================================================*/
  /* ===== Initializers ===== */
  /*========================================================================================*/

  // Initializes an empty login form.
  private initializeForm() {
    this.loginData = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  /*========================================================================================*/
  /* ===== Button functions ===== */
  /*========================================================================================*/

  // Logs the user in.
  public loginUser() {
    // Check if the data is valid.
    if (this.loginData.valid) {
      this.userRest.login(this.loginData.value).subscribe((returnData: any) => {
        // If the return is true then the user is authenticated.
        if (returnData.authenticated) {
          this.authenticationStatus = true;
          // For the purpose of this application we store the access token to the local storage.
          localStorage.setItem("accessToken", returnData.accessToken);
          // TODO: Login router has to update the navbar, right now it doesn't. Use an emitter or injectable.
          this.router.navigate(["../car-table"]);
        } else {
          this.authenticationStatus = false;
        }
      });
    } else {
      // This shows a red border for incorrect fields.
      this.toggleCSS = 1;
    }
  }

  // Cancels the login process and returns you back to the table view.
  public cancelLogin() {
    this.router.navigate(["../car-table"]);
  }

}