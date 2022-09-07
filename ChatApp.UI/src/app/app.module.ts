import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { AppRoutingModule } from './app-routing.module';
import { JwtModule, JwtHelperService , JWT_OPTIONS} from "@auth0/angular-jwt";
import { LoginComponent } from './login/login.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AuthGuardService } from './auth-guard.service';
import { UserListComponent } from './user-list/user-list.component';



//function is use to get jwt token from local storage
export function tokenGetter() {
  return localStorage.getItem("jwt");
}

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    HomepageComponent,
    UserListComponent
  ],
  imports: [
    BrowserModule, 
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
  ],
  // JwtModule.forRoot({
  //   config: {
  //     tokenGetter: tokenGetter,
  //     allowedDomains: ["https://localhost:7095"],
  //     disallowedRoutes: []
  //   }
  // }),
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
