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

  // this function to add favourite posts
  addFavourite(post_id_data:any): Observable<any> {
    return this.http.post(`${this._AuthService.baseUrl}v1/user/favorite/store`, post_id_data);
  }

  // this function to get favourite
  getFavourites(): Observable<any> {
    return this.http.get(`${this._AuthService.baseUrl}v1/user/favorites`);
  }

}
