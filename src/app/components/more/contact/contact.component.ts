import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit {
  links: any = [];
  constructor(private _PagesService: PagesService) {
    this.getContactLinks();
  }

  ngOnInit(): void {}

  getContactLinks() {
    // to get links to contact
    this._PagesService.getLinks().subscribe((response) => {
      this.links = response.data;
    });
  }
}
