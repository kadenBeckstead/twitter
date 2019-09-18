import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from 'src/app/shared/services';

@Component({
  selector: 'app-add-story',
  templateUrl: './add-story.component.html',
  styleUrls: ['./add-story.component.less']
})
export class AddStoryComponent implements OnInit {
  params;

  constructor(
    private featureFlags: FeatureFlagsService
  ) { }

  ngOnInit() {
    this.params = this.featureFlags['add'] || [];
  }

}
