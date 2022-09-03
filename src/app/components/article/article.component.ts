import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;


@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  articlePosts:any=[];
  post_ID: any;
  checkDir:boolean=true;
  categoryId:number=0;
  sourceRoute:any="";
  subCategories:any
  constructor(private _HomesService:HomesService, private toastr: ToastrService, private _Router: Router, private spinner: NgxSpinnerService, private _ActivatedRoute:ActivatedRoute,private _AuthService: AuthService) {
    this.categoryId = this._ActivatedRoute.snapshot.params?.['categoryId'];
    this.sourceRoute = this._ActivatedRoute.snapshot.params?.['sourceRoute'];
    if(localStorage.getItem("currentLanguage") == "ar"){
      this.checkDir=true;
    }else{
      this.checkDir=false;
    }
    this.spinner.show();
    this.getPosts();
    this.showSubcategories();

  }

  ngOnInit(): void {
  }

  getPosts(){
    this.spinner.show();
    this._HomesService.getArticlePosts(this.categoryId).subscribe((response) => {
      if(response.status == 200){
        this.articlePosts = response.data.data;
        this.spinner.hide();
      }else{
        this.toastr.error(response.msg);
        this.spinner.hide();
      }
    })
  }

  getTeacherPosts(id:any){
    this.spinner.show();
    this._HomesService.getArticlePosts(id).subscribe((response) => {
      if(response.status == 200){
        this.articlePosts = response.data.data;
        this.spinner.hide();
      }else{
        this.toastr.error(response.msg);
        this.spinner.hide();
      }
    })
  }

  showSubcategories(){
    this._HomesService.getSubcategories(this.categoryId).subscribe((response) => {
      if(response.status == 200){
        this.subCategories = response.data;
      }else{
        this.toastr.error(response.msg);
      }
    })
  }

  showPost(id:any,free:any){
    if(free==0){
      $(".modals").show();
      $(".sub-modal").show(300);
    }else if(free==1){
      this._Router.navigate([`/article/${this.categoryId}/${this.sourceRoute}/post`, id]);
    }
  }

  subNow(){
    $(".modals").hide();
    $(".sub-modal").hide(300);
    this._Router.navigate(["/account/subscribe"]);
  }

    goBack(){
      this._Router.navigate([`/${this.sourceRoute}`]);
    }
}
