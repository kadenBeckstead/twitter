import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.less']
})
export class FollowListComponent implements OnInit {

  tabIsFollowing: boolean = false;
  ff;
  userId;
  currentProfile;
  followers;
  following;

  constructor(
    public ffs: FeatureFlagsService,
    private route: ActivatedRoute,
  ) { 
    this.ff = this.ffs.ff;
  }

  ngOnInit() {
    this.route.snapshot.queryParams.tab === 'following' && (this.tabIsFollowing = true);
    this.userId = this.route.snapshot.queryParams.id;
    this.currentProfile = this.ff.profile.service.getSingleUser(this.userId)
    this.followers = this.ff.profile.service.getListOfUsers(this.currentProfile.followers);
    this.following = this.ff.profile.service.getListOfUsers(this.currentProfile.following);
  }

}
