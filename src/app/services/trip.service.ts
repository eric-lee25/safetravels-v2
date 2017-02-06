import {Injectable} from '@angular/core';
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {Trip} from "../models/trip.model";
import {TripActivity} from "../models/trip-activity.model";
import {TripDocument} from "../models/trip-document.model";
import {ActivityType} from "../models/activity-type.model";

@Injectable()
export class TripService {

	constructor(private appService: AppService) {

	}


	create(trip: Trip): Observable<Trip> {
		return this.appService.post('/businesses/' + trip.business_id + '/trips', trip).map(res => res.json().data).catch(err => Observable.throw(err));

	}

	upcomingTrips(): Observable<Trip[]> {

		return this.appService.get('/trips/upcoming').map(res => this.formatTrips(res.json().data)).catch(err => Observable.throw(err))
	}

	listTrips(include?: string): Observable<Trip[]> {
		let endpoint = '/trips?role=user';
		if (include) {
			endpoint = '/trips?role=user&include=' + include;
		}
		return this.appService.get(endpoint).map(res => this.formatTrips(res.json().data)).catch(err => Observable.throw(err))

	}

	get(id: number, include?: string): Observable<Trip> {

		let endpoint = '/trips/' + id;
		if (include) {
			endpoint = '/trips/' + id + '?include=' + include;
		}
		return this.appService.get(endpoint).map(res => res.json().data).catch(err => Observable.throw(err));
	}

	getTripPassengers(id: number): Observable<any> {

		let endpoint = '/trips/' + id + '/users/undeleted';
		return this.appService.get(endpoint).map(res => res.json().data).catch(err => Observable.throw(err));
	}


	getTripGroupDocuments(id: number): Observable<TripDocument[]> {

		let endpoint = '/trips/' + id + '/documents';
		return this.appService.get(endpoint).map(res => res.json().data).catch(err => Observable.throw(err));
	}

	formatTrips(trips: Trip[]): Trip[] {


		for (let x = 0; x < trips.length; x++) {

			if (trips[x].admin && trips[x].admin.data) {
				trips[x].admin = trips[x].admin.data;
			}
			if (trips[x].guide && trips[x].guide.data) {
				trips[x].guide = trips[x].admin.data;
			}

		}

		return trips;

	}

	update(trip: Trip): Observable<any> {
		let endpoint = '/trips/' + trip.id;
		return this.appService.put(endpoint, trip).map(res => res.json().data).catch(err => Observable.throw(err));
	}


	getActivities(tripId: number): Observable<TripActivity[]> {

		return this.appService.get('/trips/' + tripId + '/activities').map(res => res.json().data).catch(err => Observable.throw(err));
	}
	createActivity(tripId: number, activity: TripActivity): Observable<TripActivity>{
		return this.appService.post('/trips/' + tripId + '/activities', activity).map(res => res.json().data).catch(err => Observable.throw(err));
	}

	getActivityTypes(): Observable<ActivityType[]> {
		return this.appService.get('/activities/types').map(res => res.json().data).catch(err => Observable.throw(err));
	}
}
