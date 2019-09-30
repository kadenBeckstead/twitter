import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureFlagsService } from '../../services';

@Component({
  selector: 'account-row',
  templateUrl: './account-row.component.html',
  styleUrls: ['./account-row.component.less']
})
export class AccountRowComponent implements OnInit {

  @Input() handle: string = 'undefined';
  @Input() id: number;
  @Input() name: string = 'undefined';
  @Input() following: boolean = false;
  @Input() showButtons: boolean = true;

  ff;

  constructor(
    private router: Router,
    private ffs: FeatureFlagsService
  ) { 
    this.ff = ffs.ff;
  }

  ngOnInit() {
  }

  openUserProfile() {
    this.router.navigate(['profile'], {queryParams: {...this.ff.profile.service.getSingleUser(this.id), back: true}})
  }

}
