import {NgModule}              from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {BusinessAccountComponent} from "./business/business-account/business-account.component";
import {BusinessPlanComponent} from "./business/business-plan/business-plan.component";


const appRoutes: Routes = [
	{path: 'home', component: HomeComponent},
	{path: 'business/account', component: BusinessAccountComponent},
	{path: 'business/plan', component: BusinessPlanComponent},
	{path: '', redirectTo: '/home', pathMatch: 'full'},
	{path: '**', component: PageNotFoundComponent}
];


@NgModule({
	imports: [
		RouterModule.forRoot(appRoutes)
	],
	exports: [
		RouterModule
	]
})
export class AppRoutingModule {


}
