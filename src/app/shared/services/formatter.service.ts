import { Injectable } from '@angular/core';
import * as moment from 'moment';
import * as uuid from 'uuid';
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

  getRandomKey() {
    return uuid.v4();
  }

  isScrolledIntoView(el) {
    let rect = el.getBoundingClientRect();
    let elemTop = rect.top;
    let elemBottom = rect.bottom;

    // Only completely visible elements return true:
    let isVisible = (elemTop >= 0) && (elemBottom <= window.innerHeight);
    // Partially visible elements return true:
    //isVisible = elemTop < window.innerHeight && elemBottom >= 0;
    return isVisible;
}

  
}
