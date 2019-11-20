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
  posts;
  following: boolean = null;
  showButton: boolean = false;

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
    this.route.queryParams.subscribe(async (a) => {
      this.ff.service.getSingleUser(a.id).subscribe((b) => {
        this.user = { ...b[0] }
        this.showButton = this.settings.userId !== this.user.id;
        if (this.showButton) {
          this.user.back = true;
          this.ff.service.isAFollower(this.settings.userId, this.user.id).subscribe((res) => {
            this.following = res.isAFollower;
          })
        }
      })
    })
  }

  toggleFollow() {
    if (this.following) {
      this.ff.service.unfollow(this.settings.userId, this.user.id).subscribe()
    } else {
      this.ff.service.makeFollower(this.settings.userId, this.user.id).subscribe()
    }
    this.following = !this.following;
  }

  showFollowers() {
    this.router.navigate(['app/follow'], { queryParams: { tab: 'followers', id: this.user.id } });
  }

  showFollowing() {
    this.router.navigate(['app/follow'], { queryParams: { tab: 'following', id: this.user.id } });
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
