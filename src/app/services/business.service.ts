import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BusinessAccount} from "../models/business-account.model";
import {AppService} from "./app.service";
import {BusinessUser} from "../models/business-user.model";

@Injectable()
export class BusinessService {

	constructor(private appService: AppService) {
	}


	getBusinessesOwner(): Observable<BusinessAccount[]> {

		return this.appService.get('/businesses?role=owner').map(res => res.json().data).catch(err => Observable.throw(err));

	}

	updateBusinessAccount(account: BusinessAccount): Observable<any> {

		return this.appService.put('/businesses/' + account.id, account).map(res => res.json()).catch(err => Observable.throw(err));
	}

	getAdministrators(businessId: number): Observable<BusinessUser[]> {

		return this.appService.get('/businesses/' + businessId + '/administrators').map(res => res.json().data).catch(err => Observable.throw(err));
	}

	getGuides(businessId: number): Observable<BusinessUser[]> {
		return this.appService.get('/businesses/' + businessId + '/guides').map(res => res.json().data).catch(err => Observable.throw(err));
	}

	createUser(businessId: number, user: BusinessUser): Observable<any> {

		if (user.user_type == 'administrators') {
			return this.appService.post('/businesses/' + businessId + '/administrators', user).map(res => res.json().data).catch(err => Observable.throw(err));
		}
		else {
			return this.appService.post('/businesses/' + businessId + '/guides', user).map(res => res.json().data).catch(err => Observable.throw(err));
		}
	}
}
