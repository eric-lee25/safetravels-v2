import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    this.appService.showLandingPageEvent.next(true);
  }

  ngOnDestroy() {
    this.appService.showLandingPageEvent.next(false);
  }

}
