import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { ApiService } from './app.api.service';
import { User } from './models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  subscribers: any = {};
  getDataSubscriber$: Subscription;
  public users: User[] = [];
  public forecasts: WeatherForecast[] = [];

  constructor(public apiService: ApiService){

  }

  title = 'ChatApp.UI';

  getData() {
    this.subscribers.getEmployees
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
}

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}
