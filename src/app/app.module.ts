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
import {DatepickerModule} from 'angular2-material-datepicker';
import {BusinessUsersComponent} from './business/business-users/business-users.component';
import {TripsComponent} from './trips/trips/trips.component';
import {ManageTripComponent} from './trips/manage-trip/manage-trip.component';
import {TripTokenDialogComponent} from './elements/dialog/trip-token-dialog/trip-token-dialog.component';
import { ProfileComponent } from './account/profile/profile.component';
import { GalleryComponent } from './gallery/gallery.component'

import { DropzoneModule } from 'angular2-dropzone-wrapper';
import { DropzoneConfigInterface } from 'angular2-dropzone-wrapper';
import { ProductOffersComponent } from './product-offers/product-offers.component';
import {DxChartModule, DxSelectBoxModule} from "devextreme-angular";

const DROPZONE_CONFIG: DropzoneConfigInterface = {
  // Change this to your upload POST address:
  server: 'https://httpbin.org/post',
  maxFilesize: 50,
  acceptedFiles: 'image/*'
};


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
    ProgressComponent,
    BusinessUsersComponent,
    TripsComponent,
    ManageTripComponent,
    TripTokenDialogComponent,
    ProfileComponent,
    GalleryComponent,
    ProductOffersComponent
  ],
  entryComponents: [TripTokenDialogComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    MaterialModule.forRoot(),
    DropzoneModule.forRoot(DROPZONE_CONFIG),
    DxSelectBoxModule,
    DxChartModule,
    DatepickerModule
  ],
  providers: [AppService, UserService, DemoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
