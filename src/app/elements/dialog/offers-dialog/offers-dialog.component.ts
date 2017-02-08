import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {ProductOffer} from "../../../models/product-offer.model";
import {AppService} from "../../../services/app.service";
import {TripActivity} from "../../../models/trip-activity.model";

@Component({
	selector: 'app-offers-dialog',
	templateUrl: './offers-dialog.component.html',
	styleUrls: ['./offers-dialog.component.css']
})
export class OffersDialogComponent implements OnInit {


	activity: TripActivity = new TripActivity();
	offers: ProductOffer[] = [];
	activatedOffers: ProductOffer[] = [];

	dialogResult = {type: 'openNewOffer', data: []};

	constructor(private appService: AppService,
							public dialogRef: MdDialogRef<OffersDialogComponent>) {

	}

	ngOnInit() {

		this.activity = this.appService.selectedTripActivity;
		this.offers = JSON.parse(JSON.stringify(this.appService.offers));

		if (this.activity.offers && this.activity.offers.data) {
			this.activatedOffers = JSON.parse(JSON.stringify(this.activity.offers.data));
		}

		this.removeOfferAlreadyInActivated();

	}

	removeOfferAlreadyInActivated() {

		if (this.activatedOffers.length) {
			for (let i = 0; i < this.activatedOffers.length; i++) {
				let indexNumber = this.findOfferIndex(this.activatedOffers[i], this.offers);
				if (indexNumber !== null) {
					// offer in active, so we need remove it from offer list
					this.offers.splice(indexNumber, 1);
				}
			}
		}
	}

	addOffer(offer: ProductOffer) {

		let indexNum = this.findOfferIndex(offer, this.offers);

		if (indexNum !== null) {
			this.offers.splice(indexNum, 1);
		}
		this.activatedOffers.push(offer);
	}

	removeOffer(offer: ProductOffer) {

		let indexNum = this.findOfferIndex(offer, this.activatedOffers);
		if (indexNum !== null) {
			this.activatedOffers.splice(indexNum, 1);
			this.offers.push(offer);
		}
	}

	findOfferIndex(offer, offers): number {

		if (offers.length) {
			for (let i = 0; i < offers.length; i++) {
				if (offer.id == offers[i].id) {
					return i;
				}
			}
		}
		return null;
	}

	openAddOffer() {

		this.dialogResult.type = "openNewOffer";
		this.dialogResult.type = null;
		this.dialogRef.close(this.dialogResult);
	}

	onSave() {
		this.dialogResult.type = "save";
		this.dialogResult.data = this.activatedOffers;

		this.dialogRef.close(this.dialogResult);
	}
}
