import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import {ScrollingModule} from '@angular/cdk/scrolling';

import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { LoginModule } from './login';

const modules = [
	CommonModule,
	BrowserAnimationsModule,
	RouterModule.forRoot(routes, { useHash: false }),
	FlexLayoutModule,
	HttpClientModule,
	// ScrollingModule,

  	CoreModule,
	SharedModule,
	LoginModule,
];

@NgModule({
	declarations: [AppComponent],
	imports: [modules, BrowserAnimationsModule],
	providers: [],
	entryComponents: [AppComponent],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor() { }
}
