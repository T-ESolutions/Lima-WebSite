import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;
@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  aboutApp: any = [];
  constructor(private _PagesService: PagesService) {
    this.getAboutAppData()
  }

  ngOnInit(): void {}

  getAboutAppData() {
    this.showLoader();
    // to get about application text
    this._PagesService.getAboutApp().subscribe((response) => {
      this.aboutApp = response.data;
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
