import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  public data: Array<any> = [];
  visible: boolean = true;
  changeType: boolean = true;
  cities: any = [];

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _HelpersService: HelpersService
  ) {}

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(255),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
    ]),
    city_id: new FormControl('0', [
      Validators.required,
      Validators.min(1),
      Validators.max(200),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
  });

  submitRegisterForm(registerForm: FormGroup) {
    this.spinner.show();
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (registerForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      this._AuthService
        .signUp(this.registerForm.value)
        .subscribe((response) => {
          if (response.status == 200) {
            this.spinner.hide();
            this.toastr.success(response.msg, 'Success');
            this._AuthService.data = this.registerForm.value;
            this._Router.navigate(['/account/varify']);
          } else if (response.status == 401) {
            this.spinner.hide();
            this.toastr.error(response.msg, 'Failed');
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

  // this function to show and hide password
  viewPassword() {
    this.visible = !this.visible;
    this.changeType = !this.changeType;
  }
}
