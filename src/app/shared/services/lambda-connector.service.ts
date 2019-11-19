import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Attachment } from 'Instagram';
export const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class LambdaConnectorService {

  constructor(private http: HttpClient) { }

  makeFollower(followerId: string, followeeId: string) { // DONE
    let opts = {followerId, followeeId}
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/follow`, opts);
  }

  unfollow(followerId: string, followeeId: string) { // DONE
    let opts = {followerId, followeeId, unfollow: true}
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/follow`, opts);
  }
  
  getNewsFeed(followers: any[], lastKey: number = 0, pageSize: number = 5) {
    let opts = {followers, lastKey, pageSize};
    return this.http.post(`https://cxy2vqsuvh.execute-api.us-east-1.amazonaws.com/dev/feed`, opts);
  }

  getListOfUsers(ids: number[] = null, handle: string = null, lastKey: number = 0, pageSize: number = 5) { // DONE (needs pagination though)
    let opts = { userids: ids, handle, lastKey, pageSize }
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/users`, opts);
  }

  getUserPosts(userId: number, lastKey: number = 0, pageSize: number = 5) { // DONE (needs pagination though)
    let opts = {userId, lastKey, pageSize};
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/getStatus`, opts);
  }

  filterUsers(query) { // DONE
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/filter`, {query});
  }

  isAFollower(followerQuery) { // DONE
    // followerQuery: { followeeId: 1, followerId: 2 }
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/follower`, followerQuery);
  }

  getStatusesByHashtag(hashtag: string, lastKey: number = 0, pageSize: number = 5) { //DONE (needs pagination though)
    let opts = {hashtag, lastKey, pageSize}
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/getStatusesByHashtag`, opts);
  }

  postStatus(userId: string, title: string = null, attachment: Attachment = null, body: string = null) { // DONE
    let opts = {userId, title, attachment, body}
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/status`, opts);
  }
}
