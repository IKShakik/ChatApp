import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../app.api.service';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JWTTokenResponse } from '../models/JWTTokenResponse';

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

  constructor(public formBuilder: FormBuilder,
    public apiService: ApiService,
    public router: Router,
    public jwtHelper : JwtHelperService,
    public http: HttpClient) {
    this.createDataForm();
  }

  ngOnInit() {
    this.user = new User();
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
        = this.apiService.httpPost('Authentication/Lgin', this.user)
          .subscribe(response => {
              //this.user = response as any;
              var x: JWTTokenResponse = response as any;
              const token = (<any>response).token;
              localStorage.setItem("jwt", token);
              this.invalidLogin = false;
              this.router.navigate(["/home"]);
              console.log('user response: ', x);
            }, err => {
                this.invalidLogin = true;
              });

              // this.http.post(this.url, this.user, {
              //       headers: new HttpHeaders({
              //         "Content-Type": "application/json"
              //       })
              //     }).subscribe(response => {
              //       const token = (<any>response).token;
              //       localStorage.setItem("jwt", token);
              //       this.invalidLogin = false;
              //       this.router.navigate(["/home"]);
              //       console.log('user response: ', response);
              //     }, err => {
              //       this.invalidLogin = true;
              //     });
  }

  public createDataForm() {
    this.dataForm = this.formBuilder.group({
      email: ['', Validators.required]
    });
  }

}
