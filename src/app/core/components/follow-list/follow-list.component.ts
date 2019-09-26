import { Component, OnInit } from '@angular/core';
import { DummyDataService, FeatureFlagsService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.less']
})
export class FollowListComponent implements OnInit {

  tabIsFollowing: boolean = false;
  ff;

  constructor(
    public ffs: FeatureFlagsService,
    private route: ActivatedRoute,
  ) { 
    this.ff = this.ffs.ff;
  }

  ngOnInit() {
    this.route.snapshot.queryParams.tab === 'following' && (this.tabIsFollowing = true);
  }

}
