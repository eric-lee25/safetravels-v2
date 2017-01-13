import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from "../../services/app.service";
import {DialogService} from "../../services/dialog.service";
import {AuthService} from "../../services/auth.service";
import {User} from "../../models/user.model";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {

  user: User = new User();
  agreeTermConditions: boolean = false;

  constructor(private appService: AppService,
              private auth: AuthService,
              private dialogService: DialogService) {

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

  onSubmit() {

    // check terms

    if (!this.agreeTermConditions) {

      let title = "Signup Error";
      let message = "Please review terms of conditions and accept.";

      this.dialogService.showMessageDialog(title, message);

      return;

    }
    if (this.user.password !== this.user.password_confirmation) {

      let title = "Signup Error";
      let message = "Password and password confirm does not match.";
      this.dialogService.showMessageDialog(title, message);

      return;

    } else {

      this.auth.register(this.user).subscribe(res => {

        console.log("Response:", res);

      }, err => {

        console.log("Error: ", err);
      });

    }
    console.log(this.user);

  }
}
