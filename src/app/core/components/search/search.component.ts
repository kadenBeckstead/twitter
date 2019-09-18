import { Component, OnInit } from '@angular/core';
import { FeatureFlagsService } from 'src/app/shared/services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit {

  params;
  
  constructor(
    private featureFlags: FeatureFlagsService,
  ) { }

  ngOnInit() {
    this.params = this.featureFlags['search'] || [];
  }

}
