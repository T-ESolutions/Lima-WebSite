import { Component, OnInit } from '@angular/core';
import { HomesService } from 'src/app/services/homes.service';
import { PagesService } from 'src/app/services/pages.service';
declare var $: any;
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
})
export class TeamComponent implements OnInit {
  team: any = [];
  constructor(private _PagesService: PagesService,private _HomesService:HomesService) {
    this.getTeamData();
  }

  ngOnInit(): void {}

  getTeamData() {
    this._HomesService.showLoader();
    // to get names of team
    this._PagesService.getTeam().subscribe((response) => {
      this.team = response.data;
      this._HomesService.hideLoader();
    });

  }
}
