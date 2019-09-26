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
  selectedIcon = 'home_outline';

  menuIcons = [ 
    {title: 'home_outline', active: 'home', route: 'feed'},
    {title: 'search', active: 'search', route: 'search'},
    {title: 'add_outline', active: 'add', route: 'add'},
    {title: 'favorite_outline', active: 'favorite', route: 'notifications'},
    {title: 'user_outline', active: 'user', route: 'profile'},
  ];

  constructor(
    private router: Router,
    public ffs: FeatureFlagsService,
  ) { }

  ngOnInit() {}



  changeRoute(icon) {
    this.selectedIcon = icon.title;
    this.selectedRoute = icon.route;
    this.router.navigate([icon.route])
  }

}
