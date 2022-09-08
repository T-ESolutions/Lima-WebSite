import { NgStyle } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { FavoritesService } from 'src/app/services/favorites.service';
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
  liked:boolean=false
  constructor(private _HomesService:HomesService, private toastr: ToastrService, private _Router: Router, private spinner: NgxSpinnerService, private _ActivatedRoute:ActivatedRoute,private _AuthService: AuthService,private _FavoritesService:FavoritesService ) {
    this.categoryId = this._ActivatedRoute.snapshot.params?.['categoryId'];
    this.categoryType = this._ActivatedRoute.snapshot.params?.['categoryType'];
    this.sourceRoute = this._ActivatedRoute.snapshot.params?.['sourceRoute'];
    if(localStorage.getItem("currentLanguage") == "ar"){
      this.checkDir=true;
    }else{
      this.checkDir=false;
    }
    this.showSubcategories();
    this.getPostsData();
  }
  ngOnInit(): void {
  }

  // this function to show and hide loader
  showLoader(){
    $(".loader").css({"display":"flex","transition":"all 0.5s"})
  }
  hideLoader(){
    $(".loader").css({"display":"none","transition":"all 0.5s"})
  }


  //to get posts data
  getPostsData(){
    this.showLoader();
    if(this.categoryType=="article"){
      this._HomesService.getPosts(this.categoryId).subscribe((response) => {
        if(response.status == 200){
          this.posts = response.data.data;
        }else{
          this.toastr.error(response.msg);
        }
        this.hideLoader();
      })
    }else if(this.categoryType=="video"){
      this._HomesService.getPosts(this.categoryId).subscribe((response) => {
        if(response.status == 200){
          this.posts = response.data.data;
        }else{
          this.toastr.error(response.msg);
        }
        this.hideLoader();
      })
    }
    ;
  }


  getTeacherPosts(id:any){
    this.showLoader();
    this._HomesService.getPosts(id).subscribe((response) => {
      if(response.status == 200){
        this.posts = response.data.data;
      }else{
        this.toastr.error(response.msg);
      }
      this.hideLoader()
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

  post_is_data:any={post_id:5}
  makeLove(id:any,free:any){
    if(this._AuthService.subscriber == 0){
      $(".modals").show();
      $(".sub-modal").show(300);
    }else{
      if(free==0){
        $(".modals").show();
        $(".sub-modal").show(300);
      }else if(free==1){
        this.post_is_data.post_id=id
        this._FavoritesService.addFavourite(this.post_is_data).subscribe((response) => {
          if(response.status == 200){
            this.toastr.success(response.msg);
          }
        })
      }
    }

  }

  makeLike(id:any,free:any){

    this.post_is_data.post_id=id
    this._HomesService.addLike(this.post_is_data).subscribe((response) => {
      if(response.status == 200){

        this.toastr.success(response.msg);


        // this._HomesService.getPostDetails(id).subscribe((response) => {
        //   if(response.status==200){
        //     // this.post = response.data;
        //     console.log(response.data.likes);
        //     console.log(this.posts.id)
        //     // this.posts[id].likes = response.data.likes
        //   }else{
        //     this.toastr.error(response.msg);
        //   }
        // })


        console.log(response)

      }
    })



    // if(this._AuthService.subscriber == 0){
    //   $(".modals").show();
    //   $(".sub-modal").show(300);
    // }else{
    //   if(free==0){
    //     $(".modals").show();
    //     $(".sub-modal").show(300);
    //   }else if(free==1){
    //     this.post_is_data.post_id=id
    //     this._HomesService.addLike(this.post_is_data).subscribe((response) => {
    //       if(response.status == 200){
    //         this.toastr.success(response.msg);
    //       }
    //     })
    //   }
    // }
  }
}
