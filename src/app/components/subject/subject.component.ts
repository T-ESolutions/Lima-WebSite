import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {

  checkDir: boolean = true;
  constructor(private location: Location) {
    if (localStorage.getItem('currentLanguage') == 'ar') {
      this.checkDir = true;
    } else {
      this.checkDir = false;
    }
   }

  ngOnInit(): void {
  }

}
