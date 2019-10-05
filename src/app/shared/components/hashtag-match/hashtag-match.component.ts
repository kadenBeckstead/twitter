import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FeatureFlagsService } from '../../services';

@Component({
  selector: 'app-hashtag-match',
  templateUrl: './hashtag-match.component.html',
  styleUrls: ['./hashtag-match.component.less']
})
export class HashtagMatchComponent implements OnInit {
  hashtag;
  ff;


  constructor(
    private route: ActivatedRoute,
    private ffs: FeatureFlagsService,
  ) { 
    this.ff = ffs.ff.feed;
  }

  ngOnInit() {
    this.hashtag = this.route.snapshot.queryParams.hash
    console.log(this.hashtag)
  }

}
