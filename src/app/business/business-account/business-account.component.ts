import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {BusinessService} from "../../services/business.service";
import {BusinessAccount} from "../../models/business-account.model";
import {NotificationService} from "../../services/notification.service";
import {DropzoneConfigInterface} from "angular2-dropzone-wrapper";
import {AuthService} from "../../services/auth.service";
import {UploadImageDialogComponent} from "../../elements/dialog/upload-image-dialog/upload-image-dialog.component";
import {AppService} from "../../services/app.service";
import {MdDialog} from "@angular/material";

@Component({
	selector: 'app-business-account',
	templateUrl: './business-account.component.html',
	styleUrls: ['./business-account.component.css']
})
export class BusinessAccountComponent implements OnInit {

	accounts: BusinessAccount[] = [];

	selectedAccount: BusinessAccount = new BusinessAccount();


	constructor(private dialog: MdDialog,
							private appService: AppService,
							private auth: AuthService,
							private notification: NotificationService,
							private businessService: BusinessService) {

	}

	ngOnInit() {


		this.businessService.getBusinessesOwner().subscribe(res => {
			this.accounts = res;
			if (this.accounts.length) {
				this.selectedAccount = this.accounts[0];
			}
		}, err => {
			console.log(err);
		});
	}


	openImageDialog() {

		let config: DropzoneConfigInterface = {
			server: this.appService.serverURL + '/businesses/' + this.selectedAccount.id + '/logo',
			headers: {"Authorization": "bearer " + this.auth.getToken()},
			paramName: 'image',
			uploadMultiple: false
		};

		this.appService.uploadConfigEvent.next(config);

		this.appService.dialogTitleEvent.next("Upload Logo Image");
		let dialogRef = this.dialog.open(UploadImageDialogComponent);

		dialogRef.afterClosed().subscribe(event => {


			if (event && typeof event[1] !== "undefined") {
				this.selectedAccount.logo = event[1].data.logo;
			}


		});

	}


	onSaveBusinessAccount() {

		this.businessService.updateBusinessAccount(this.selectedAccount).subscribe(res => {

			this.notification.show('Update business account successful.');
		}, err => {

			this.notification.show(err.json().message, 'error');
		});
	}
}
