import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeatureFlagsService } from 'src/app/shared/services';

@Component({
  selector: 'app-menu',
  templateUrl: './app-menu.component.html',
  styleUrls: ['./app-menu.component.less']
})
export class AppMenuComponent implements OnInit {

  selectedRoute = 'feed';

  menuIcons = [ 
    {title: 'home', route: 'feed'},
    {title: 'search', route: 'search'},
    {title: 'add', route: 'add'},
    {title: 'favorite', route: 'notifications'},
    {title: 'user', route: 'profile'},
  ];

  constructor(
    private router: Router,
    public featureFlags: FeatureFlagsService,
  ) { }

  ngOnInit() { }

  changeRoute(route) {
    this.selectedRoute = route;
    this.router.navigate([route])
  }

}
