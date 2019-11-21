import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LambdaConnectorService } from '../../services';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less']
})
export class PostsListComponent implements OnInit, AfterViewInit {
  @Input() posts = [];
  @Input() isNewsFeed = false
  @Input() isPosts = false
  @Input() hashtag = false
  @Input() id = null;
  @Input() pageSize = 4;
  @Input() lastKey = 0;
  @ViewChild('scrollablePostsList', { static: false }) scrollableEl: ElementRef;

  allPosts = [];
  theEnd = false;

  constructor(
    private lambda: LambdaConnectorService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.lastKey = null;

    this.route.queryParams.subscribe((queryParams) => {
      this.hashtag ? (this.id = queryParams.hash) : (this.id = queryParams.id)
      this.allPosts = [];

      this.fetch().subscribe((posts: any) => {
        if (!posts.LastEvaluatedKey) {
          this.theEnd = true;
        }
        if (posts.length > 0) {
          posts.forEach((item) => {
            this.allPosts.push(item);
          })
          this.lastKey = posts.LastEvaluatedKey
        } else if (posts) {
          posts.Items && (posts.Items.forEach((item) => {
            this.allPosts.push(item);
          }))
          this.lastKey = posts.LastEvaluatedKey
        }
      })
    });
  }

  ngAfterViewInit() {
    let source = fromEvent(this.scrollableEl.nativeElement, 'scroll');
    let ex = source.pipe(debounceTime(300))

    ex.subscribe(() => {
      if (this.scrollableEl.nativeElement.scrollHeight - this.scrollableEl.nativeElement.scrollTop === this.scrollableEl.nativeElement.clientHeight) {
        this.getBatch()
      }
    })
  }

  getBatch() {
    if (!this.theEnd) {
      this.fetch().subscribe((posts: any) => {
        if (!posts.LastEvaluatedKey) {
          this.theEnd = true;
        }
        posts.Items.forEach((item) => {
          this.allPosts.push(item);
        })
        this.lastKey = posts.LastEvaluatedKey;
      })
    }
  }

  fetch() {
    if (this.isNewsFeed) {
      return this.lambda.getNewsFeed(this.lastKey);
    }
    if (this.isPosts) {
      return this.lambda.getUserPosts(this.id, this.lastKey);
    }
    if (this.hashtag) {
      return this.lambda.getStatusesByHashtag(this.id, this.lastKey)
    }
  }

}
