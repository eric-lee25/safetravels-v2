import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {AppService} from "../../services/app.service";

@Component({
	selector: 'app-trips',
	templateUrl: './trips.component.html',
	styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {

	constructor(private dialogService: DialogService, private appService: AppService) {
	}

	ngOnInit() {
	}

	openAddTripDialog() {
		this.appService.dialogTitleEvent.next("Create new Trip");
		this.dialogService.openEditTripDialog();
	}

}
