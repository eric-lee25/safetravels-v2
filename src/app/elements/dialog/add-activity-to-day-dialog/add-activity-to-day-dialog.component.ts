import {Component, OnInit} from '@angular/core';
import {TripActivity, TripActivityDetail} from "../../../models/trip-activity.model";
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


	}

	ngOnInit() {
		this.trip = this.appService.selectedTrip;
		this.activityTypes = this.appService.activityTypes;
		let activity = this.appService.selectedTripActivity;
		console.log(activity);

		if (activity && activity.id) {
			this.activity = activity;
			this.activity.title = this.activity.en.title;
			this.activity.description = this.activity.en.description;
			this.activity.meeting_point = this.activity.en.meeting_point;
			this.activity.notes = this.activity.en.notes;
			this.getActivityTypeSlug();

			if (this.activity.end) {
				this.endTime = new Date(this.activity.end);
			}
			if (this.startTime) {
				this.startTime = new Date(this.activity.start);
			}


		}


		if (this.activityTypes.length == 0) {

			this.tripService.getActivityTypes().subscribe(res => {
					this.activityTypes = res;

					this.appService.activityTypesEvent.next(res);

					this.getActivityTypeSlug();


				}, err => {
					console.log(err);
				}
			);
		}


	}

	getActivityTypeSlug() {
		if (this.activityTypes.length && this.activity.id && this.activity.type !== null) {

			let typeSlug = this.getTypeSlugFromId(this.activity.type);

			if (typeSlug !== null) {
				this.activity.type_slug = typeSlug;
			}
		}
	}

	getTypeSlugFromId(id: number): string {

		for (let i = 0; i < this.activityTypes.length; i++) {
			if (this.activityTypes[i].id == id) {
				return this.activityTypes[i].slug;
			}
		}
		return null;
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

		if (this.activity.id) {

			//save activity

			this.tripService.updateActivity(this.activity).subscribe(res => {

				this.dialogRef.close(res);
			}, err => {
				console.log(err);
			});

		} else {
			// create new
			this.activity.extras = '{}';
			this.activity.start = this.datePipe.transform(this.startDate, 'y-MM-dd') + ' ' + this.datePipe.transform(this.startTime, 'HH:mm:ss');//(new Date(this.startDate + ' ' + this.getTime(this.startTime)).getTime() / 1000);
			this.activity.end = this.datePipe.transform(this.endDate, 'y-MM-dd') + ' ' + this.datePipe.transform(this.endTime, 'HH:mm:ss'); //(new Date(this.endDate + ' ' + this.getTime(this.endTime)).getTime() / 1000);

			console.log("Activity Submitted:", this.activity);
			this.tripService.createActivity(this.trip.id, this.activity).subscribe(res => {

				console.log(res);
				this.dialogRef.close(res);

			}, err => {
				console.log(err);
			});
		}


	}

	onLanguageChange(event) {
		let langCode = event.value;
		if (!this.activity[langCode]) {
			this.activity[langCode] = new TripActivityDetail();
		}
	}
}
