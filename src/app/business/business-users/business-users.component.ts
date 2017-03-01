import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {BusinessAccount} from "../../models/business-account.model";
import {BusinessService} from "../../services/business.service";
import {BusinessUser, InviteBusinessUser} from "../../models/business-user.model";
import {NotificationService} from "../../services/notification.service";
import {AppService} from "../../services/app.service";

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
	invites: InviteBusinessUser[] = [];

	loading: boolean = true;


	constructor(private appService: AppService, private dialogService: DialogService,
							private notification: NotificationService,
							private businessService: BusinessService) {

	}

	ngOnInit() {


		let currentBusinessAccount = this.appService.currentBusinessAccount;
		if (currentBusinessAccount) {
			this.selectedAccount = currentBusinessAccount;
			this.getUsers(this.selectedAccountType);
		}


		this.appService.currentBusinessAccount$.subscribe(account => {

			if (account) {
				this.selectedAccount = account;
				this.getUsers(this.selectedAccountType);
			}
		});

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


		this.getInvites();
	}

	getInvites() {
		this.businessService.getInvites(this.selectedAccount.id).subscribe(res => {

			this.invites = res;
		}, err => {
			console.log(err);
		});
	}

	reSendInvite(invite: InviteBusinessUser) {
		this.businessService.reSendInvite(invite.id).subscribe(res => {

			let inviteIndex = this.findIndexbyId(this.invites, invite);
			if (inviteIndex) {
				this.invites.splice(inviteIndex, 1);
			}
			this.notification.show("Invite has been sent");

		}, err => {
			console.log(err);
		});

	}

	findIndexbyId(items: any[], item: any) {
		if (item.length) {
			for (let i = 0; i < items.length; i++) {
				if (items[i].id == item.id) {
					return i;
				}
			}
		}

		return null;
	}


	deleteInvite(invite: InviteBusinessUser) {
		this.businessService.deleteInvite(invite.id).subscribe(res => {

			this.notification.show("Invite has been deleted.");

		}, err => {
			console.log(err);
		});
	}

	showAddStaffUserDialog() {
		let ref = this.dialogService.openAddStaffUserDialog();

		ref.afterClosed().subscribe(user => {

			if (user) {


				this.businessService.sendInviteStaffUser(this.selectedAccount.id, user).subscribe(res => {

					this.getInvites();

				}, err => {
					console.log(err);
					this.notification.show(err.json().message, 'error');
				});
			}

		});

	}
}