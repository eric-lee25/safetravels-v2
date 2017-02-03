import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {BusinessAccount} from "../../models/business-account.model";
import {BusinessService} from "../../services/business.service";
import {BusinessUser} from "../../models/business-user.model";
import {NotificationService} from "../../services/notification.service";

@Component({
	selector: 'app-business-users',
	templateUrl: './business-users.component.html',
	styleUrls: ['./business-users.component.css']
})
export class BusinessUsersComponent implements OnInit {


	selectedAccount: BusinessAccount = new BusinessAccount();
	businessAccounts: BusinessAccount[] = [];

	businessAccountTypes: string[] = ['administrators', 'guides'];
	selectedAccountType: string = 'administrators';

	users: BusinessUser[] = [];
	loading: boolean = true;


	constructor(private dialogService: DialogService,
							private notification: NotificationService,
							private businessService: BusinessService) {

	}

	ngOnInit() {


		this.businessService.getBusinessesOwner().subscribe(res => {

			this.businessAccounts = res;

			if (this.businessAccounts.length) {
				this.loading = false;

				this.selectedAccount = this.businessAccounts[0];
				this.getUsers(this.selectedAccountType);
			}

		});


		this.getData();

	}

	onBusinessAccountChange(account: BusinessAccount) {

		this.getData();

	}

	onBusinessAccountTypeChange(type: string) {
		this.getData();

	}

	getData() {
		this.loading = true;
		this.users = [];
		if (this.selectedAccount.id) {
			this.getUsers(this.selectedAccountType);
		}

	}

	getUsers(accountType: string) {


		if (accountType == 'administrators') {

			this.businessService.getAdministrators(this.selectedAccount.id).subscribe(res => {

				this.users = res;
				this.loading = false;

			}, err => {

				console.log(err);
			});
		} else {
			this.businessService.getGuides(this.selectedAccount.id).subscribe(res => {
				this.users = res;
				this.loading = false;
			}, err => {
				console.log(err);
			});

		}
	}

	showAddStaffUserDialog() {
		let ref = this.dialogService.openAddStaffUserDialog();

		ref.afterClosed().subscribe(user => {

			if (user) {

				console.log("After closed, found user: ", user);


				this.businessService.createUser(this.selectedAccount.id, user).subscribe(res => {

					console.log(res);
					this.users.push(res);

				}, err => {
					this.notification.show(err.json().message, 'error');
				});
			}

		});

	}
}