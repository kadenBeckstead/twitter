import { Routes } from '@angular/router';
import { 
	NewsFeedComponent,
	SearchComponent,
	AddStoryComponent,
	NotificationsComponent,
	UserProfileComponent,
	AppMenuComponent,
	FollowListComponent,
	LoginComponent
} from './core';

import { PostViewerComponent, HashtagMatchComponent } from './shared';

export const routes: Routes = [

	{ path: 'app', component: AppMenuComponent, children: [
		{ path: 'feed', component: NewsFeedComponent },
		{ path: 'search', component: SearchComponent },
		{ path: 'add', component: AddStoryComponent },
		{ path: 'notifications', component: NotificationsComponent },
		{ path: 'profile', component: UserProfileComponent },
		{ path: 'follow', component: FollowListComponent },
		{ path: 'viewer', component: PostViewerComponent },
		{ path: 'hashtag-match', component: HashtagMatchComponent },
  ]},
  
  { path: 'login', component: LoginComponent },



	{ path: '**', redirectTo: 'login', pathMatch: 'full' } 
];

