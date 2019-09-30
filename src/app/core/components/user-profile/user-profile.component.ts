import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.less']
})
export class UserProfileComponent implements OnInit {

  user: any;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.user = this.route.snapshot.queryParams;
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
}
