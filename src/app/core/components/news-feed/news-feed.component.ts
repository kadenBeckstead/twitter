import { Component, OnInit, Input } from '@angular/core';

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

  ngOnInit() {
    console.log(this.params)
  }

  testFunction() {
    console.log('hello world')
  }

}
