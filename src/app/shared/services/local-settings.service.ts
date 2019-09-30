import { Injectable } from '@angular/core';
import { computed, observable } from 'mobx-angular'

@Injectable({
  providedIn: 'root'
})
export class LocalSettingsService {

  @observable showNavBar: boolean = true;

  constructor() { }

  toggleNavBar() {
    this.showNavBar = !this.showNavBar;
  }

  setNavBar(setting: boolean) {
    this.showNavBar = setting;
  }


}
