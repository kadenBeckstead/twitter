import { Injectable } from '@angular/core';
import { computed, observable } from 'mobx-angular'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LocalSettingsService {

  @observable showNavBar: boolean = true;
  @observable selectedIcon: string = 'home_outline';
  @observable selectedRoute: string = 'feed';

  constructor(
    private router: Router,
  ) { }

  toggleNavBar() {
    this.showNavBar = !this.showNavBar;
  }

  setNavBar(setting: boolean) {
    this.showNavBar = setting;
  }

  changeRoute(params) {
    this.selectedIcon = params.title;
    this.selectedRoute = params.route;
    this.router.navigate([params.route], {queryParams: {...params.params}})
  }


}
