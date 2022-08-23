import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HttpClient } from '@angular/common/http';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-myinfo',
  templateUrl: './myinfo.component.html',
  styleUrls: ['./myinfo.component.scss'],
})
export class MyinfoComponent implements OnInit {
  decoded: any;
  public data: Array<any> = [];
  cities: any = [];

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private _HelpersService: HelpersService
  ) {
    this.spinner.show();
    this.getUserData();
    this.spinner.hide();
  }

  // this method to get data or user directly
  getUserData() {
    this._AuthService.getProfileData().subscribe((response) => {
      this.profileForm.patchValue({ name: response.data.name });
      this.profileForm.patchValue({ phone: response.data.phone });
      this.profileForm.patchValue({ city_id: response.data.city_id });
    });
  }

  profileForm: FormGroup = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255),
    ]),
    phone: new FormControl('', [Validators.required, Validators.maxLength(20)]),
    city_id: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(200),
    ]),
  });

  submitProfileForm(profileForm: FormGroup) {
    this.spinner.show();
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (profileForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      this._AuthService
        .updateProfile(this.profileForm.value)
        .subscribe((response) => {
          if (response.status == 200) {
            this.spinner.hide();
            this.toastr.success(response.msg, 'Success');
          } else {
            this.spinner.hide();
            this.toastr.error(response.msg, 'Failed');
          }
        });
    }
  }

  ngOnInit(): void {
    // to get name of cities
    this._HelpersService.getCities().subscribe((response) => {
      this.cities = response.data;
    });
  }
}
