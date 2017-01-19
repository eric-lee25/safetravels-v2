import {Injectable} from '@angular/core';
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {Trip} from "../models/trip.model";

@Injectable()
export class TripService {

	constructor(private appService: AppService) {

	}


	listTrips(): Observable<Trip[]> {
		return this.appService.get('/trips?role=user').map(res => res.json().data).catch(err => Observable.throw(err))

	}

	get(id: number, include?: string): Observable<Trip> {

		let endpoint = '/trips/' + id;
		if (include) {
			endpoint = '/trips/' + id + '?include=' + include;
		}
		return this.appService.get(endpoint).map(res => res.json().data).catch(err => Observable.throw(err));
	}

}
