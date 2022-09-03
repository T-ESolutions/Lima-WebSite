import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class HomesService {
  constructor(
    private _Router: Router,
    private http: HttpClient,
    private _AuthService: AuthService
  ) {}

  // to get kids categories
  getKidsCategories():Observable<any>{
    return this.http.get(`${this._AuthService.baseUrl}v1/app/home/categories/1`)
  }

  // to get moms categories
  getMomsCategories():Observable<any>{
    return this.http.get(`${this._AuthService.baseUrl}v1/app/home/categories/2`)
  }

  // to get article posts
  getArticlePosts(categoryId: number):Observable<any>{
    return this.http.get<string>(`${this._AuthService.baseUrl}v1/app/category/posts/${categoryId}`)
  }

  // to get videos





  // to get sub categories
  getSubcategories(categoryId:any):Observable<any>{
    return this.http.get(`${this._AuthService.baseUrl}v1/app/category/sub_categories/${categoryId}`)
  }



  // to get post details
  getPostDetails(postId: number):Observable<any>{
    return this.http.get(`${this._AuthService.baseUrl}v1/app/post/details/${postId}`)
  }



}
