import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-newpassword',
  templateUrl: './newpassword.component.html',
  styleUrls: ['./newpassword.component.scss']
})
export class NewpasswordComponent implements OnInit {

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  newPasswordForm: FormGroup = new FormGroup({
    phone: new FormControl(this._AuthService.phoneChangePass, [
      Validators.required
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

  changeUserPassword(newPasswordForm: FormGroup) {
    this.spinner.show();
    // if user delete [disabled]="registerForm.invalid" from html inspect
    if (newPasswordForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      this._AuthService
        .changePassword(this.newPasswordForm.value)
        .subscribe((response) => {
          if (response.status == 200) {
            this.spinner.hide();
            this.toastr.success(response.msg);
            this._Router.navigate(['/account/login']);
          } else {
            this.spinner.hide();
            this.toastr.error(response.msg);
          }
        });
    }
    this.newPasswordForm.reset();
  }

  ngOnInit(): void {}
}
