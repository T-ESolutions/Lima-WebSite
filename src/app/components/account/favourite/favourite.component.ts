import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FavoritesService } from 'src/app/services/favorites.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
  currentLanguage: any = '';
  checkDir:boolean=true
  posts:any=[];
  constructor(private _FavoritesService:FavoritesService, private spinner: NgxSpinnerService, private toastr: ToastrService, private _Router: Router) {
    if(localStorage.getItem("currentLanguage") == "ar"){
      this.checkDir=true;
    }else{
      this.checkDir=false;
    }
    this.spinner.show()
    this.showFavourites()
  }

  ngOnInit(): void {}

  showFavourites(){
    this._FavoritesService.getFavourites().subscribe((response) => {
      this.posts = response.data.data;
      this.spinner.hide()
    })
  }


  post_is_data:any={post_id:5}
  makeLove(id:any,free:any){
    if(free==0){
      $(".modals").show();
      $(".sub-modal").show(300);
    }else if(free==1){
      this.post_is_data.post_id=id
      this._FavoritesService.addFavourite(this.post_is_data).subscribe((response) => {
        if(response.status == 200){
          this.toastr.success(response.msg);
          this.showFavourites()
        }
      })
    }
  }
}
