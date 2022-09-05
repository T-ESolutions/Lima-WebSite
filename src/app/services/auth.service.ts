import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

// to decode the token of user data
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // baseUrl:any = "https://limazola.com/api/";
  baseUrl: any = 'https://sublima.limazola.com/api/';
  token_api: any;
  data: any = [];
  constructor(private _Router: Router, private http: HttpClient) {
    // to keep user logged in while making refresh
    if (localStorage.getItem('token_api') != null) {
      this.saveUserData();
    }
  }

  // userData of type of BehaviorSubject to make data listen in all project
  userData = new BehaviorSubject(null);

  saveUserData() {
    let encodedUserData = JSON.stringify(localStorage.getItem('token_api'));
    this.userData.next(jwtDecode(encodedUserData));
  }

  //to log out
  logOut(Authorization:any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/user/logout`,Authorization);
  }

  // signup function
  signUp(registerData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/auth/register`, registerData);
  }

  // varify phone function
  varifyPhone(varifyData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/auth/verify_phone`, varifyData);
  }

  // signin function
  signIn(loginData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/auth/login`, loginData);
  }

  // get profile data function
  getProfileData(): Observable<any> {
    return this.http.get(`${this.baseUrl}v1/user/profile`);
  }

  // update profile data function
  updateProfile(profileData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}v1/user/profile/update`, profileData);
  }

  // update password function
  updatePassword(profilePassword: any): Observable<any> {
    return this.http.post(
      `${this.baseUrl}v1/user/profile/update_password`,
      profilePassword
    );
  }


}
