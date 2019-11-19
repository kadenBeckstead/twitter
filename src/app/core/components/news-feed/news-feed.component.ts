import { Component, OnInit, Input } from '@angular/core';
import { Plugins, CameraResultType } from '@capacitor/core';
import { FeatureFlagsService, LambdaConnectorService, LocalSettingsService } from 'src/app/shared/services';

const { Camera } = Plugins;

@Component({
  selector: 'News-Feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.less']
})
export class NewsFeedComponent implements OnInit {
  @Input() params; // TODO: add types

  ff;
  posts;

  constructor(
    private ffs: FeatureFlagsService,
    private settings: LocalSettingsService,
  ) {
    this.ff = ffs.ff.feed;
   }

  ngOnInit() {
    this.settings.appLoaded.subscribe((loaded) => {
      if (loaded) {
        this.ff.service.getBaseUser().subscribe((res) => {
          res.length > 0 && (this.posts = res[0].following);
        })
      }
    });
  }

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri
    });
    let imageUrl = image.webPath;
  }

}
