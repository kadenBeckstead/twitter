import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureFlagsService, LocalSettingsService } from '../../services';

@Component({
  selector: 'account-row',
  templateUrl: './account-row.component.html',
  styleUrls: ['./account-row.component.less']
})
export class AccountRowComponent implements OnInit {

  @Input() handle: string = 'undefined';
  @Input() id: String;
  @Input() name: string = 'undefined';
  @Input() base_user_id: number = null;
  @Input() showButtons: boolean = true;

  ff;
  following = null;

  constructor(
    public settings: LocalSettingsService,
    private router: Router,
    private ffs: FeatureFlagsService
  ) {
    this.ff = ffs.ff.profile;
  }

  ngOnInit() {
    if (this.showButtons) {
      this.ff.service.isAFollower(this.settings.userId, this.id).subscribe((res) => {
        this.following = res.isAFollower;
      })
    }
  }

  async openUserProfile() {
    this.ff.service.getSingleUser(this.id).subscribe((results) => {
      let user = results[0]
      this.router.navigate(['app/profile'], { queryParams: { id: user.id, back: true } })
    })
  }

  toggleFollow() {
    if (this.following) {
      this.ff.service.unfollow(this.settings.userId, this.id).subscribe()
    } else {
      this.ff.service.makeFollower(this.settings.userId, this.id).subscribe()
    }
    this.following = !this.following;
  }

}
