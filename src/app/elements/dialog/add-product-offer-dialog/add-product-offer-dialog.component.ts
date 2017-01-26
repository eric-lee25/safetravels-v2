import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";
import {MdDialogRef} from "@angular/material";
import {ProductOffer} from "../../../models/product-offer.model";

@Component({
	selector: 'app-add-product-offer-dialog',
	templateUrl: './add-product-offer-dialog.component.html',
	styleUrls: ['./add-product-offer-dialog.component.css']
})
export class AddProductOfferDialogComponent implements OnInit {

	offer = new ProductOffer();


	constructor(private appService: AppService,
							public dialogRef: MdDialogRef<AddProductOfferDialogComponent>) {
	}


	ngOnInit() {

	}


	onSave() {

		this.dialogRef.close(this.offer);

	}
}
