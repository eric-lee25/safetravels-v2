import {Component, OnInit} from '@angular/core';
import {AppService} from "../services/app.service";
import {Router} from "@angular/router";
import {DialogService} from "../services/dialog.service";
import {User} from "../models/user.model";
import {TripService} from "../services/trip.service";
import {Trip} from "../models/trip.model";


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	user: User = this.appService.currentUser;

	config = {
		tripLayout: "grid"
	};

	trips: Trip[] = [];


	sidebarProgressToggle: boolean = true;

	datePickerOptions = {showInputField: false, dateFormat: 'yyyy-mm-dd', componentDisabled: false};
	toDate: string = "";
	fromDate: string = "";

  showTripsLoading: boolean = true;


	constructor(private appService: AppService,
							private router: Router,
							private dialogService: DialogService,
							private tripService: TripService) {

		this.appService.sidebarProgressToggle.subscribe(toggle => {

			this.sidebarProgressToggle = toggle;

		});

		this.appService.userEvent.subscribe(user => this.user = user);
	}

	ngOnInit() {
		// load trips from /assets/data/trips.json

		this.tripService.listTrips().subscribe(res => {
			this.trips = res;

			this.showTripsLoading = false;

		}, err => {
      this.showTripsLoading = false;
			console.log(err);
		});

		if (this.user == null) {
			this.router.navigate(['/login']);
		}


	}

	tripLayout(style: string) {

		this.config.tripLayout = style;
	}

	onSelectStartDate(event) {

		this.fromDate = event.formatted;
	}

	onSelectToDate(event) {
		this.toDate = event.formatted;
	}

	createTrip() {

		let tripId = "1";

		this.router.navigate(['/trips/manage', tripId]);
	}

	showNewMessageDialog() {


	}

	showNewOfferDialog() {
		this.dialogService.openAddProductOfferDialog();
	}

	getDuration(from: string, to: string): number {

		let date1 = new Date(from);
		let date2 = new Date(to);
		let timeDiff = Math.abs(date2.getTime() - date1.getTime());
		let diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

		return diffDays;


	}

	getBackground(url: string): string {
		if (url && url !== null) {
			return 'url(' + url + ')'
		}

		return 'none';
	}

}
