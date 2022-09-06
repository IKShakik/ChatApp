import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../app.api.service';
import { User } from '../models/User';

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

  constructor(public formBuilder: FormBuilder,
    public apiService: ApiService,
    public router: Router) {
    this.createDataForm();
  }

  ngOnInit() {
    this.user = new User();
  }

  public submit(): void {

    if (this.user !== undefined || this.user !== null) {
      this.subscribers.saveData
        = this.saveDataSubscriber$
        = this.apiService.httpPost('User/SaveUser/', this.user)
        .subscribe(x => {
          },
          (x) => {
            console.log(x);
          },
          () => {
            // this.notificationService.showSuccess('Saved successfully!!');
            // this.router.navigateByUrl('/quotation/committee-list');
          });
    }
  }

  public createDataForm() {
    this.dataForm = this.formBuilder.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required]
    });
  }

}
