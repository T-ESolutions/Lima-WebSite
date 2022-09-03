import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-varify',
  templateUrl: './varify.component.html',
  styleUrls: ['./varify.component.scss'],
})
export class VarifyComponent implements OnInit {
  numbers = new Array(4);
  otp: any = '';
  data: any = { name: '', phone: 123, city_id: 1, password: '', otp: 2 };

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {}

  varifyForm: FormGroup = new FormGroup({
    otp1: new FormControl(null, [Validators.required]),
    otp2: new FormControl(null, [Validators.required]),
    otp3: new FormControl(null, [Validators.required]),
    otp4: new FormControl(null, [Validators.required]),
  });

  submitVarifyForm(varifyForm: FormGroup) {
    this.spinner.show();
    this.otp = Number(
      `${varifyForm.value.otp1}${varifyForm.value.otp2}${varifyForm.value.otp3}${varifyForm.value.otp4}`
    );

    this.varify(this.otp);

    this.data.name = this._AuthService.data.name;
    this.data.phone = this._AuthService.data.phone;
    this.data.city_id = Number(this._AuthService.data.city_id);
    this.data.password = this._AuthService.data.password;
    this._AuthService.varifyPhone(this.data).subscribe((response) => {
      if (response.status == 200) {
        this.spinner.hide();
        this.toastr.success(response.msg);
        localStorage.setItem('token_api', response.data.token_api);
        this._AuthService.saveUserData();
        this._Router.navigate(['/kids']);
      } else {
        this.spinner.hide();
        this.toastr.error(response.msg);
      }
    });
    this.varifyForm.reset();
  }

  varify(otp: any) {
    this.data.otp = otp;
  }

  // this is the best method to handle the otp inputs in angular
  move(e: any, p: any, c: any, n: any) {
    var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if (length == maxlength) {
      if (n != '') {
        n.focus();
      }
    }
    if (e.key == 'Backspace') {
      if (p != '') {
        p.focus();
      }
    }
  }
}
