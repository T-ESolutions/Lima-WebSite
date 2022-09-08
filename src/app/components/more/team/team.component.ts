import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  team: any = [];
  constructor(private _PagesService: PagesService) {
    this.getTeamData();
  }

  ngOnInit(): void {}

  getTeamData() {
    this.showLoader();
    // to get names of team
    this._PagesService.getTeam().subscribe((response) => {
      this.team = response.data;
      this.hideLoader();
    });

  }

  // this function to show and hide loader
  showLoader(){
    $(".loader").css({"display":"flex","transition":"all 0.5s"})
    }
    hideLoader(){
      $(".loader").css({"display":"none","transition":"all 0.5s"})
    }
}
