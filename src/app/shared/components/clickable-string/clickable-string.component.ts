import { Component, OnInit, Input } from '@angular/core';
import { FeatureFlagsService, LocalSettingsService } from '../../services';

@Component({
  selector: 'clickable-string',
  templateUrl: './clickable-string.component.html',
  styleUrls: ['./clickable-string.component.less']
})
export class ClickableStringComponent implements OnInit {
  @Input() string: string;
  formattedString = [];
  ff;

  constructor(
    private ffs: FeatureFlagsService,
    private settings: LocalSettingsService
  ) { 
    this.ff = ffs.ff.profile;
  }

  ngOnInit() {
    this.string.split(' ').forEach((w) => {
      let newString = '';
      if (w.startsWith('#')) {
        this.formattedString.push({
          word: w,
          clickable: true,
          clickFn: (word) => {this.hashtag(word)}
        });
      } else if (w.startsWith('@')) {
        this.formattedString.push({
          word: w,
          clickable: true,
          clickFn: (word) => {this.mention(word)}
        });
      } else {
        this.formattedString.push({
          word: w,
          clickable: false,
          clickFn: null
        })
      }
    })
  }

  hashtag(word: string) {
    let hashtag = word.slice(1,word.length);
    this.settings.changeRoute({
      title: null,
      route: 'app/hashtag-match',
      params: { hash: hashtag }
    })
  }

  async mention(word: string) {
    let handle = word.slice(1,word.length);
    this.ff.service.getSingleUserByHandle(handle).subscribe((results) => {
      let mentionedUser = results[0]
      this.settings.changeRoute({
        title: 'user_outline',
        route: 'app/profile',
        params: { id: mentionedUser.id, back: true }
      })
    })
  }

}
