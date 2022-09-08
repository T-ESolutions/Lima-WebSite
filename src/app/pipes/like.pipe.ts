import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'like'
})
export class LikePipe implements PipeTransform {

  constructor(private sanitizer:DomSanitizer){}

  transform(likes: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(likes)
  }
}
