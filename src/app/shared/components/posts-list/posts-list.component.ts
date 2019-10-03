import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.less']
})
export class PostsListComponent implements OnInit {
@Input() posts;

  constructor() { }

  ngOnInit() {}

}
