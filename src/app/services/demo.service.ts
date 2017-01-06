import {Injectable} from '@angular/core';
import {AppService} from "./app.service";
import {Observable} from "rxjs";

@Injectable()
export class DemoService {

	constructor(private api: AppService) {

	}

	getTrips(): Observable<any> {
		return this.api.get('/trips.json').map(res => res.json()).catch(err => Observable.throw(err));

	}

}
