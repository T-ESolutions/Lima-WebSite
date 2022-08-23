import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
})
export class PasswordComponent implements OnInit {
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  passwordForm: FormGroup = new FormGroup({
    old_password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
    password_confirmation: new FormControl(null, [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(100),
    ]),
  });

  updatePasswordProfile(passwordForm: FormGroup) {
    this.spinner.show();
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (passwordForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      this._AuthService
        .updatePassword(this.passwordForm.value)
        .subscribe((response) => {
          if (response.status == 200) {
            this.spinner.hide();
            this.toastr.success(response.msg, 'Success');
            this._Router.navigate(['/account']);
          } else {
            this.spinner.hide();
            this.toastr.error(response.msg, 'Failed');
          }
        });
    }
    this.passwordForm.reset();
  }

  ngOnInit(): void {}
}
