import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';

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
    // to get about 80 fekra text
    this._PagesService.getAboutUs().subscribe((response) => {
      this.aboutUs = response.data;
    });
  }
}
