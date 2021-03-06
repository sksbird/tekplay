import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Complaint } from '../models/complaint.model';

@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  constructor(private http: HttpClient, private auth: AuthService) { }

  handleError(error: Error) {
    const errorMessage = typeof (error) === 'undefined' ? '' : ': ' + error.message;
    return throwError('Server is not responding or response an error' + errorMessage);
  }

  private extractData(res: Response) {
    const body = res;
    return body || {};
  }

  getComplaints(): Observable<any> {
    this.auth.getLoggedInUser();
    const user = JSON.parse(this.auth.currentUser);
    const apiUrl = 'http://localhost:3000/api/complaints';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: user.authorization
      })
    };
    return this.http.get(apiUrl, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

  getComplaint(id): Observable<any> {
    this.auth.getLoggedInUser();
    const user = JSON.parse(this.auth.currentUser);
    const apiUrl = `http://localhost:3000/api/complaints/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: user.authorization
      })
    };
    return this.http.get(apiUrl, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

  addComplaint(data): Observable<any> {

    this.auth.getLoggedInUser();
    const user = JSON.parse(this.auth.currentUser);
    const apiUrl = 'http://localhost:3000/api/complaints/new';
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: user.authorization
      })
    };
    return this.http.post(apiUrl, data, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

  updateComplaint(id, data): Observable<any> {

    this.auth.getLoggedInUser();
    const user = JSON.parse(this.auth.currentUser);
    const apiUrl = `http://localhost:3000/api/complaints/edit/${id}`;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
         Authorization: user.authorization
      })
    };
    return this.http.put(apiUrl, data, httpOptions).pipe(map(this.extractData), catchError(this.handleError));
  }

}
