import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.scss'],
})
export class TermsComponent implements OnInit {
  Terms: any = [];
  constructor(private _PagesService: PagesService) {
    this.getTermsData();
  }

  ngOnInit(): void {}

  getTermsData() {
    this.showLoader();
    // to get text of terms
    this._PagesService.getTerms().subscribe((response) => {
      this.Terms = response.data;
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
