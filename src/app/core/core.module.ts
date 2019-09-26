import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared';

import {
	NewsFeedComponent,
	SearchComponent,
	AddStoryComponent,
	NotificationsComponent,
	UserProfileComponent,
	AppMenuComponent,
	FollowListComponent,
 } from './components';


// import { } from './services';
// import { } from './pipes';
// import { } from './modals';
// import { } from './directives';

const components = [
	NewsFeedComponent,
	SearchComponent,
	AddStoryComponent,
	NotificationsComponent,
	UserProfileComponent,
	AppMenuComponent,
	FollowListComponent,
];

const directives = [];

const modals = [

];

const pipes = [

];

const services = [

];

const modules = [
	RouterModule,
	CommonModule,
	SharedModule,
];

@NgModule({
	declarations: [components, directives, pipes, modals],
	imports: modules,
	providers: [services, pipes, modals],
	exports: [components, directives, pipes],
	entryComponents: [modals],
})
export class CoreModule { }
