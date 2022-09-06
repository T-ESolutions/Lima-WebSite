import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { HelpersService } from 'src/app/services/helpers.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.scss']
})
export class ForgetpassComponent implements OnInit {

  public data: Array<any> = [];
  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private _HelpersService: HelpersService
  ) {
  }

  forgetPassForm: FormGroup = new FormGroup({
    phone: new FormControl(null, [
      Validators.required,
      Validators.maxLength(20),
      Validators.minLength(5)
    ])
  });

  submitforgetPassForm(forgetPassForm: FormGroup) {
    this.spinner.show();
    // if user delete [disabled]="forgetPassForm.invalid" from html inspect
    if (forgetPassForm.invalid) {
      this.spinner.hide();
      return;
    } else {
      this._AuthService.phoneChangePass = this.forgetPassForm.value.phone;
      this._AuthService
        .forgetPassword(this.forgetPassForm.value)
        .subscribe((response) => {
          if (response.status == 200) {
            this.spinner.hide();
            this.toastr.success(response.msg);
            this._Router.navigate(['/account/varifypassword']);
          } else if (response.status == 401) {
            this.spinner.hide();
            this.toastr.error(response.msg);
          } else {
            this.spinner.hide();
            this.toastr.error(response.msg);
          }
        });
        this.forgetPassForm.reset()
    }
  }

  ngOnInit(): void {

  }



}
