import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../app.api.service';
import { User } from '../models/User';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  subscribers: any;
  getDataSubscriber$: any;
  users: User[];
  user: User = new User();

  constructor(public apiService: ApiService, public router: Router, private jwtHelper: JwtHelperService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.user)
  }

  getData() {
    this.subscribers.getUsers
      = this.getDataSubscriber$
      = this.apiService.httpGet<User[]>('User/GetUsers')
       .subscribe(result => {
         this.users = result;
       }, 
       (error) => {
         //console.error(error)
       },
       () =>{

       });
  }

  public logOut = () => {
    localStorage.removeItem("jwt");
    this.router.navigate(["/"]);
  }

  isUserAuthenticated() {
    const token = localStorage.getItem("jwt");
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    else {
      return false;
    }
  }

}
