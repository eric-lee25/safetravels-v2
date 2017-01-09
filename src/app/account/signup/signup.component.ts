import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from "../../services/app.service";
import {DialogService} from "../../services/dialog.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  constructor(private appService: AppService, private dialogService: DialogService) {
  }

  ngOnInit() {

    this.appService.showLandingPageEvent.next(true);
  }

  ngOnDestroy() {
    this.appService.showLandingPageEvent.next(false);

  }

  openTermsDialog() {

    this.dialogService.openTermsDialog();
  }

  openPrivacyDialog() {

    this.dialogService.openPrivacyDialog();
  }
}
