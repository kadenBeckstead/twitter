import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FeatureFlagsService {

  ff = {
    feed: { data: false, display: true },
    search: { data: false, display: true },
    add: { data: false, display: true },
    notifications: { data: false, display: true },
    profile: { data: false, display: true },
  };

  constructor() { }

}
