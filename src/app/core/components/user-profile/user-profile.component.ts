import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FeatureFlagsService, LocalSettingsService } from 'src/app/shared/services';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../../../shared/components'

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
    private settings: LocalSettingsService,
    private _bottomSheet: MatBottomSheet
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
    this.router.navigate(['app/follow'], {queryParams: {tab: 'followers', id: this.user.id}});
  }

  showFollowing() {
    this.router.navigate(['app/follow'], {queryParams: {tab: 'following', id: this.user.id}});
  }

  goBack() {
    window.history.back();
  }

  goToFeed() {
    this.settings.changeRoute({
      title: 'home_outline',
      route: 'app/feed',
      params: {}
    })
  }

  openSettingsSheet() {
    this._bottomSheet.open(BottomSheetComponent, {
      closeOnNavigation: true,
      hasBackdrop: true
    })
  }
}
