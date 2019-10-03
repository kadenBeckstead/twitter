import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { FeatureFlagsService } from './feature-flags.service';
@Injectable({
  providedIn: 'root'
})
export class FormatterService {
  ff;

  constructor(
    private ffs: FeatureFlagsService
  ) {
    this.ff = ffs.ff;
   }


  formatDate(date) {
    if (moment(date).diff(Date.now(), "days") < 15)
      return moment(date).fromNow();
    else return moment(date).format("d MMMM YYYY");
  };

  formatFromTimestamp(timestamp) {
    return new Date(timestamp * 1000);
  }

  formatPostBody(str: string, id: string) {
    str.split(' ').forEach((w) => {
      let newString = '';
      if (w.startsWith('#')) {
        let startIndex = str.match(w).index;
        let endIndex = startIndex + w.length; //[routerLink]="['/profile']" [queryParams]="{...this.ff.profile.service.getSingleUser(id), 'back': true}}"
        newString = str.substr(0, startIndex) + `<a (click)="testFunction()"><b>`+ str.substr(startIndex, w.length) + '</b></a>' + str.substr(endIndex, str.length)
        str = newString;
      }
      if (w.startsWith('@')) {
        let startIndex = str.match(w).index;
        let endIndex = startIndex + w.length;
        newString = str.substr(0, startIndex) + '<b>'+ str.substr(startIndex, w.length) + '</b>' + str.substr(endIndex, str.length)
        str = newString;
      }
    })
    return str;
  }

  formatString(string, length) {
    return [string.length > length ? string.substring(0, length) + "..." : string, string] // [formatted string, original string]
  }

  
}
