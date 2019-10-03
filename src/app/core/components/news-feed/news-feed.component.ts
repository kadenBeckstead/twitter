import { Component, OnInit, Input } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { FeatureFlagsService } from 'src/app/shared/services';

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
  ff;

  constructor(
    private ffs: FeatureFlagsService
  ) {
    this.ff = ffs.ff.feed;
   }

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
