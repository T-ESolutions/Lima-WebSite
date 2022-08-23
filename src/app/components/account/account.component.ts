import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
  isLogin: boolean = false;
  userDetails: any = {};
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  ngOnInit(): void {
    // this method used to watch userData contenously
    this._AuthService.userData.subscribe(() => {
      if (this._AuthService.userData.getValue() != null) {
        this.isLogin = true;
        this.userDetails = this._AuthService.userData.value;
      } else {
        this.isLogin = false;
      }
    });
  }

  logOut() {
    this._AuthService.logOut();
    this.userDetails = {};
  }
}
