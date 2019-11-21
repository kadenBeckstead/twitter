import { Injectable } from '@angular/core';
import { observable } from 'mobx-angular'
import { Router } from '@angular/router';
import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { BehaviorSubject } from 'rxjs';
import { DynamoDB } from 'aws-sdk';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LocalSettingsService {

  @observable showNavBar: boolean = true;
  @observable selectedIcon: string = 'home_outline';
  @observable selectedRoute: string = 'feed';
  userId: string = null;
  appLoaded: BehaviorSubject<boolean> = new BehaviorSubject(false);
  uploadLocation: BehaviorSubject<string|null> = new BehaviorSubject(null)


  constructor(
    private router: Router,
  ) { }

  toggleNavBar() {
    this.showNavBar = !this.showNavBar;
  }

  setUserId(id: string) {
    this.userId = id;
    this.appLoaded.next(true);
    this.router.navigate(['app/feed'])
  }

  setNavBar(setting: boolean) {
    this.showNavBar = setting;
  }

  changeRoute(params) {
    this.selectedIcon = params.title;
    this.selectedRoute = params.route;
    this.router.navigate([params.route], { queryParams: { ...params.params } })
  }

  signOut() {
    // TODO: Make Sign out actually work
    this.router.navigate(['login'])
  }

  updateProfilePic(handle: string, file: any) {
    const contentType = file.type;
    
    const bucket = new S3(environment.awsParams);
    const params = {
      Bucket: 'instagram-user-profile-pictures',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    bucket.upload(params, async (err, data) => {
      if (err) {
        console.log('There was an error uploading your file: ', err);
        return false;
      }
      this.uploadLocation.next(data.Location);
      let params = {
        TableName: 'user',
        Key:{
            "handle": {S: handle},
        },
        UpdateExpression: "set photoUrl = :r",
        ExpressionAttributeValues: {
            ":r": {S: data.Location},
        },
      }
  
      await new DynamoDB(environment.awsParams).updateItem(params).promise()
    });
    return this.uploadLocation;
  }
}
