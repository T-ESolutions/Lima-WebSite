import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SubscriptionsService } from 'src/app/services/subscriptions.service';
import { Router } from '@angular/router';
import { TranslationService } from 'src/app/services/translation.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomesService } from 'src/app/services/homes.service';
declare var $: any;

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {
  currentLanguage: any = '';
  checkDir:boolean=true;
  subscription_types:any = [];
  payment_methods:any = [];
  fawry_code:any;
  expireDateOfFawrCode:any;
  aman_code:any;
  wallet_code:any;
  constructor(
    public translate: TranslateService,
    public _TranslationService: TranslationService,
    private _SubscriptionsService: SubscriptionsService,
    private toastr: ToastrService,
    private _Router: Router,
    private spinner: NgxSpinnerService,
    private _HomesService:HomesService
  ) {
    this._HomesService.showLoader();
    if(localStorage.getItem("currentLanguage") == "ar"){
      this.checkDir=true;
    }else{
      this.checkDir=false;
    }
    this.getSubscriptionDetails();
  }

  ngOnInit(): void {}

  getSubscriptionDetails(){
    this._SubscriptionsService.getSubscriptionData().subscribe((response) => {
      if(response.status == 200){
        this.subscription_types = response.data.subscription_types;
        this.payment_methods = response.data.payment_methods.data;
        this._HomesService.hideLoader();
      }else{
        this._HomesService.hideLoader();
        this.toastr.error(response.ms);
      }
    })
  }

  subscriptionForm: FormGroup = new FormGroup({
    sub_type: new FormControl(1,Validators.required),
    pay_type: new FormControl(3,Validators.required)
  });


  submitSubscriptionForm(subscriptionForm:any){

    this._SubscriptionsService.subscribe_type_id = subscriptionForm.controls.sub_type.value;
    this._SubscriptionsService.payment_method_id = subscriptionForm.controls.pay_type.value
    this.getPaymentWay();

  }

  getPaymentWay(){
    this._HomesService.showLoader();
    this._SubscriptionsService.getPaymentData().subscribe((response) => {
      if(response.status == 200){
        if(this._SubscriptionsService.payment_method_id==3){
          this.fawry_code = response.data.data.payment_data.fawryCode;
          this.expireDateOfFawrCode = response.data.data.payment_data.expireDate;
          $(".modals").show();
          $(".wallet-modal").hide();
          $(".aman-modal").hide();
          $(".fawry-modal").show(300);
        }else if(this._SubscriptionsService.payment_method_id == 4){
          this.wallet_code = response.data.data.payment_data.meezaReference;
          $(".modals").show();
          $(".aman-modal").hide();
          $(".fawry-modal").hide();
          $(".wallet-modal").show(300);
        }else if(this._SubscriptionsService.payment_method_id == 10){
          window.open(response.data.data.payment_data.redirectTo, '_blank');
          this._Router.navigate(['/kids']);
        }else if(this._SubscriptionsService.payment_method_id == 12){
          this.aman_code = response.data.data.payment_data.amanCode;
          $(".modals").show();
          $(".fawry-modal").hide();
          $(".wallet-modal").hide();
          $(".aman-modal").show(300);
        }else{
          this.toastr.error("it's not available");
        }
      }else{
        this.toastr.error(response.ms);
      }
      this._HomesService.hideLoader();
    })
  }

  closeModal(){
    $(".modals").hide();
  }

  getHome(){
    setTimeout(() => {
      this._Router.navigate(['/kids']);
    }, 500);
  }

}
