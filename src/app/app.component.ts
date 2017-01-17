import {Component, OnInit} from '@angular/core';
import {AppService} from "./services/app.service";
import {User} from "./models/user.model";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app works!';


  sidebarCollapsed: boolean = true;
  showLandingPage: boolean = this.appService.showLandingPage;

  user: User = null;

  constructor(public appService: AppService, private auth: AuthService, private router: Router) {

    this.appService.sidebarToggle.subscribe(collapsed => this.sidebarCollapsed = collapsed);
    this.sidebarCollapsed = this.appService.configStorage.sidebarCollapsed;

    this.appService.showLandingPageEvent.subscribe(value => this.showLandingPage = value);


    this.user = auth.getCurrentUser();

    this.appService.userEvent.subscribe(user => this.user = user);

    this.appService.onAuthChange$.subscribe(data => {

      if (!data.user) {
        this.showLogin();
      }
    });




    if (!this.user) {
      this.showLogin();
    }
  }

  /**
   * Toogle sidebar left
   * @param toggle
   */
  toggleSidebar(toggle: boolean) {
    this.appService.sidebarToggle.next(toggle);
  }

  ngOnInit() {


  }

  showLogin() {

    this.router.navigate(['/login'])
  }
}
