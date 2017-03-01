import {Component, OnInit} from '@angular/core';
import {AppService} from "../services/app.service";
import {Router} from "@angular/router";
import {DialogService} from "../services/dialog.service";
import {User} from "../models/user.model";
import {TripService} from "../services/trip.service";
import {Trip} from "../models/trip.model";
import {BusinessAccount} from "../models/business-account.model";
import {BusinessService} from "../services/business.service";
import {AutocompleteData} from "../models/autocompleteData.model";
import {LocationService} from "../services/location.service";
import {NotificationService} from "../services/notification.service";
import {BusinessUser} from "../models/business-user.model";
import {businessStats} from "../models/home-stats.model";


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	stats:businessStats = new businessStats();

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

	accounts: BusinessAccount[] = [];
	selectedAccount: BusinessAccount = new BusinessAccount();
	newTrip: Trip = new Trip();

	newTriplocations: AutocompleteData[] = [];
	newTripLocationSelected: AutocompleteData = new AutocompleteData();
	admins: BusinessUser[] = [];
	guides: BusinessUser[] = [];

	constructor(private appService: AppService,
							private router: Router,
							private dialogService: DialogService,
							private tripService: TripService,
							private locationService: LocationService,
							private notification: NotificationService,
							private businessService: BusinessService) {

		this.appService.sidebarProgressToggle.subscribe(toggle => {

			this.sidebarProgressToggle = toggle;

		});

		this.appService.userEvent.subscribe(user => this.user = user);
	}
	onLocationKeyUp(text: string) {
		this.newTriplocations = [];
		if (text) {
			this.locationService.search(text).subscribe(res => {
				if (res) {
					res.forEach(item => {
						let data = new AutocompleteData();
						data.title = item.longName;
						data.data = item;
						this.newTriplocations.push(data);

					});
				}
			});

		}


	}

	onNewTripLocationSelect(data: AutocompleteData) {
		this.newTripLocationSelected = data;
		this.newTrip.start_location = data.title;
		this.newTrip.start_location_lat = data.data.lat;
		this.newTrip.start_location_long = data.data.lng;

	}

	ngOnInit() {
		// load trips from /assets/data/trips.json

		this.tripService.upcomingTrips().subscribe(res => {
			this.trips = res;
			if (res.length) {
				for (let i = 0; i < res.length; i++) {
					if (res[i].coverImages && res[i].coverImages.data && res[i].coverImages.data.length) {
						res[i].cover_image = res[i].coverImages.data[0].url;
					}
				}
			}

			this.showTripsLoading = false;

		}, err => {
			this.showTripsLoading = false;
			console.log(err);
		});

		if (this.user == null) {
			this.router.navigate(['/login']);
		}

		let currentBusinessAccount = this.appService.currentBusinessAccount;

		if (currentBusinessAccount) {
			this.selectedAccount = currentBusinessAccount;
			this.newTrip.business_id = this.selectedAccount.id;
			this.getStats();
		}

		this.appService.currentBusinessAccount$.subscribe(acc => {
			if (acc) {
				this.selectedAccount = acc;
				this.getStats();
			}
		});

	}

	getStats(){

		if(this.selectedAccount){
			this.businessService.getStats(this.selectedAccount.id).subscribe(res => {
				this.stats = res;

			}, err => {
				console.log(err);
			})
		}

	}

	tripLayout(style: string) {

		this.config.tripLayout = style;
	}

	onSelectStartDate(event) {

		this.fromDate = event.formatted;
		this.newTrip.start_date = event.formatted;
	}

	onSelectToDate(event) {
		this.toDate = event.formatted;
		this.newTrip.end_date = event.formatted;
	}

	createTrip() {


		this.newTrip.business_id = this.selectedAccount.id;

		this.tripService.create(this.newTrip).subscribe(res => {

			let tripId = res.id;
			this.router.navigate(['/trips/manage', tripId]);
		}, err => {
			this.notification.show("An error creating the trip. Please fill correct trip information", 'error');

		});

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
