import { Routes } from '@angular/router';
import { 
	NewsFeedComponent,
	SearchComponent,
	AddStoryComponent,
	NotificationsComponent,
	UserProfileComponent,
	AppMenuComponent
} from './core';

export const routes: Routes = [

	{ path: '', component: AppMenuComponent, children: [
		{ path: 'news', component: NewsFeedComponent },
		{ path: 'search', component: SearchComponent },
		{ path: 'add', component: AddStoryComponent },
		{ path: 'notifications', component: NotificationsComponent },
		{ path: 'profile', component: UserProfileComponent },
  ]},
  
  // { path: 'login', component: LoginComponent },



	{ path: '**', redirectTo: '/', pathMatch: 'full' } 
];

