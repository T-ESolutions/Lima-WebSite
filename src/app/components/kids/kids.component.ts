import { Component, OnInit } from '@angular/core';
import { HomesService } from 'src/app/services/homes.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-kids',
  templateUrl: './kids.component.html',
  styleUrls: ['./kids.component.scss']
})
export class KidsComponent implements OnInit {
  kidsCategories:any = [];
  kidsRoute:any = [{name: "cartoon"},{name: "tales"},{name: "stories"},{name: "articles"}]
  constructor(private _HomesService:HomesService, private toastr: ToastrService, private _Router: Router) {
    this. getKids()
   }

  ngOnInit(): void {

  }

  getKids(){
    this._HomesService.getKidsCategories().subscribe((response) => {
      if(response.status == 200){
        this.kidsCategories = response.data.categories;
      }else{
        this.toastr.error(response.msg, 'Failed!');
      }
    })
  }


}
