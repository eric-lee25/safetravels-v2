import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {AppService} from "../../../services/app.service";
import {Trip} from "../../../models/trip.model";
import {TripInvite} from "../../../models/trip-invite.model";
import {TripService} from "../../../services/trip.service";

@Component({
	selector: 'app-add-passenger-dialog',
	templateUrl: './add-passenger-dialog.component.html',
	styleUrls: ['./add-passenger-dialog.component.css']
})
export class AddPassengerDialogComponent implements OnInit {

	trip: Trip = new Trip();
	invites: TripInvite[] = [];
	newInvite: TripInvite = new TripInvite();


	constructor(private appService: AppService,
							private tripService: TripService,
							public dialogRef: MdDialogRef<AddPassengerDialogComponent>) {

	}

	ngOnInit() {

		let selectedTrip = this.appService.selectedTrip;
		if (selectedTrip) {
			this.trip = selectedTrip;

			// get all invites of trip this.

			this.tripService.getTripInvites(this.trip.id).subscribe(res => {
				this.invites = res;

			}, err => {
				console.log(err);
			})
		}
	}

	reSentInvite(invite: TripInvite) {
		// do resent here..
	}

}
