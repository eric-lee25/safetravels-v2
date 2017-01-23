import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {BusinessAccount} from "../models/business-account.model";
import {AppService} from "./app.service";

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

}
