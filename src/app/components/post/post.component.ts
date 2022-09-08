import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';
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
  constructor( private _Router: Router ,private _ActivatedRoute:ActivatedRoute, private _HomesService:HomesService,    private toastr: ToastrService) {
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
    this.showLoader();
    this._HomesService.getPostDetails(this.postId).subscribe((response) => {
      if(response.status==200){
        this.post = response.data;
      }else{
        this.toastr.error(response.msg);
      }
    })
    this.hideLoader();
  }


  goBack(){
    this._Router.navigate([`/kids`]);
  }


   // this function to show and hide loader
   showLoader(){
    $(".loader").css({"display":"flex","transition":"all 0.5s"})
    }
    hideLoader(){
      $(".loader").css({"display":"none","transition":"all 0.5s"})
    }
}
