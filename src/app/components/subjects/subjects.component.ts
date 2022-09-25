import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-subjects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss']
})
export class SubjectsComponent implements OnInit {
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
