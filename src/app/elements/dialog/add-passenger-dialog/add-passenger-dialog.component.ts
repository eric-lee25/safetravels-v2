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
	errorMessage: string = null;

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
		this.tripService.reSentInvite(invite).subscribe(res => {
			console.log(res);
			invite.sent = true;
		}, err => {
			console.log(err);
		});
	}

	onInviteSubmit() {
		this.tripService.invitePassenger(this.trip.id, this.newInvite).subscribe(res => {
			console.log(res);

			this.dialogRef.close(res);
		}, err => {
			console.log(err);
			this.errorMessage = "An error sending invite to passenger";
		});
	}

	inviteToggleSent(event) {
		this.newInvite.send_invite_now = event.checked;
	}

	deleteInvite(invite: TripInvite) {
		this.tripService.deleteInvite(invite).subscribe(res => {
			console.log(res);

			let indexInvite = this.findInviteIndex(invite, this.invites);
			if(indexInvite !== null){
				this.invites.splice(indexInvite, 1);
			}

		}, err => {
			console.log(err);
			this.errorMessage = "An error sending invite to passenger";
		});
	}

	findInviteIndex(invite: TripInvite, invites: TripInvite[]): number {

		if (invites.length) {
			for (let i = 0; i < invites.length; i++) {
				if (invites[i].id == invite.id) {
					return i;
				}
			}
		}
		return null;

	}
}
