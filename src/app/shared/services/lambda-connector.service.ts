import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Attachment } from 'Instagram';
import { LocalSettingsService } from './local-settings.service';
export const apiKey = environment.apiKey;

@Injectable({
  providedIn: 'root'
})
export class LambdaConnectorService {
  pageSizeLimit = 3;

  constructor(private http: HttpClient, private settings: LocalSettingsService) { }

  makeFollower(followerId: string, followeeId: string) {
    let opts = {followerId, followeeId}
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/follow`, opts);
  }

  unfollow(followerId: string, followeeId: string) {
    let opts = {followerId, followeeId, unfollow: true}
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/follow`, opts);
  }
  
  getNewsFeed(ExclusiveStartKey?: Object) {
    let opts = {userId: this.settings.userId, Limit: this.pageSizeLimit};
    ExclusiveStartKey && (opts['ExclusiveStartKey'] = ExclusiveStartKey)
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/feed`, opts);
  }

  getListOfUsers(ids: number[] = null, handle: string = null, lastKey: number = 0, pageSize: number = 5) { // DONE (needs pagination though)
    let opts = { userids: ids, handle, lastKey, pageSize }
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/users`, opts);
  }

  getUserPosts(userId: number, ExclusiveStartKey?: Object) {
    let opts = {userId, Limit: this.pageSizeLimit};
    ExclusiveStartKey && (opts['ExclusiveStartKey'] = ExclusiveStartKey)
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/getStatus`, opts);
  }

  filterUsers(query) {
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/filter`, {query});
  }

  isAFollower(followerQuery) {
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/follower`, followerQuery);
  }

  getStatusesByHashtag(hashtag: string, ExclusiveStartKey?: Object) {
    let opts = {hashtag, Limit: this.pageSizeLimit}
    ExclusiveStartKey && (opts['ExclusiveStartKey'] = ExclusiveStartKey)
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/getStatusesByHashtag`, opts);
  }

  postStatus(userId: string, title: string = null, attachment: Attachment = null, body: string = null) {
    let opts = {userId, title, attachment, body}
    return this.http.post(`https://6lvnrvg3i6.execute-api.us-west-1.amazonaws.com/dev/status`, opts);
  }
}
