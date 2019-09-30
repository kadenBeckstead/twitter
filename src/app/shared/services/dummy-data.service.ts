import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {

  constructor() { }

  base_user = {
    id: 0, username: 'Kaden Beckstead', handle: 'kaden_beckstead', followers: [1,2,3,4], following: [1,2,5,6,7], posts: [],
  }

  users = {
    0: {...this.base_user},
    1: {id: 1, username: 'Jared Beckstead', handle: 'jbecks1', followers: [0,3,2], following: [0,4,5,7], posts: []},
    2: {id: 2, username: 'Lindsay Beckstead', handle: 'linlula', followers: [0,1], following: [0,1,4,5], posts: []},
    3: {id: 3, username: 'Ken Rodham', handle: 'krod', followers: [], following: [5,7], posts: []},
    4: {id: 4, username: 'Katy Perry', handle: 'KPerry', followers: [1,2,3,4,5,6,7], following: [], posts: []},
    5: {id: 5, username: 'Russel M. Nelson', handle: 'theProphet', followers: [0,1,2,3], following: [6], posts: []},
    6: {id: 6, username: 'Peyton Manning', handle: 'pMan18', followers: [0,1,3], following: [7], posts: []},
    7: {id: 7, username: 'StockMotion', handle: 'stockMotion', followers: [0,1,3,6], following: [0,1,2], posts: []},
  }

  filterUsers(query: string) {
    query = query.toLowerCase();
    let users = [];
    Object.values(this.users).forEach((user) => {
      let username = user.username.toLowerCase();
      let handle = user.handle.toLowerCase();
      if(username.includes(query) || query.includes(username) || handle.includes(query) || query.includes(handle)) {
        users.push(user);
      }
    });
    return users;
  }

  getSingleUser(id: number) {
    return this.users[id] || [];
  }

  isAFollower(possibleFollowerId: number, person: number) {
    return this.users[person].following.includes(possibleFollowerId)
  }

  isFollowing(person: number, isFollowingId: number) {
    return this.users[person].following.includes(isFollowingId)
  }

  getListOfUsers(arr: any[]) {
    let rtnArr = [];
    arr.forEach((id) => {
      rtnArr.push(this.users[id]);
    })
    return rtnArr;
  }


}
