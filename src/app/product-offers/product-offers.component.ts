import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {OfferService, OfferInfo} from "../services/offer.service";
import {DialogService} from "../services/dialog.service";
import {BusinessAccount} from "../models/business-account.model";
import {BusinessService} from "../services/business.service";
import {ProductOfferService} from "../services/product-offer.service";
import {ProductOffer} from "../models/product-offer.model";
import {NotificationService} from "../services/notification.service";
import {AppService} from "../services/app.service";


@Component({
	selector: 'app-product-offers',
	templateUrl: './product-offers.component.html',
	styleUrls: ['./product-offers.component.css'],
	providers: [OfferService]
})
export class ProductOffersComponent implements OnInit {


	OffersInfo: OfferInfo[];

	accounts: BusinessAccount[] = [];

	selectedAccount: BusinessAccount = new BusinessAccount();

	offers: ProductOffer[] = [];


	@ViewChild('childrenOfferTable') childrenOfferTable: ElementRef;

	tableCollapsed: boolean[] = [true, true];


	constructor(private appService: AppService,
							private offerService: OfferService,
							private businessService: BusinessService,
							private productOfferService: ProductOfferService,
							private notification: NotificationService,
							private dialogService: DialogService) {

		this.OffersInfo = this.offerService.getOffersInfo();

	}

	ngOnInit() {


		this.businessService.getBusinessesOwner().subscribe(res => {
			this.accounts = res;
			if (this.accounts.length) {
				this.selectedAccount = this.accounts[0];

				this.getOffer();
			}
		}, err => {
			console.log(err);
		});


	}


	onAccountChange(account: BusinessAccount) {

		this.getOffer();
	}

	getOffer() {

		this.productOfferService.getOffers(this.selectedAccount.id).subscribe(res => {

			this.offers = res;

		}, err => {

			console.log(err);
		});

	}

	showChildrenOfferTable(id: number) {

		if (this.tableCollapsed[id] == null) {
			this.tableCollapsed.push(true);
		} else {
			this.tableCollapsed[id] = !this.tableCollapsed[id];
		}


	}

	showAddProductOfferDialog() {

		let dialogRef = this.dialogService.openAddProductOfferDialog();

		dialogRef.afterClosed().subscribe(offer => {

			if (offer) {
				this.productOfferService.createOffer(this.selectedAccount.id, offer).subscribe(res => {

					this.notification.show("Offer has been created");
					this.offers.push(res);

				}, err => {
					this.notification.show(err.json().message, 'error');

				});
			}


		});
	}

	editOffer(offer: ProductOffer) {


		let editOffer = JSON.parse(JSON.stringify(offer));
		this.appService.productOfferEvent.next(editOffer);

		let dialogRef = this.dialogService.openAddProductOfferDialog();

		dialogRef.afterClosed().subscribe(offer => {
			if (offer) {
				this.appService.productOfferEvent.next(null);
				this.productOfferService.editOffer(offer).subscribe(res => {

					this.notification.show(res.title + ' has been updated.');
					let offerIndex = this.findIndexByOffer(offer);

					if (offerIndex) {
						this.offers[offerIndex] = res;
					}

				}, err => {
					this.notification.show(err.json().message, 'error');
				});
			}


		});


	}

	findIndexByOffer(offer: ProductOffer): number {

		for (let i = 0; i < this.offers.length; i++) {
			if (this.offers[i].id == offer.id) {
				return i;
			}
		}
		return null;
	}

	deleteOffer(offer: ProductOffer) {

		this.productOfferService.deleteOffer(offer).subscribe(res => {

			this.notification.show(offer.title + ' has been deleted.');
			let offerIndex = this.findIndexByOffer(offer.id);
			if (offerIndex !== null) {
				this.offers.splice(offerIndex, 1);
			}

		}, err => {
			this.notification.show(err.json().message, 'error');
		});
	}

}
