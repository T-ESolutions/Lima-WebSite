import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;
@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss'],
})
export class IdeaComponent implements OnInit {
  aboutUs: any = [];
  constructor(private _PagesService: PagesService) {
    this.getAboutUsData()
  }

  ngOnInit(): void {}

  getAboutUsData() {
    this.showLoader()
    // to get about 80 fekra text
    this._PagesService.getAboutUs().subscribe((response) => {
      this.aboutUs = response.data;
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
