import { Component, OnInit, Input } from '@angular/core';
import { FeatureFlagsService, LocalSettingsService } from 'src/app/shared/services';

@Component({
  selector: 'News-Feed',
  templateUrl: './news-feed.component.html',
  styleUrls: ['./news-feed.component.less']
})
export class NewsFeedComponent implements OnInit {
  @Input() params;

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

  takePicture() {
    this.settings.changeRoute({
      title: 'add_outline',
      route: 'app/add',
      params: {}
    })
  }

}
