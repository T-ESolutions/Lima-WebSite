import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class FavoritesService {
  constructor(
    private _Router: Router,
    private http: HttpClient,
    private _AuthService: AuthService
  ) {}

  // signup function
  getFavourites(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}/v1/user/favorites`);
  }
}
