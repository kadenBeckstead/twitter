import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FeatureFlagsService, LocalSettingsService } from 'src/app/shared/services';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';

const { Keyboard } = Plugins;


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.less']
})
export class SearchComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', { static: false }) input;
  params;
  searchQuery: string = '';
  searchResults: any[] = [];
  ff;

  constructor(
    private featureFlags: FeatureFlagsService,
    public settings: LocalSettingsService,
    private ffs: FeatureFlagsService
  ) {
    this.ff = ffs.ff.search;
  }

  ngOnInit() {
    this.params = this.featureFlags['search'] || [];
    if (Keyboard) {
      Keyboard.setAccessoryBarVisible({isVisible: false});
    }
  }

  ngAfterViewInit() {
    this.input.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
      this.searchQueryChange(value)
    })
  }

  searchQueryChange(value) {
    this.searchResults = [];
    if (value) {
      this.searchResults = this.ff.service.filterUsers(value);
    }
  }

  hideKeyboard() {
    Keyboard.hide();
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.hideKeyboard();
    }
  }

}
