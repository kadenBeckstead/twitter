import { Injectable } from '@angular/core';
import { RealDataService } from './real-data.service';
import { DummyDataService } from './dummy-data.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  ff = {
    feed:          { data: false, display: true, name: 'feed' },
    search:        { data: false, display: true, name: 'search' },
    add:           { data: false, display: true, name: 'add' },
    notifications: { data: false, display: false, name: 'notifications' }, // TODO: Is this necessary
    profile:       { data: false, display: true, name: 'profile' },
  };

  constructor(
    private real: RealDataService,
    private dummy: DummyDataService,
  ) { 
    Object.values(this.ff).forEach((flag: any) => {
      if (flag.data) {
        flag.service = this.real;
      } else {
        flag.service = this.dummy;
      }
    })
  }

}
