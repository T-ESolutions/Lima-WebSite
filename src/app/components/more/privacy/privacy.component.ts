import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;

@Component({
  selector: 'app-privacy',
  templateUrl: './privacy.component.html',
  styleUrls: ['./privacy.component.scss'],
})
export class PrivacyComponent implements OnInit {
  Privacy: any = [];
  constructor(private _PagesService: PagesService) {
    this.getPrivacyData();
  }

  ngOnInit(): void {}

  getPrivacyData() {
    this.showLoader();
    // to get text of privacy
    this._PagesService.getPrivacy().subscribe((response) => {
      this.Privacy = response.data;
      this.hideLoader();
    });

  }


  // this function to show and hide loader
  showLoader(){
    $(".loader").css({"display":"flex","transition":"all 0.5s"})
    }
    hideLoader(){
      $(".loader").css({"display":"none","transition":"all 0.5s"})
    }
}
