import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureFlagsService } from '../../services';

@Component({
  selector: 'account-row',
  templateUrl: './account-row.component.html',
  styleUrls: ['./account-row.component.less']
})
export class AccountRowComponent implements OnInit {

  @Input() handle: string = 'undefined';
  @Input() id: number;
  @Input() name: string = 'undefined';
  @Input() base_user_id: number = null;
  @Input() showButtons: boolean = true;

  ff;
  following = true;

  constructor(
    private router: Router,
    private ffs: FeatureFlagsService
  ) { 
    this.ff = ffs.ff.profile;
  }

  ngOnInit() {
    this.ff.service.isAFollower(this.base_user_id, this.id).subscribe((res) => {
      this.following = res.isFollower;
    })
  }

  async openUserProfile() {
    this.ff.profile.service.getSingleUser(this.id).subscribe((results) => {
      let user = results[0]
      this.router.navigate(['app/profile'], {queryParams: {...user, back: true}})
    })
  }

  toggleFollow() {
    this.following = !this.following; // TODO: implement with db
  }

}
