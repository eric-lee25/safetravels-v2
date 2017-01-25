import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Http} from "@angular/http";

@Injectable()
export class LocationService {


	locationApiUrl = 'https://www.rome2rio.com/api/1.2';

	constructor(private http: Http) {
	}

	search(q: string): Observable<any> {

		let endpoint = this.locationApiUrl + '/json/Autocomplete?key=FnnpeP20&query=' + q;
		return this.http.get(endpoint).map((res: any) => {
			return res.json().places;

		}).catch(err => Observable.throw(err));
	}


}
