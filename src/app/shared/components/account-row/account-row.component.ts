import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'account-row',
  templateUrl: './account-row.component.html',
  styleUrls: ['./account-row.component.less']
})
export class AccountRowComponent implements OnInit {

  @Input() handle: string = 'undefined';
  @Input() name: string = 'undefined';
  @Input() following: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
