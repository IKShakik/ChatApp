import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../app.api.service';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JWTTokenResponse } from '../models/JWTTokenResponse';
//import * as console from 'console';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  subscribers: any = {};
  getDataSubscriber$: Subscription;
  saveDataSubscriber$: Subscription;

  dataForm: FormGroup;
  user: User;
  email: string;
  response: JWTTokenResponse;

  constructor(public formBuilder: FormBuilder,
    public apiService: ApiService,
    public router: Router,
    public jwtHelper : JwtHelperService,
    public http: HttpClient) {
    this.createDataForm();
  }

  ngOnInit() {
    this.user = new User();
    this.response = new JWTTokenResponse();
  }


  invalidLogin?: boolean;

   url = 'https://localhost:7095/api/authentication/login';

  // public login = (form: NgForm) => {
  //   const credentials = JSON.stringify(form.value);
  //   this.http.post(this.url +"login", credentials, {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json"
  //     })
  //   }).subscribe(response => {
  //     const token = (<any>response).token;
  //     localStorage.setItem("jwt", token);
  //     this.invalidLogin = false;
  //     this.router.navigate(["/home"]);
  //   }, err => {
  //     this.invalidLogin = true;
  //   });
  // }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }


  public submit(): void {

    //if (this.user !== undefined || this.user !== null) {
      // this.subscribers.saveData
      //   = this.saveDataSubscriber$
      //   = this.apiService.httpPost('User/SaveUser/', this.user)
      //   .subscribe(x => {
      //     },
      //     (x) => {
      //       console.log(x);
      //     },
      //     () => {
      //       // this.notificationService.showSuccess('Saved successfully!!');
      //       // this.router.navigateByUrl('/quotation/committee-list');
      //     });

      this.user.FirstName = '';
      this.user.LastName = '';
      this.user.UserID = 0;

      this.subscribers.getUsers
        = this.getDataSubscriber$
        = this.apiService.httpPost('Authentication/Login', this.user)
          .subscribe(response => {
             this.response = response as any;
             //console.log("parameter: ", this.response);
             const token = (<any>response).token;
              localStorage.setItem("jwt", token);
              localStorage.setItem('currentUser', JSON.stringify((<any>response)));   
              // localStorage.setItem("UserID", (<any>response).UserID.toString());
              // localStorage.setItem("Email", (<any>response).Email);
              // localStorage.setItem("FirstName", (<any>response).FirstName);
              // localStorage.setItem("LastName", (<any>response).LastName);
              this.invalidLogin = false;

          },
          err => { this.invalidLogin = true; },
            () => {
              // this.user.UserID = this.response.UserID;
              // this.user.Email = this.response.Email;
              // this.user.FirstName = this.response.FirstName;
              // this.user.LastName = this.response.LastName;

              this.router.navigate(["/user-list"]);
              // this.notificationService.showSuccess('Saved successfully!!');
              // this.router.navigateByUrl('/quotation/committee-list');
            });
  }

  public createDataForm() {
    this.dataForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

}
