import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureFlagsService, LocalSettingsService } from 'src/app/shared/services';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.less']
})
export class AppMenuComponent implements OnInit {

  ff;

  menuIcons = [];

  constructor(
    private router: Router,
    public ffs: FeatureFlagsService,
    public settings: LocalSettingsService,
  ) {
    this.ff = this.ffs.ff;
  }

  ngOnInit() {
    this.ff.profile.service.getBaseUser().subscribe((user) => {
      let currentUser = user[0]
      this.menuIcons = [
        { title: 'home_outline', active: 'home', route: 'app/feed', featureFlag: 'feed' },
        { title: 'search', active: 'search', route: 'app/search', featureFlag: 'search' },
        { title: 'add_outline', active: 'add', route: 'app/add', featureFlag: 'add' },
        { title: 'favorite_outline', active: 'favorite', route: 'app/notifications', featureFlag: 'notifications' },
        { title: 'user_outline', active: 'user', route: 'app/profile', params: currentUser, featureFlag: 'profile' },
      ];
    })
  }

}
