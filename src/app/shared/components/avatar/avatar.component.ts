import { Component, OnInit, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.less']
})
export class AvatarComponent implements OnInit {
  @Input() size = "medium";
  @Input() photoUrl = null;

  defaultUrl = '../../../../assets/icons/user.svg';

  constructor(
    public sanitizer: DomSanitizer,
  ) { }

  ngOnInit() {
  }

}
