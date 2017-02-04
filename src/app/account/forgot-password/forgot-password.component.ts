import {Component, OnInit, OnDestroy} from '@angular/core';
import {AppService} from "../../services/app.service";
import {AuthService} from "../../services/auth.service";
import {DialogService} from "../../services/dialog.service";

@Component({
	selector: 'app-forgot-password',
	templateUrl: './forgot-password.component.html',
	styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

	email: string = "";

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

	onSubmit() {

		this.auth.forgotPassword(this.email).subscribe(res => {

			let title = "Forgot password successful";
			let msg = `We've sent an email to ` + this.email + ` Click the link in the email to reset your password. <br /> If you don't see the email, check other places it might be, like your junk, spam, social, or other folders.`;
			this.dialogService.showMessageDialog(title, msg);

		}, err => {
			let title = "Forgot password Error";
			let msg = err.json().message;
			this.dialogService.showMessageDialog(title, msg);
		})
	}
}
