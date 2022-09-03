import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HomesService } from 'src/app/services/homes.service';

@Component({
  selector: 'app-moms',
  templateUrl: './moms.component.html',
  styleUrls: ['./moms.component.scss']
})
export class MomsComponent implements OnInit {
  momsCategories:any=[];
  constructor(private _HomesService:HomesService, private toastr: ToastrService, private _Router: Router) {
    this.getMoms();
   }

  ngOnInit(): void {

  }


  getMoms(){
    this._HomesService.getMomsCategories().subscribe((response) => {
      if(response.status == 200){
        this.momsCategories = response.data.categories;
      }else{
        this.toastr.error(response.msg, 'Failed!');
      }
    })
  }


}
