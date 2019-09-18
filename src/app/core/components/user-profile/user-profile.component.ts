import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from 'src/app/shared/services';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {

  params;
  username = "Kaden Beckstead";
  numPosts = 10;
  numFollowers = 300;
  numFollowees = 143;
  
  constructor(
    private featureFlags: FeatureFlagsService,
  ) { }

  ngOnInit() {
    this.params = this.featureFlags['profile'] || [];
  }
}
