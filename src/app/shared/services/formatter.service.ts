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

  formatString(string, length) {
    return [string.length > length ? string.substring(0, length) + "..." : string, string] // [formatted string, original string]
  }

  
}
