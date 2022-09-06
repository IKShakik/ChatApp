import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError} from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public baseUrl = 'https://localhost:7095/api/';

  constructor(public http: HttpClient) { }

  public httpGet<T>(url: string): Observable<T> {
    return this.http.get<T>(this.baseUrl + url)
                .pipe(catchError(this.handleClientError));
  }

  public handleClientError(error: HttpErrorResponse) {
    return throwError(
      () => new Error(error.message || 'An error has been occurred. Please try again or contact to system administrator')
    );
  }



// import {Injectable} from '@angular/core';
// import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
// import {Observable, Subject, throwError} from 'rxjs';
// import {catchError} from 'rxjs/operators';

// @Injectable({
//   providedIn: 'root',
// })
// export class ApiService {

//   public baseUri = 'http://localhost:62524/api/';

//   constructor(public httpClient: HttpClient) {
//   }

  // public httpGet<T>(url: string): Observable<T> {
  //   return this.http.get<T>(this.baseUrl + url)
  //     .pipe(
  //       catchError(this.handleClientError)
  //     );
  // }

//   public httpGetByKey<T>(url: string, key: any): Observable<T> {
//     return this.httpClient.get<T>(this.baseUri + url + key)
//       .pipe(
//         catchError(this.handleClientError)
//       );
//   }

  public httpPost<T>(url: string, body: any): Observable<T> {
    return this.http.post<T>(this.baseUrl + url, body)
      .pipe(
        catchError(this.handleClientError)
      );
  }

//   public httpDelete<T>(url: string, key: any): Observable<T> {
//     return this.httpClient.delete<T>(this.baseUri + url + key)
//       .pipe(
//         catchError(this.handleClientError)
//       );
//   }
}