import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {AppService} from "../../services/app.service";
import {Trip} from "../../models/trip.model";
import {TripService} from "../../services/trip.service";
import {NotificationService} from "../../services/notification.service";

@Component({
	selector: 'app-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

	trips: Trip[] = [];
	showLoading: boolean = true;

	constructor(private tripService: TripService,
							private notificationService: NotificationService,
							private dialogService: DialogService,
							private appService: AppService) {

	}

	ngOnInit() {

		this.tripService.listTrips('admin,guide').subscribe(res => {

			this.trips = res;

			this.showLoading = false;

		}, err => {
			console.log(err);
			this.showLoading = false;
			this.notificationService.show(err.json().message, 'error');
		});
	}


	openAddTripDialog() {
		this.appService.selectedTripEvent.next(null);
		this.appService.dialogTitleEvent.next("Create new Trip");
		this.dialogService.openEditTripDialog();
	}

}
