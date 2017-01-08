import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import {OfferService, OfferInfo} from "../services/offer.service";
import {DialogService} from "../services/dialog.service";


@Component({
	selector: 'app-product-offers',
	templateUrl: './product-offers.component.html',
	styleUrls: ['./product-offers.component.css'],
	providers: [OfferService]
})
export class ProductOffersComponent implements OnInit {


	OffersInfo: OfferInfo[];

	@ViewChild('childrenOfferTable') childrenOfferTable: ElementRef;

	tableCollapsed: boolean[] = [true, true];


	constructor(private offerService: OfferService,
							private dialogService: DialogService) {

		this.OffersInfo = this.offerService.getOffersInfo();

	}

	ngOnInit() {

	}


	showChildrenOfferTable(id: number) {

		if (this.tableCollapsed[id] == null) {
			this.tableCollapsed.push(true);
		} else {
			this.tableCollapsed[id] = !this.tableCollapsed[id];
		}


	}

	showAddProductOfferDialog() {
		this.dialogService.openAddProductOfferDialog();
	}

}
