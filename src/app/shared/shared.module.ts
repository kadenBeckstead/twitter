import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MobxAngularModule } from 'mobx-angular';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { OverlayModule } from '@angular/cdk/overlay';
import { ClickOutsideModule } from 'ng-click-outside';


import {
	AvatarComponent,
	BackHeaderComponent,
	AccountRowComponent,
	PostComponent,
	PostsListComponent,
	ClickableStringComponent,
} from './components';

import { 
	DummyDataService,
	FeatureFlagsService,
	RealDataService,
	LocalSettingsService,
	FormatterService,
 } from './services';

import { 
	EscapeHtmlPipe,
 } from './pipes';

// import { } from './directives';


const components = [
	AvatarComponent,
	BackHeaderComponent,
	AccountRowComponent,
	PostComponent,
	PostsListComponent,
	ClickableStringComponent,
];

const directives = [];

const modals = [];

const pipes = [
	EscapeHtmlPipe
];

const services = [
	DummyDataService,
	FeatureFlagsService,
	RealDataService,
	LocalSettingsService,
	FormatterService,
];

const modulesToExport = [
	MatToolbarModule,
	MatTabsModule,
	MatCardModule,
	MatBadgeModule,
	MatDividerModule,
	MatFormFieldModule,
	MatInputModule,
	MatIconModule,
	MatSelectModule,
	MatRadioModule,
	MatSortModule,
	MatButtonModule,
	MatTooltipModule,
	MatSnackBarModule,
	MatListModule,
	MatAutocompleteModule,
	MatDatepickerModule,
	MatGridListModule,
	MatProgressBarModule,
	MatSidenavModule,
	MatTableModule,
	MatBottomSheetModule,
	MatMenuModule,
	MatCheckboxModule,
	MatExpansionModule,
	MatDialogModule,
	MatNativeDateModule,
	MatStepperModule,
	MatPaginatorModule,
	MobxAngularModule,
	MatSlideToggleModule,
	FlexLayoutModule,
	FormsModule,
	ReactiveFormsModule,
	BrowserModule,
	BrowserAnimationsModule,
	OverlayModule,
	ClickOutsideModule,
]

const modules = [
	RouterModule,
	CommonModule,
	...modulesToExport,
];

@NgModule({
	declarations: [components, directives, pipes, modals],
	imports: modules,
	providers: [services, pipes, modals],
	exports: [components, directives, pipes, ...modulesToExport],
	entryComponents: [modals],
})
export class SharedModule {}
