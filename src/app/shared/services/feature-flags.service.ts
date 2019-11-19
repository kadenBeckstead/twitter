import { Injectable } from '@angular/core';
import { RealDataService } from './real-data.service';
import { DummyDataService } from './dummy-data.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  ff = {
    feed:          { data: true, display: true, name: 'feed' },
    search:        { data: true, display: true, name: 'search' },
    add:           { data: true, display: true, name: 'add' },
    profile:       { data: true, display: true, name: 'profile' },
  };

  constructor (
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
