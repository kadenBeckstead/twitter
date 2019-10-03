import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeatureFlagsService, LocalSettingsService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {

  user: any;
  ff;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private ffs: FeatureFlagsService,
    private settings: LocalSettingsService
  ) {
    this.ff = ffs.ff.profile;
  }

  ngOnInit() {
    // this.user = this.route.snapshot.queryParams;
    this.route.queryParams.subscribe((a) => {
      this.user = a;
    })
  }

  showFollowers() {
    this.router.navigate(['/follow'], {queryParams: {tab: 'followers', id: this.user.id}});
  }

  showFollowing() {
    this.router.navigate(['/follow'], {queryParams: {tab: 'following', id: this.user.id}});
  }

  goBack() {
    window.history.back();
  }

  goToFeed() {
    this.settings.changeRoute({
      title: 'home_outline',
      route: 'feed',
      params: {}
    })
  }
}
