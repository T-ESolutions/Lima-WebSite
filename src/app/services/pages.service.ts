import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// to decode the token of user data
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class PagesService {
  constructor(
    private _Router: Router,
    private http: HttpClient,
    private _AuthService: AuthService
  ) {}

  // get teams function
  getTeam(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/app/teams`);
  }

  // get links to contact function
  getLinks(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/app/links`);
  }
}
