import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FeatureFlagsService } from 'src/app/shared/services';
import { ActivatedRoute } from '@angular/router';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'follow-list',
  templateUrl: './follow-list.component.html',
  styleUrls: ['./follow-list.component.less']
})
export class FollowListComponent implements OnInit {
  @ViewChild('scrollableFollowers', { static: false }) scrollableFollowers: ElementRef;
  @ViewChild('scrollableFollowing', { static: false }) scrollableFollowing: ElementRef;

  tabIsFollowing: boolean = false;
  ff;
  userId;
  currentProfile;
  followers;
  following;
  lastKeyFollowers = 0;
  lastKeyFollowing = 0;
  theEndFollowers = false;
  theEndFollowing = false;
  subFollowers;
  subFollowing;

  pageSize = 10;

  relevantFollowers = [];
  relevantFollowing = [];


  constructor(
    public ffs: FeatureFlagsService,
    private route: ActivatedRoute,
  ) {
    this.ff = this.ffs.ff.profile;
  }

  ngOnInit() {
    this.route.snapshot.queryParams.tab === 'following' && (this.tabIsFollowing = true);
    this.userId = this.route.snapshot.queryParams.id;
    this.ff.service.getSingleUser(this.userId).subscribe((user) => {
      this.currentProfile = user[0];
      this.lastKeyFollowers = 0;
      this.lastKeyFollowing = 0;

      this.fetch().subscribe((users: any[]) => {
        users.forEach((user) => {
          if (!this.tabIsFollowing) {
            this.relevantFollowers.push(user);
          } else {
            this.relevantFollowing.push(user);
          }
        })
        if (!this.tabIsFollowing) {
          this.lastKeyFollowers += (users.length - 1);
        } else {
          this.lastKeyFollowing += (users.length - 1);
        }
        this.setListeners();
      })
    })
  }

  setListeners() {
    setTimeout(() => {
      if (!this.tabIsFollowing) {
        this.setFollowersListener()
      } else {
        this.setFollowingListener();
      } 
    }, 300)
  }

  setFollowersListener() {
    if (!this.tabIsFollowing && this.scrollableFollowers) {
      let observableFollowers = fromEvent(this.scrollableFollowers.nativeElement, 'scroll');
      this.subFollowers = observableFollowers.pipe(debounceTime(300))
      this.subFollowers.subscribe(() => {
        if (this.scrollableFollowers.nativeElement.scrollHeight - this.scrollableFollowers.nativeElement.scrollTop === this.scrollableFollowers.nativeElement.clientHeight) {
          this.getBatch()
        }
      })
    } 
  }

  setFollowingListener() {
    if (this.tabIsFollowing && this.scrollableFollowing){
      let observableFollowing = fromEvent(this.scrollableFollowing.nativeElement, 'scroll');
      this.subFollowing = observableFollowing.pipe(debounceTime(300))
      this.subFollowing.subscribe(() => {
        console.log('scroll')
        if (this.scrollableFollowers.nativeElement.scrollHeight - this.scrollableFollowers.nativeElement.scrollTop === this.scrollableFollowers.nativeElement.clientHeight) {
          this.getBatch()
        }
      })
    }
  }

  getBatch() {
    if (!this.tabIsFollowing) {
      if (!this.theEndFollowers) {
        this.fetch().subscribe((posts: any[]) => {
          this.lastKeyFollowers += posts.length;
          if (posts.length === 0) {
            this.theEndFollowers = true;
            console.log('THE END!')
          }
          posts.forEach((item) => {
            this.relevantFollowers.push(item);
          })
        })
      }
    } else {
      if (!this.theEndFollowing) {
        this.fetch().subscribe((posts: any[]) => {
          this.lastKeyFollowing += posts.length;
          if (posts.length === 0) {
            this.theEndFollowing = true;
            console.log('THE END!')
          }
          posts.forEach((item) => {
            this.relevantFollowing.push(item);
          })
        })
      }
    }
  }

  fetch(reverse: boolean = false) {
    if (!this.tabIsFollowing || reverse) {
      return this.ff.service.getListOfUsers(this.currentProfile.followers, this.lastKeyFollowers, this.pageSize);
    }
    if (this.tabIsFollowing || reverse) {
      return this.ff.service.getListOfUsers(this.currentProfile.following, this.lastKeyFollowing, this.pageSize);
    }
  }

  resetTabs(e) {
    let i = e.index
    i === 0 ? this.tabIsFollowing = false : this.tabIsFollowing = true
    this.lastKeyFollowers = 0;
    this.lastKeyFollowing = 0;
    this.relevantFollowers = [];
    this.relevantFollowing = [];

    this.fetch().subscribe((users: any[]) => {
      users.forEach((user) => {
        if (i === 0) {
          this.relevantFollowers.push(user);
        } else {
          this.relevantFollowing.push(user);
        }
      })
      if (i === 1) {
        this.lastKeyFollowers += (users.length - 1);
      } else {
        this.lastKeyFollowing += (users.length - 1);
      }
    })
  }

}
