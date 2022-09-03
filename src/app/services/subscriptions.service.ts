import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  subscribe_type_id:any;
  payment_method_id:any;
  constructor(
    private _Router: Router,
    private http: HttpClient,
    private _AuthService: AuthService
  ) {}


  getSubscriptionData():Observable<any>{
    return this.http.get(`${this._AuthService.baseUrl}v1/user/subscription/payment_step_one`)
  }


  getPaymentData():Observable<any>{

    return this.http.get(`${this._AuthService.baseUrl}v1/user/subscription/payment_step_two?payment_method_id=${this.payment_method_id}&subscribe_type_id=${this.subscribe_type_id}`)
  }
}
