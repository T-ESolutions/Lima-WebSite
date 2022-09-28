import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { AcademicService } from 'src/app/services/academic.service';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-subject',
  templateUrl: './subject.component.html',
  styleUrls: ['./subject.component.scss']
})
export class SubjectComponent implements OnInit {
  checkDir: boolean = true;
  subjectId:any;
  lessons:any[] = [];
  constructor(private _AcademicService:AcademicService, private toastr: ToastrService, private _HomesService: HomesService, private _Router: Router, private _ActivatedRoute: ActivatedRoute, private location: Location) {
    if (localStorage.getItem('currentLanguage') == 'ar') {
      this.checkDir = true;
    } else {
      this.checkDir = false;
    }
     // subjectId coming from years categories
     this.subjectId = Number(this._ActivatedRoute.snapshot.params?.['subjectId']);
   }

  ngOnInit(): void {
    this.getSubjectLessons();
  }

  // get subject lessons
  getSubjectLessons(){
    this._HomesService.showLoader();
    this._AcademicService.getSubjectLessons(this.subjectId).subscribe((response) => {
      if(response.status == 200){
        this.lessons = response.data.data;
        this._HomesService.hideLoader();
      } else{
        this._HomesService.hideLoader();
        this.toastr.error(response.msg)
      }
    } , (error => {
      this._HomesService.hideLoader();
      this.toastr.error(error.statusText)
    }))
  }

  url:any;
  getLisson(link:any){
    this.url = link;
  }

}
