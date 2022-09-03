import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.scss']
})
export class VideoComponent implements OnInit {
  categoryId:number=0;
  sourceRoute:any="";
  checkDir:boolean=true;
  constructor(private _ActivatedRoute:ActivatedRoute, private _Router: Router) {
    this.categoryId = this._ActivatedRoute.snapshot.params?.['categoryId'];
    this.sourceRoute = this._ActivatedRoute.snapshot.params?.['sourceRoute'];
    if(localStorage.getItem("currentLanguage") == "ar"){
      this.checkDir=true;
    }else{
      this.checkDir=false;
    }
  }

  ngOnInit(): void {
  }



  goBack(){
    this._Router.navigate([`/${this.sourceRoute}`]);
  }
}
