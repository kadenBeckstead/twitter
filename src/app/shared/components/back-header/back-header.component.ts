import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'back-header',
  templateUrl: './back-header.component.html',
  styleUrls: ['./back-header.component.less']
})
export class BackHeaderComponent implements OnInit {
  @Input() title = 'test Title';

  constructor() { }

  ngOnInit() {
  }

  goBack() {
    window.history.back();
  }

}
