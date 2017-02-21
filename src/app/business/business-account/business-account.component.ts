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
import {Country} from "../../models/country.model";
import {CountryState} from "../../models/state.model";

@Component({
	selector: 'app-business-account',
	templateUrl: './business-account.component.html',
	styleUrls: ['./business-account.component.css']
})
export class BusinessAccountComponent implements OnInit {

	accounts: BusinessAccount[] = [];

	selectedAccount: BusinessAccount = new BusinessAccount();
	countries: Country[] = [];
	states: CountryState[] = [];


	constructor(private dialog: MdDialog,
							private appService: AppService,
							private auth: AuthService,
							private notification: NotificationService,
							private businessService: BusinessService) {

	}

	ngOnInit() {

		this.countries = this.appService.countries;
		if (this.countries.length == 0) {
			this.businessService.getCountries().subscribe(countries => {
				this.countries = countries;
				this.appService.countriesEvent.next(countries);
				this.getBusinessAccount();
			}, err => {
				console.log(err);
			});
		} else {
			this.getBusinessAccount();
		}

	}

	getBusinessAccount() {
		this.businessService.getBusinessesOwner().subscribe(res => {
			this.accounts = res;
			if (this.accounts.length) {
				this.selectedAccount = this.accounts[0];

				if (this.selectedAccount.country_code) {
					this.getCountryStates(this.selectedAccount.country_code);
				}
			}
		}, err => {
			console.log(err);
		});
	}

	onCountryChange(event) {

		let countryCode = this.selectedAccount.country_code;
		this.states = [];

		if (countryCode) {

			let arrSplit = countryCode.split('-');
			if (arrSplit.length) {
				let code2 = arrSplit[0];
				this.getCountryStates(code2);
			}
		}


	}


	getCountryStates(code: string) {

		this.businessService.getStates(code).subscribe(res => {

			this.states = res;

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
