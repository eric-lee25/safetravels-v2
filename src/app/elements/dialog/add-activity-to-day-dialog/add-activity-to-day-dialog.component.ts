import {Component, OnInit} from '@angular/core';
import {TripActivity} from "../../../models/trip-activity.model";
import {ActivityType} from "../../../models/activity-type.model";
import {TripService} from "../../../services/trip.service";
import {AutocompleteData} from "../../../models/autocompleteData.model";
import {LocationService} from "../../../services/location.service";
import {MdDialogRef} from "@angular/material";
import {Trip} from "../../../models/trip.model";
import {AppService} from "../../../services/app.service";
import {DatePipe} from "@angular/common";

@Component({
	selector: 'app-add-activity-to-day-dialog',
	templateUrl: './add-activity-to-day-dialog.component.html',
	styleUrls: ['./add-activity-to-day-dialog.component.css'],
	providers: [DatePipe]
})
export class AddActivityToDayDialogComponent implements OnInit {

	dateOptions = {
		inputValueRequired: true,
		selectionTxtFontSize: '13px',
		width: '100%',
		showInputField: true,
		dateFormat: 'yyyy-mm-dd',
		componentDisabled: false
	};
	multiLangContentCollapsed: boolean = true;

	trip: Trip = new Trip();

	activity: TripActivity = new TripActivity();
	activityTypes: ActivityType[] = [];

	fromLocations: AutocompleteData[] = [];
	endLocations: AutocompleteData[] = [];

	startDate: string = "";
	endDate: string = "";
	startTime: Date = new Date();
	endTime: Date = new Date();

	constructor(private appService: AppService,
							private tripService: TripService,
							private locationService: LocationService,
							private datePipe: DatePipe,
							public dialogRef: MdDialogRef<AddActivityToDayDialogComponent>) {

		if (this.activityTypes.length == 0) {

			this.tripService.getActivityTypes().subscribe(res => {
					this.activityTypes = res;
				}, err => {
					console.log(err);
				}
			);
		}
	}

	ngOnInit() {
		this.trip = this.appService.selectedTrip;

	}


	onFromLocationKeyUp(text: string) {

		this.fromLocations = [];
		if (text) {
			this.locationService.search(text).subscribe(res => {
				if (res) {
					res.forEach(item => {
						let data = new AutocompleteData();
						data.title = item.longName;
						data.data = item;
						this.fromLocations.push(data);

					});
				}
			});

		}


	}

	onSelectFromLocation(data: AutocompleteData) {

		this.activity.from = data.title;
		this.activity.from_lat = data.data.lat;
		this.activity.from_long = data.data.lng;

	}

	onEndLocationKeyUp(text: string) {
		this.endLocations = [];
		if (text) {
			this.locationService.search(text).subscribe(res => {
				if (res) {
					res.forEach(item => {
						let data = new AutocompleteData();
						data.title = item.longName;
						data.data = item;
						this.endLocations.push(data);

					});
				}
			});

		}


	}

	onSelectEndLocation(data: AutocompleteData) {

		this.activity.to = data.title;
		this.activity.to_lat = data.data.lat;
		this.activity.to_long = data.data.lng;
	}

	getTime(date: Date): string {
		return this.datePipe.transform(date, 'jms');

		//return date.toTimeString();
	}


	onSelectStartDate(event) {

		this.startDate = event.formatted;
	}

	onSelectEndDate(event) {
		this.endDate = event.formatted;
	}

	toggleMultiLangContent() {
		this.multiLangContentCollapsed = !this.multiLangContentCollapsed;

	}

	onSubmit() {

		this.activity.extras = '{}';
		this.activity.start = (new Date(this.startDate + ' ' + this.getTime(this.startTime)).getTime() / 1000);
		this.activity.end = (new Date(this.endDate + ' ' + this.getTime(this.endTime)).getTime() / 1000);

		this.tripService.createActivity(this.trip.id, this.activity).subscribe(res => {

			console.log(res);
			this.dialogRef.close(res);

		}, err => {
			console.log(err);
		});


	}
}
