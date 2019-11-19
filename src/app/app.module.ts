import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';


import { routes } from './app.routes';
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';
import { LoginModule } from './login';

import { environment } from '../environments/environment';
export const firebaseConfig = environment.firebaseConfig;

const modules = [
	CommonModule,
	BrowserAnimationsModule,
	RouterModule.forRoot(routes, { useHash: false }),
	AngularFireModule.initializeApp(firebaseConfig, 'Instagram'),
	FlexLayoutModule,
	HttpClientModule,
	AngularFireAuthModule,

  	CoreModule,
	SharedModule,
	LoginModule,
];

@NgModule({
	declarations: [AppComponent],
	imports: [modules],
	providers: [],
	entryComponents: [AppComponent],
	exports: [],
	bootstrap: [AppComponent]
})
export class AppModule {
	constructor() { }
}
