import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {
  checkDir: boolean = true;
  postId: number = 0;
  categoryType: any;
  post: any = {};
  finalUrl:any;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _HomesService: HomesService,
    private toastr: ToastrService,
    private location: Location,
    private _Router: Router,
  ) {
    if(this._ActivatedRoute.snapshot.params?.['categoryId'] == localStorage.getItem("categoryId") && this._ActivatedRoute.snapshot.params?.['postId'] == localStorage.getItem("postId")){
    }else{
      this._Router.navigate(["/kids"]);
    }
  }

  ngOnInit(): void {
    this.postId = this._ActivatedRoute.snapshot.params?.['postId'];
    this.categoryType = this._ActivatedRoute.snapshot.params?.['categoryType'];
    if (localStorage.getItem('currentLanguage') == 'ar') {
      this.checkDir = true;
    } else {
      this.checkDir = false;
    }
    this.postDetails();
  }

  // 1- function to get post details
  postDetails() {
    this._HomesService.getPostDetails(this.postId).subscribe((response) => {
      if (response.status == 200) {
        this.post = response.data;
      } else {
        this.toastr.error(response.msg);
      }
    });
  }

  // 2- go back button function
  goBack(): void {
    if (this.categoryType == 'article') {
      this.location.back();
    } else {
      this.location.back();
      this.location.back();
    }
  }



}
