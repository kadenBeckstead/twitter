import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'post-viewer',
  templateUrl: './post-viewer.component.html',
  styleUrls: ['./post-viewer.component.less']
})
export class PostViewerComponent implements OnInit {
  post;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.post = this.route.snapshot.queryParams;
  }

}
