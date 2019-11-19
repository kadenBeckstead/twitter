import { Injectable } from '@angular/core';
import { LambdaConnectorService } from './lambda-connector.service';
import { User, Attachment, Status } from 'Instagram';
import * as AWS from 'aws-sdk';
import * as dynamodb from 'aws-sdk/clients/dynamodb';
import { LocalSettingsService } from './local-settings.service';

@Injectable({
  providedIn: 'root'
})
export class RealDataService {
  db;

  users = [
    { id: 1, username: 'Jared Beckstead', handle: 'jbecks1', photoUrl: null },
    { id: 2, username: 'Lindsay Beckstead', handle: 'linlula', photoUrl: null },
    { id: 3, username: 'Ken Rodham', handle: 'krod', photoUrl: null },
    { id: 4, username: 'Katy Perry', handle: 'KPerry', photoUrl: null },
    { id: 5, username: 'Russel M. Nelson', handle: 'theProphet', photoUrl: null },
    { id: 6, username: 'Peyton Manning', handle: 'pMan18', photoUrl: null },
    { id: 7, username: 'Zack Alger', handle: 'zag', photoUrl: null },
    { id: 8, username: 'Alfred Pennyweather', handle: 'the_butler007', photoUrl: null },
    { id: 9, username: 'Bruce Wayne', handle: 'batman', photoUrl: null },
    { id: 10, username: 'Selina Kyle', handle: 'cat73628', photoUrl: null },
    { id: 11, username: 'Oswald Cobblepot', handle: 'the_penguin', photoUrl: null },
    { id: 12, username: 'Oliver Queen', handle: 'archery4lyfe', photoUrl: null },
    { id: 13, username: 'Joe Flacco', handle: 'avg_qb', photoUrl: null },
    { id: 14, username: 'Diana Prince', handle: 'wonderwoman', photoUrl: null },
    { id: 15, username: 'Steve Trevor', handle: 'I_steal_planes', photoUrl: null },
    { id: 16, username: 'Barry Allen', handle: 'lightningSpeed', photoUrl: null },
    { id: 17, username: 'an0nymous', handle: 'an0nymous', photoUrl: null },
    { id: 18, username: 'thanos', handle: 'snap_master', photoUrl: null },
  ]

  flags: any[];
  constructor(
    private lambda: LambdaConnectorService,
    private settings: LocalSettingsService
  ) {
    this.db = new dynamodb(
      {
        accessKeyId: 'AKIAITK3XUD5XWREYGOQ',
        secretAccessKey: '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',
        region: 'us-east-1'
      }
    );
  }

  getUserPosts(userId: number, lastKey: number = 0, pageSize: number = 5) {
    return this.lambda.getUserPosts(userId, lastKey, pageSize)
  }

  getBaseUser() {
    return this.getSingleUser(this.settings.userId)
  }

  getNewsFeed(followers: any[], lastKey: number = 0, pageSize: number = 5) {
    return this.lambda.getNewsFeed(followers, lastKey, pageSize)
  }

  makeFollower(followerId: string, followeeId: string) {
    return this.lambda.makeFollower(followerId, followeeId);
  }

  unfollow(followerId: string, followeeId: string) {
    return this.lambda.unfollow(followerId, followeeId);
  }

  filterUsers(query: string) {
    return this.lambda.filterUsers(query)
  }

  getSingleUser(id: string) {
    let arr = [];
    arr.push(id);
    return this.lambda.getListOfUsers(arr)
  }

  getSingleUserByHandle(handle: string) {
    return this.lambda.getListOfUsers(null, handle);
  }

  getStatusesByHashtag(hashtag: string, lastKey: number = 0, pageSize: number = 5) {
    return this.lambda.getStatusesByHashtag(hashtag, lastKey, pageSize);
  }

  isAFollower(followerId: number, followeeId: number) {
    return this.lambda.isAFollower({ followeeId: followeeId, followerId: followerId })
  }

  getListOfUsersByHandle(handle: string) {
    return this.lambda.getListOfUsers(null, handle)
  }

  getListOfUsers(arr: any[], lastKey: number = 0, pageSize: number = 4) {
    return this.lambda.getListOfUsers(arr, null, lastKey, pageSize)
  }

  postStatus(userId: string, title: string = null, attachment: Attachment = null, body: string = null) {
    return this.lambda.postStatus(userId, title, attachment, body);
  }

  upsertItem(tablename: string, item: Object) {
    let uploadable = AWS.DynamoDB.Converter.marshall(item)

    let params = {
      TableName: tablename,
      Item: uploadable
    };

    this.db.putItem(params, (e, data) => {
      if (e) {
        console.log('ERROR: ', e);
      } else {
        console.log(AWS.DynamoDB.Converter.unmarshall(data.Item))
      }
    })
  }
}
