import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: any;

  constructor(private http: HttpClient, private router: Router) { }

  handleError(error: Error) {
    const errorMessage = typeof (error) === 'undefined' ? '' : ': ' + error;
    return throwError('Server is not responding or response an error' + errorMessage);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  login(username: string, password: string): Observable<any> {
    const apiUrl = 'http://localhost:3000/auth/authenticate';
    return this.http.post<any>(apiUrl, { email: username, password: password }).pipe(map(this.extractData), catchError(this.handleError));
  }

  logout() {
    this.currentUser = null;
    localStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  setLoggedInUser(user) {
    localStorage.setItem('currentUser', JSON.stringify({ user,  authorization: user.authorization }));
  }

  getLoggedInUser() {
    this.currentUser = localStorage.getItem('currentUser');
  }

  isLoggedIn() {
    this.getLoggedInUser();
    return !!this.currentUser;
  }
}
