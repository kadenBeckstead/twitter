import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {

  constructor() { }

  kadenPosts = [
    { id: 0, userId: 0, timestamp: 1, title: 'init', body: 'my initial post here', attachmentUrl: null },
    { id: 1, userId: 0, timestamp: 2, title: 'class', body: 'man, 452 is pretty boring today', attachmentUrl: null },
    { id: 2, userId: 0, timestamp: 4, title: 'Tired today', body: 'Man! I\'m super #tired today. I should have gone to #bed earlier last night! On the bright side, @linlula and I went to see Bastille!', attachmentUrl: '../../../assets/dummy/kaden1.jpeg' },
    { id: 3, userId: 0, timestamp: 11, title: 'Busy', body: 'Working on my new project--StockMotion', attachmentUrl: null },
    { id: 14, userId: 0, timestamp: 14, title: 'Busy', body: 'another #random post', attachmentUrl: '../../../assets/dummy/kaden1.jpeg' },
  ]

  jaredPosts = [
    { id: 4, userId: 1, timestamp: 3, title: 'Home', body: 'Who\'s tryna hang tonight?', attachmentUrl: null },
    { id: 5, userId: 1, timestamp: 7, title: 'Cool new app!', body: 'this is my first post!', attachmentUrl: null },
    { id: 6, userId: 1, timestamp: 8, title: 'Work', body: 'Headed to work now, nobody message me! #tired', attachmentUrl: '../../../assets/dummy/jared1.jpeg' },
    { id: 7, userId: 1, timestamp: 14, title: 'abdfasdf', body: 'aghawrgfhqfjha;ifjvdivuslfqnalsvuhsad', attachmentUrl: null },
  ]

  LindsayPosts = [
    { id: 8, userId: 2, timestamp: 6, title: 'Good Job!', body: 'This app is great! I\'m excited to use it!', attachmentUrl: '../../../assets/dummy/lindsay1.gif' },
    { id: 9, userId: 2, timestamp: 12, title: 'UX', body: 'Working on a new prototype for StockMotion!', attachmentUrl: null },
  ]

  PeytonPosts = [
    { id: 10, userId: 6, timestamp: 5, title: 'First Post', body: 'Nationwide is on your side', attachmentUrl: '../../../assets/dummy/peyton2.jpg' },
    { id: 11, userId: 6, timestamp: 9, title: 'Kids', body: 'Throwback to when I threw footballs at those kids... awkward!', attachmentUrl: null },
    { id: 12, userId: 6, timestamp: 10, title: 'Ready for the game!', body: 'Hope Flacco and the Broncos can pull off their first win tonight!', attachmentUrl: null },
    { id: 13, userId: 6, timestamp: 13, title: 'Trash', body: 'Man, my old team isn\'t looking too good this season!', attachmentUrl: '../../../assets/dummy/peyton1.jpeg' },
  ]

  base_user = {
    id: 0, username: 'Kaden Beckstead', handle: 'kaden_beckstead', photoUrl: null, followers: [1, 2, 3, 4], following: [1, 2, 5, 6, 7], posts: this.kadenPosts,
  }

  users = {
    0: { ...this.base_user },
    1: { id: 1, username: 'Jared Beckstead', handle: 'jbecks1', photoUrl: null, followers: [0, 3, 2], following: [0, 4, 5, 7], posts: this.jaredPosts },
    2: { id: 2, username: 'Lindsay Beckstead', handle: 'linlula', photoUrl: null, followers: [0, 1], following: [0, 1, 4, 5], posts: this.LindsayPosts },
    3: { id: 3, username: 'Ken Rodham', handle: 'krod', photoUrl: null, followers: [], following: [5, 7], posts: [] },
    4: { id: 4, username: 'Katy Perry', handle: 'KPerry', photoUrl: null, followers: [1, 2, 3, 4, 5, 6, 7], following: [], posts: [] },
    5: { id: 5, username: 'Russel M. Nelson', handle: 'theProphet', photoUrl: null, followers: [0, 1, 2, 3], following: [6], posts: [] },
    6: { id: 6, username: 'Peyton Manning', handle: 'pMan18', photoUrl: null, followers: [0, 1, 3], following: [7], posts: this.PeytonPosts },
    7: { id: 7, username: 'StockMotion', handle: 'stockMotion', photoUrl: null, followers: [0, 1, 3, 6], following: [0, 1, 2], posts: [] },
  }


  getUserPosts(userId: number) {
    return this.users[userId].posts;
  }

  getNewsFeed(userId: number) {
    let feed = [];
    this.users[userId].following.forEach((follower) => {
      feed.push(...this.users[follower].posts);
    })
    feed.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
    return feed;
  }

  filterUsers(query: string) {
    query = query.toLowerCase();
    let users = [];
    Object.values(this.users).forEach((user) => {
      let username = user.username.toLowerCase();
      let handle = user.handle.toLowerCase();
      if (username.includes(query) || query.includes(username) || handle.includes(query) || query.includes(handle)) {
        users.push(user);
      }
    });
    return users;
  }

  getSingleUser(id: number) {
    return this.users[id] || [];
  }

  getSingleUserByHandle(handle: string) {
    return Object.values(this.users).filter((u) => {
      if (u.handle === handle) {
        return u;
      }
    })[0] || null;
  }

  getAllStatuses() {
    let statuses = [];
    Object.values(this.users).forEach((user) => {
      statuses.push(...user.posts);
    })
    return statuses;
  }

  getHashTags(inputText) {
    var regex = /(?:^|\s)(?:#)([a-zA-Z\d]+)/gm;
    var matches = [];
    var match;

    while ((match = regex.exec(inputText))) {
      matches.push(match[1]);
    }
    matches.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1)
    return matches;
  }

  getStatusesByHashtag(hashtag: string) {
    let allStatuses = this.getAllStatuses();
    let relevantStatuses = [];

    allStatuses.forEach((status) => {
      let hashtags = this.getHashTags(status.body)
      if (hashtags.includes(hashtag)) {
        relevantStatuses.push(status)
      }
    })
    return relevantStatuses
  }

  getUserName(id: number) {
    return this.users[id].username || null;
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
