import { Injectable } from '@angular/core';
import { LambdaConnectorService } from './lambda-connector.service';

@Injectable({
  providedIn: 'root'
})
export class RealDataService {

  flags: any[];
  constructor(
    private lambda: LambdaConnectorService
  ) {}

  getUserPosts(id: number, lastKey: number = 0, pageSize: number = 5) {
    return this.lambda.getUserPosts(id, lastKey, pageSize)
  }

  getBaseUser() {
    return this.getSingleUser(0);
  }

  getNewsFeed(followers: any[], lastKey: number = 0, pageSize: number = 5) {
    return this.lambda.getNewsFeed(followers, lastKey, pageSize)
  }

  filterUsers(query: string) {
    return this.lambda.filterUsers(query)
  }

  getSingleUser(id: number) {
    return this.lambda.getListOfUsers([id])
  }

  getSingleUserByHandle(handle: string) {
    return this.lambda.getListOfUsers(null, handle);
  }

  getStatusesByHashtag(hashtag: string, lastKey: number = 0, pageSize: number = 5) {
    return this.lambda.getStatusesByHashtag(hashtag, lastKey, pageSize);
  }

  isAFollower(followerId: number, followeeId: number) {
    return this.lambda.isAFollower({followeeId: followeeId, followerId: followerId})
  }

  getListOfUsersByHandle(handle: string) {
    return this.lambda.getListOfUsers(null, handle)
  }

  getListOfUsers(arr: any[], lastKey: number = 0, pageSize: number = 4) {
    return this.lambda.getListOfUsers(arr, null, lastKey, pageSize)
  }

  postStatus(userId: string, title: string = null, attachmentUrl: string = null, body: string = null) {
    return this.lambda.postStatus(userId, title, attachmentUrl, body);
  }

}
