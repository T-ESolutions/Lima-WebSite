import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { FavoritesService } from 'src/app/services/favorites.service';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.component.html',
  styleUrls: ['./favourite.component.scss'],
})
export class FavouriteComponent implements OnInit {
  currentLanguage: any = '';
  checkDir:boolean=true
  posts:any=null;
  constructor(private _FavoritesService:FavoritesService, private spinner: NgxSpinnerService) {
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
}
