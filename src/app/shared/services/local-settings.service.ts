import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular'
import { Router } from '@angular/router';
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;


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

  signOut() {
    // TODO: Make Sign out actually work
    this.router.navigate(['login'])
  }

  async updateProfilePic() {

      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Uri
      });
      let imageUrl = image.webPath;
      // TODO: set profilePic = imageUrl;
  }
}
