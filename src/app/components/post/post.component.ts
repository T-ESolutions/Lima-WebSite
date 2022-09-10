import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';
import { Location } from '@angular/common';
declare var $: any;

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  text:any="<h2 style='color:red'>mohamed hadaey ahmed abd elwahab </h2>"
  checkDir:boolean=true;
  postId: number = 0;
  categoryType:any;
  post:any={};
  constructor( private _Router: Router ,private _ActivatedRoute:ActivatedRoute, private _HomesService:HomesService,    private toastr: ToastrService,private location: Location) {
    if(localStorage.getItem("currentLanguage") == "ar"){
      this.checkDir=true;
    }else{
      this.checkDir=false;
    }
  }

  ngOnInit(): void {
    this.postId = this._ActivatedRoute.snapshot.params?.['postId'];
    this.categoryType = this._ActivatedRoute.snapshot.params?.['categoryType'];
    this.postDetails();
  }

  postDetails(){
    
    this._HomesService.getPostDetails(this.postId).subscribe((response) => {
      if(response.status==200){
        this.post = response.data;
      }else{
        this.toastr.error(response.msg);
      }
    })
  }


  goBack():void{
    this.location.back()
  }
}
