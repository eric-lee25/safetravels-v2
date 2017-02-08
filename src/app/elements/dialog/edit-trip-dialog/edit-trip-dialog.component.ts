import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";
import {Trip} from "../../../models/trip.model";
import {MdDialogRef} from "@angular/material";
import {AutocompleteData} from "../../../models/autocompleteData.model";
import {LocationService} from "../../../services/location.service";

@Component({
	selector: 'app-edit-trip-dialog',
	templateUrl: './edit-trip-dialog.component.html',
	styleUrls: ['./edit-trip-dialog.component.css']
})
export class EditTripDialogComponent implements OnInit {

	title: string = "Multi Language activity debug";

	trip: Trip = new Trip();

	locations: AutocompleteData[] = [];

	constructor(private appService: AppService,
							private locationService: LocationService,
							public dialogRef: MdDialogRef<EditTripDialogComponent>) {

		this.title = this.appService.dialogTitle;
	}

	ngOnInit() {

		this.trip = this.appService.selectedTrip;

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
}
