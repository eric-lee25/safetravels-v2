import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {BusinessService} from "../../services/business.service";
import {BusinessAccount} from "../../models/business-account.model";
import {NotificationService} from "../../services/notification.service";

@Component({
	selector: 'app-business-account',
	templateUrl: './business-account.component.html',
	styleUrls: ['./business-account.component.css']
})
export class BusinessAccountComponent implements OnInit {

	accounts: BusinessAccount[] = [];

	selectedAccount: BusinessAccount = new BusinessAccount();


	constructor(private dialogService: DialogService,
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

	showImageDialog(title: string) {
		this.dialogService.openImageUploadDialog(title);
	}


	onSaveBusinessAccount() {

		this.businessService.updateBusinessAccount(this.selectedAccount).subscribe(res => {

			this.notification.show('Update business account successful.');
		}, err => {

			this.notification.show(err.json().message, 'error');
		});
	}
}
