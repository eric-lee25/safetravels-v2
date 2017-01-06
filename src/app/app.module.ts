import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';
import {AppRoutingModule} from "./app-routing.module";
import {AppService} from "./services/app.service";
import {UserService} from "./services/user.service";
import {NavigationComponent} from './sidebar/navigation/navigation.component';
import {DemoService} from "./services/demo.service";
import {SidebarProgressComponent} from './sidebar/progress/sidebar-progress.component';
import {BusinessAccountComponent} from './business/business-account/business-account.component';
import {BusinessPlanComponent} from './business/business-plan/business-plan.component';
import {CounterComponent} from './elements/counter/counter.component';
import {ProgressComponent} from './elements/progress/progress.component';
import {MaterialModule} from "@angular/material";
import 'hammerjs';

@NgModule({
	declarations: [
		AppComponent,
		PageNotFoundComponent,
		HomeComponent,
		NavigationComponent,
		SidebarProgressComponent,
		BusinessAccountComponent,
		BusinessPlanComponent,
		CounterComponent,
		ProgressComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		MaterialModule.forRoot()
	],
	providers: [AppService, UserService, DemoService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
