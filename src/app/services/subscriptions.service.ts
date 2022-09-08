import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// import Observable to be able to make subscribe in any function
import { Observable } from 'rxjs';
// import AuthService to be able to use baseUrl instead or repeet baseUrl
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class SubscriptionsService {
  // this value to record type of subscription (annual or midterm)
  subscribe_type_id:any;
  // this value to record method of payment
  payment_method_id:any;
  constructor(
    private http: HttpClient,
    private _AuthService: AuthService
  ) {}

 // 25- this function to get terms and condition text
  getSubscriptionData():Observable<any>{
    return this.http.get(`${this._AuthService.baseUrl}v1/user/subscription/payment_step_one`)
  }

 // 26- this function to get terms and condition text
  getPaymentData():Observable<any>{
    return this.http.get(`${this._AuthService.baseUrl}v1/user/subscription/payment_step_two?payment_method_id=${this.payment_method_id}&subscribe_type_id=${this.subscribe_type_id}`)
  }
}
