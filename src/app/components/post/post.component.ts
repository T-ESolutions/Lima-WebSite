import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  text:any="<h2 style='color:red'>mohamed hadaey ahmed abd elwahab </h2>"
  checkDir:boolean=true;
  postId: number = 0;
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

}
