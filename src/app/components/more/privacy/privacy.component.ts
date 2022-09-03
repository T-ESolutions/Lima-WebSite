import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';


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
    // to get text of privacy
    this._PagesService.getPrivacy().subscribe((response) => {
      this.Privacy = response.data;
    });
  }
}
