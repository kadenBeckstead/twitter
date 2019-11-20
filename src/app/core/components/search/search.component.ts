import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FeatureFlagsService } from 'src/app/shared/services';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', { static: false }) input;
  params;
  searchQuery: string = '';
  searchResults: Observable<any> | any[];
  ff;

  constructor(
    private featureFlags: FeatureFlagsService,
    private ffs: FeatureFlagsService
  ) {
    this.ff = ffs.ff.search;
  }

  ngOnInit() {
    this.params = this.featureFlags['search'] || [];
  }

  ngAfterViewInit() {
    this.input.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
      if (value) {
        this.ff.service.filterUsers(value).subscribe((results) => {
          this.searchResults = results
        })
      }
    })
  }

}
