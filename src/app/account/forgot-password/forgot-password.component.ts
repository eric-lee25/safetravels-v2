import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  constructor(private appService: AppService) {
  }

  ngOnInit() {

    this.appService.showLandingPageEvent.next(true);
  }


  ngOnDestroy() {

    this.appService.showLandingPageEvent.next(false);
  }
}
