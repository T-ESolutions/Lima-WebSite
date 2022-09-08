import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;
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
    this.showLoader();
    // to get links to contact
    this._PagesService.getLinks().subscribe((response) => {
      this.links = response.data;
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
