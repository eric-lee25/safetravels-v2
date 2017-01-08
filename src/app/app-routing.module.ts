import {NgModule}              from '@angular/core';
import {RouterModule, Routes}  from '@angular/router';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {HomeComponent} from "./home/home.component";
import {BusinessAccountComponent} from "./business/business-account/business-account.component";
import {BusinessPlanComponent} from "./business/business-plan/business-plan.component";
import {BusinessUsersComponent} from "./business/business-users/business-users.component";
import {TripsComponent} from "./trips/trips/trips.component";
import {ManageTripComponent} from "./trips/manage-trip/manage-trip.component";
import {ProfileComponent} from "./account/profile/profile.component";
import {GalleryComponent} from "./gallery/gallery.component";
import {ProductOffersComponent} from "./product-offers/product-offers.component";


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'business/account', component: BusinessAccountComponent},
  {path: 'business/plan', component: BusinessPlanComponent},
  {path: 'business/users', component: BusinessUsersComponent},
  {path: 'trips', component: TripsComponent},
  {path: 'product-offers', component: ProductOffersComponent},
  {path: 'gallery', component: GalleryComponent},
  {path: 'account/profile', component: ProfileComponent},
  {path: 'trips/manage/:id', component: ManageTripComponent},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: PageNotFoundComponent}
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {


}
