import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from 'src/app/services/translation.service';
declare var $: any;

@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.component.html',
  styleUrls: ['./subscribe.component.scss'],
})
export class SubscribeComponent implements OnInit {
  currentLanguage: any = '';

  constructor(
    public translate: TranslateService,
    public _TranslationService: TranslationService
  ) {}

  ngOnInit(): void {}
}
