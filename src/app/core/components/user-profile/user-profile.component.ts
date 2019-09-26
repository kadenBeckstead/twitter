import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService, DummyDataService } from 'src/app/shared/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {

  params;
  ff;
  
  constructor(
    private ffs: FeatureFlagsService,
    private router: Router,
  ) { 
    this.ff = this.ffs.ff;
  }

  ngOnInit() {
    this.params = this.ffs['profile'] || [];
  }

  showFollowers() {
    this.router.navigate(['/follow'], {queryParams: {tab: 'followers'}});
  }

  showFollowing() {
    this.router.navigate(['/follow'], {queryParams: {tab: 'following'}});
  }
}
