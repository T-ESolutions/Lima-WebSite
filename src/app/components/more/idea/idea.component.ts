import { Component, OnInit } from '@angular/core';
import { HomesService } from 'src/app/services/homes.service';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;
@Component({
  selector: 'app-idea',
  templateUrl: './idea.component.html',
  styleUrls: ['./idea.component.scss'],
})
export class IdeaComponent implements OnInit {
  aboutUs: any = [];
  constructor(private _PagesService: PagesService,private _HomesService:HomesService) {
    this.getAboutUsData()
  }

  ngOnInit(): void {}

  getAboutUsData() {
    this._HomesService.showLoader()
    // to get about 80 fekra text
    this._PagesService.getAboutUs().subscribe((response) => {
      this.aboutUs = response.data;
      this._HomesService.hideLoader();
    });

  }

}
