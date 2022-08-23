import { Component, OnInit } from '@angular/core';
import { PagesService } from 'src/app/services/pages.service';

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
    // to get names of team
    this._PagesService.getTeam().subscribe((response) => {
      this.team = response.data;
    });
  }
}
