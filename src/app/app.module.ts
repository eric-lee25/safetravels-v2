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
import { NavigationComponent } from './sidebar/navigation/navigation.component';
import {DemoService} from "./services/demo.service";
import { ProgressComponent } from './sidebar/progress/progress.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    NavigationComponent,
    ProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [AppService, UserService, DemoService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
