import {Injectable} from '@angular/core';
import {ProductOffer} from "../models/product-offer.model";
import {AppService} from "./app.service";
import {Observable} from "rxjs";

@Injectable()
export class ProductOfferService {

	constructor(private appService: AppService) {
	}


	getOffers(businessId: number): Observable<ProductOffer[]> {

		return this.appService.get('/businesses/' + businessId + '/offers').map(res => res.json().data).catch(err => Observable.throw(err));

	}

	createOffer(businessId: number, offer: ProductOffer): Observable<ProductOffer> {

		return this.appService.post('/businesses/' + businessId + '/offers', offer).map(res => res.json().data).catch(err => Observable.throw(err));
	}

	editOffer(offer: ProductOffer): Observable<ProductOffer> {

		return this.appService.put('/offers/' + offer.id, offer).map(res => res.json().data).catch(err => Observable.throw(err));
	}

	deleteOffer(offer: ProductOffer): Observable<any> {

		return this.appService.delete('/offers/' + offer.id).map(res => res.json()).catch(err => Observable.throw(err));
	}

}
