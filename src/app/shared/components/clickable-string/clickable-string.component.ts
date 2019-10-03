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
        let startIndex = this.string.match(w).index;
        let endIndex = startIndex + w.length;
        this.formattedString.push({
          word: w,
          clickable: true,
          clickFn: (word) => {this.hashtag(word)}
        });
      } else if (w.startsWith('@')) {
        let startIndex = this.string.match(w).index;
        let endIndex = startIndex + w.length;
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
    console.log(this.ff.service.getStatusesByHashtag(hashtag));
  }

  mention(word: string) {
    let handle = word.slice(1,word.length);
    let mentionedUser = this.ff.service.getSingleUserByHandle(handle);

    this.settings.changeRoute({
      title: 'user_outline',
      route: 'profile',
      params: {...mentionedUser, back: true}
    })

  }

}
