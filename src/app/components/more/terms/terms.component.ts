import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';


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
    // to get text of terms
    this._PagesService.getTerms().subscribe((response) => {
      this.Terms = response.data;
    });
  }
}
