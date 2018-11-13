import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  handleError(error: Error) {
    const errorMessage = typeof (error) === 'undefined' ? '' : ': ' + error;
    return throwError('Server is not responding or response an error' + errorMessage);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getUsers(): Observable<any> {
    this.auth.getLoggedInUser();
    const user = JSON.parse(this.auth.currentUser);
    const apiUrl = 'http://localhost:3000/api/users';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: user.authorization
      })
    };
    return this.http.get(apiUrl, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

  getUser(id): Observable<any> {
    this.auth.getLoggedInUser();
    const user = JSON.parse(this.auth.currentUser);
    const apiUrl = `http://localhost:3000/api/users/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: user.authorization
      })
    };
    return this.http.get(apiUrl, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

  addUser(data): Observable<any> {

    const apiUrl = 'http://localhost:3000/api/users/new';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: "Basic " + btoa("admin" + ":" + "BgRFjA6rSVDVKrkxQPIHGkkGAkObTdD7")
      })
    };
    return this.http.post(apiUrl, data, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

  updateUser(id, data): Observable<any> {

    this.auth.getLoggedInUser();
    const user = JSON.parse(this.auth.currentUser);
    const apiUrl = `http://localhost:3000/api/users/edit/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: user.authorization
      })
    };
    return this.http.put(apiUrl, data, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

}
