import { Component, OnInit, Input, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { LambdaConnectorService } from '../../services';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

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
  @ViewChild('scrollablePostsList', {static: false}) scrollableEl:ElementRef;
  
  allPosts = [];
  theEnd = false;

  constructor(
    private lambda: LambdaConnectorService
  ) { }

  ngOnInit() {
    this.lastKey = 0;
    this.fetch().subscribe((posts: any[]) => {
      posts.forEach((item) => {
        this.allPosts.push(item);
      })
      this.lastKey += (posts.length - 1);
    })
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
      this.fetch().subscribe((posts: any[]) => {
        this.lastKey += posts.length;
        if (posts.length === 0) {
          this.theEnd = true;
          console.log('THE END!')
        }
        posts.forEach((item) => {
          this.allPosts.push(item);
        })
      })
    }
  }

  fetch() {
    if (this.isNewsFeed) {
      return this.lambda.getNewsFeed(this.posts, this.lastKey, this.pageSize);
    }
    if (this.isPosts) {
      return this.lambda.getUserPosts(this.id, this.lastKey, this.pageSize);
    }
    if (this.hashtag) {
      return this.lambda.getStatusesByHashtag(this.id, this.lastKey, this.pageSize)
    }
  }


}
