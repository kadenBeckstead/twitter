import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { FeatureFlagsService, LocalSettingsService } from 'src/app/shared/services';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Plugins } from '@capacitor/core';
import { Observable } from 'rxjs';

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
  searchResults: Observable<any>;
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
    if ( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) && Keyboard ) {
      Keyboard.setAccessoryBarVisible({isVisible: false});
    }
  }

  ngAfterViewInit() {
    this.input.valueChanges.pipe(debounceTime(500), distinctUntilChanged()).subscribe((value) => {
      if (value) {
        this.ff.service.filterUsers(value).subscribe((results) => {
          this.searchResults = results.users
        })
      }
    })
  }

  hideKeyboard() {
    Keyboard && Keyboard.hide();
  }

  keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.hideKeyboard();
    }
  }

}
