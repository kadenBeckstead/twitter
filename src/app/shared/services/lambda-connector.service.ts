import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
export const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class LambdaConnectorService {

  constructor(private http: HttpClient) { }

  makeFollower(id) {
    return this.http.get(`https://cxy2vqsuvh.execute-api.us-east-1.amazonaws.com/dev/users/follow/${id}`);
  }
  
  getNewsFeed(followers: any[], lastKey: number = 0, pageSize: number = 5) {
    let opts = {followers, lastKey, pageSize};
    return this.http.post(`https://cxy2vqsuvh.execute-api.us-east-1.amazonaws.com/dev/feed`, opts);
  }

  getListOfUsers(ids: number[] = null, handle: string = null, lastKey: number = 0, pageSize: number = 5) {
    let opts = { userids: ids, handle, lastKey, pageSize }
    return this.http.post(`https://cxy2vqsuvh.execute-api.us-east-1.amazonaws.com/dev/users`, opts);
  }

  getUserPosts(id: number, lastKey: number = 0, pageSize: number = 5) {
    let opts = {id, lastKey, pageSize};
    return this.http.post(`https://cxy2vqsuvh.execute-api.us-east-1.amazonaws.com/dev/users/posts`, opts);
  }

  filterUsers(query) {
    return this.http.get(`https://cxy2vqsuvh.execute-api.us-east-1.amazonaws.com/dev/users/search/${query}`);
  }

  isAFollower(followerQuery) {
    // followerQuery: { followeeId: 1, followerId: 2 }
    return this.http.post(`https://cxy2vqsuvh.execute-api.us-east-1.amazonaws.com/dev/users/follower`, followerQuery);
  }

  getStatusesByHashtag(hashtag: string, lastKey: number = 0, pageSize: number = 5) {
    let opts = {hashtag, lastKey, pageSize}
    return this.http.post(`https://cxy2vqsuvh.execute-api.us-east-1.amazonaws.com/dev/status/hashtag`, opts);
  }

  postStatus(userId: string, title: string = null, attachmentUrl: string = null, body: string = null) {
    let opts = {userId, title, attachmentUrl, body, timestamp: new Date()}
    return this.http.post(`https://cxy2vqsuvh.execute-api.us-east-1.amazonaws.com/dev/attachment`, opts);
  }
}
