import {Component, OnInit} from '@angular/core';
import {DemoService} from "../services/demo.service";
import {AppService} from "../services/app.service";


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

	constructor(private appService: AppService,
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

	onSelectStartDate(date: Date) {
		console.log("onSelect: ", date);
	}

}
