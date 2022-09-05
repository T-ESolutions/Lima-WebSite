import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { HomesService } from '../../services/homes.service';
declare var $: any;

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  checkDir:boolean=true;
  categoryId:number=0;
  categoryType:any="";
  sourceRoute:any="";
  subCategories:any;
  posts:any=[];
  constructor(private _HomesService:HomesService, private toastr: ToastrService, private _Router: Router, private spinner: NgxSpinnerService, private _ActivatedRoute:ActivatedRoute,private _AuthService: AuthService) {
    this.categoryId = this._ActivatedRoute.snapshot.params?.['categoryId'];
    this.categoryType = this._ActivatedRoute.snapshot.params?.['categoryType'];
    this.sourceRoute = this._ActivatedRoute.snapshot.params?.['sourceRoute'];
    if(localStorage.getItem("currentLanguage") == "ar"){
      this.checkDir=true;
    }else{
      this.checkDir=false;
    }
    this.spinner.show();
    this.showSubcategories();
    this.getPostsData();
  }
  ngOnInit(): void {
  }


  //to get posts data

  getPostsData(){
    this.spinner.show();
    if(this.categoryType=="article"){
      this._HomesService.getPosts(this.categoryId).subscribe((response) => {
        if(response.status == 200){
          this.posts = response.data.data;
          this.spinner.hide();
        }else{
          this.toastr.error(response.msg);
          this.spinner.hide();
        }
      })
    }else if(this.categoryType=="video"){
      this._HomesService.getPosts(this.categoryId).subscribe((response) => {
        if(response.status == 200){
          this.posts = response.data.data;
          this.spinner.hide();
        }else{
          this.toastr.error(response.msg);
          this.spinner.hide();
        }
      })
    }

  }


  getTeacherPosts(id:any){
    this.spinner.show();
    this._HomesService.getPosts(id).subscribe((response) => {
      if(response.status == 200){
        this.posts = response.data.data;
        this.spinner.hide();
      }else{
        this.toastr.error(response.msg);
        this.spinner.hide();
      }
    })
  }

  // showing posts according to subscibe or no
  showPost(id:any,free:any){
    if(free==0){
      $(".modals").show();
      $(".sub-modal").show(300);
    }else if(free==1){
      this._Router.navigate([`/posts/${this.categoryId}/${this.categoryType}/post`, id]);
    }
  }

  subNow(){
    $(".modals").hide();
    $(".sub-modal").hide(300);
    this._Router.navigate(["/account/subscribe"]);
  }

  // to get subcategories
  showSubcategories(){
    this._HomesService.getSubcategories(this.categoryId).subscribe((response) => {
      if(response.status == 200){
        this.subCategories = response.data;
      }else{
        this.toastr.error(response.msg);
      }
    })
  }


  // to close modal
  closeModal(){
    $(".sub-modal").hide(300);
    $(".modals").hide();

  }

  goBack(){
    this._Router.navigate([`/${this.sourceRoute}`]);
  }

}
