import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';

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
    // to get about application text
    this._PagesService.getAboutApp().subscribe((response) => {
      this.aboutApp = response.data;
    });
  }
}
