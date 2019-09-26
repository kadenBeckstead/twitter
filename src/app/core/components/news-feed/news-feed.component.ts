import { Component, OnInit, Input } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';

const { Camera } = Plugins;

@Component({
  selector: 'News-Feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.less']
})
export class NewsFeedComponent implements OnInit {
  @Input() params; // TODO: add types

  username: string;
  password: string;
  submitted: boolean = false;

  constructor() { }

  ngOnInit() { }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    let imageUrl = image.webPath;
  }

}
