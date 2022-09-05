import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { TranslationService } from './services/translation.service';
import disableDevtool from 'disable-devtool';
declare var $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'LimaZola';
  currentLanguage: any = '';
  constructor(
    private _Router: Router,
    public translate: TranslateService,
    private _TranslationService: TranslationService
  ) {
    this.currentLanguage = localStorage.getItem('currentLanguage') || 'ar';
    this.translate.use(this.currentLanguage);
    this._TranslationService.currentLang(this.currentLanguage);

    const body = document.getElementsByTagName('body');
    this._TranslationService.currentlang.subscribe((lang) => {
      if (lang == 'ar') {
        body[0].setAttribute('dir', 'rtl');
      } else {
        body[0].setAttribute('dir', 'ltr');
      }
    });

    // to disable inspect element and f12 button
    // disableDevtool();
  }
  ngOnInit(): void {
    $(".loading-screen").fadeOut(5000);
  }


}
