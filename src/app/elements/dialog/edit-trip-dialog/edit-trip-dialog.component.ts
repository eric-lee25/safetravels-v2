import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";
import {Trip} from "../../../models/trip.model";
import {MdDialogRef} from "@angular/material";
import {AutocompleteData} from "../../../models/autocompleteData.model";
import {LocationService} from "../../../services/location.service";
import {BusinessService} from "../../../services/business.service";
import {BusinessUser} from "../../../models/business-user.model";
import {BusinessAccount} from "../../../models/business-account.model";

@Component({
	selector: 'app-edit-trip-dialog',
	templateUrl: './edit-trip-dialog.component.html',
	styleUrls: ['./edit-trip-dialog.component.css']
})
export class EditTripDialogComponent implements OnInit {

	title: string = "Edit Trip";

	trip: Trip = new Trip();

	locations: AutocompleteData[] = [];
	admins: BusinessUser[] = [];
	guides: BusinessUser[] = [];

	constructor(private appService: AppService,
							private businessService: BusinessService,
							private locationService: LocationService,
							public dialogRef: MdDialogRef<EditTripDialogComponent>) {

		this.title = this.appService.dialogTitle;
	}

	ngOnInit() {

		let selectedTrip = this.appService.selectedTrip;
		if (selectedTrip) {
			this.trip = selectedTrip;
		} else {
			this.trip = new Trip();
		}
		if (this.trip.id) {
			this.title = "Edit Trip";
		}
		if (!this.trip.id) {
			let currentBusinessAccount = this.appService.currentBusinessAccount;
			if (currentBusinessAccount) {
				this.trip.business_id = currentBusinessAccount.id;
				this.getAdminUsers();
				this.getGuidesUsers();
			}
		}



		this.appService.currentBusinessAccount$.subscribe(account => {
			if (account) {
				this.trip.business_id = account.id;
				this.onBusinessAccountChange();
			}
		});

	}

	dateOptions = {
		inputValueRequired: true,
		selectionTxtFontSize: '13px',
		width: '100%',
		showInputField: true,
		dateFormat: 'yyyy-mm-dd',
		componentDisabled: false
	};


	onSelectStartDate(event) {

		this.trip.start_date = event.formatted;
	}

	onSelectEndDate(event) {

		this.trip.end_date = event.formatted;
	}

	onSave() {

		this.dialogRef.close(this.trip);
	}

	onLocationKeyUp(text: string) {
		this.locations = [];
		if (text) {
			this.locationService.search(text).subscribe(res => {
				if (res) {
					res.forEach(item => {
						let data = new AutocompleteData();
						data.title = item.longName;
						data.data = item;
						this.locations.push(data);

					});
				}
			});

		}


	}

	onTripLocationSelect(data: AutocompleteData) {
		this.trip.start_location = data.title;
		this.trip.start_location_lat = data.data.lat;
		this.trip.start_location_long = data.data.lng;

	}

	admin_chat_enabled(event) {
		console.log(event);
		this.trip.admin_chat_enabled = event.checked;
	}

	guide_chat_enabled(event) {
		this.trip.guide_chat_enabled = event.checked;
	}

	group_chat_enabled(event) {
		this.trip.group_chat_enabled = event.checked;
	}

	onBusinessAccountChange(event?: any) {
		if (this.trip.business_id) {
			this.getAdminUsers();
			this.getGuidesUsers();
		}
	}

	getAdminUsers() {
		this.businessService.getAdministrators(this.trip.business_id).subscribe(res => {

			this.admins = res;
		}, err => {
			console.log(err);
		});
	}

	getGuidesUsers() {
		this.businessService.getGuides(this.trip.business_id).subscribe(res => {
			this.guides = res;
		}, err => {
			console.log(err);
		});
	}
}
