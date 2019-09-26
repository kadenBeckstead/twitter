import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {

  constructor() { }

  followers = [
    { id: 1, username: 'Jared Beckstead', handle: 'jbecks1', follower: true, following: true },
    { id: 2, username: 'Lindsay Beckstead', handle: 'linlula', follower: true, following: false },
    { id: 3, username: 'Ken Rodham', handle: 'krod', follower: true, following: false },
    { id: 4, username: 'Katy Perry', handle: 'KPerry', follower: true, following: false },
  ]

  following = [
    { id: 1, username: 'Jared Beckstead', handle: 'jbecks1', follower: true, following: true },
    { id: 5, username: 'Russel M. Nelson', handle: 'theProphet', follower: false, following: true },
    { id: 6, username: 'Peyton Manning', handle: 'pMan18', follower: false, following: true },
    { id: 7, username: 'StockMotion', handle: 'stockMotion', follower: false, following: true },
  ]

  numFollowers: number = this.followers.length;
  numFollowing: number = this.following.length;
  numPosts: number = 13;

  username: string = 'Kaden Beckstead'
  handle: string = 'Kaden_Beckstead1'
}
