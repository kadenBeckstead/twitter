import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from 'src/app/shared/services';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.less']
})
export class NotificationsComponent implements OnInit {

  params;

  constructor(
    private featureFlags: FeatureFlagsService,
  ) { }

  ngOnInit() {
    this.params = this.featureFlags['notifications'] || [];
  }

}
