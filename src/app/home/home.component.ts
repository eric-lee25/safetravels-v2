import {Component, OnInit} from '@angular/core';
import {DemoService} from "../services/demo.service";
import {AppService} from "../services/app.service";
import {Router} from "@angular/router";
import {DialogService} from "../services/dialog.service";


@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	config = {
		tripLayout: "grid"
	};
	trips: any[] = [];


	sidebarProgressToggle: boolean = true;

	datePickerOptions = {showInputField: false, dateFormat: 'yyyy-mm-dd', componentDisabled: false};
	toDate: string = "";
	fromDate: string = "";


	constructor(private appService: AppService,
							private router: Router,
							private dialogService: DialogService,
							private demoService: DemoService) {

		this.appService.sidebarProgressToggle.subscribe(toggle => {

			this.sidebarProgressToggle = toggle;

		});
	}

	ngOnInit() {
		// load trips from /assets/data/trips.json

		this.demoService.getTrips().subscribe(res => this.trips = res, err => {
			console.log(err);
		});


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

}
