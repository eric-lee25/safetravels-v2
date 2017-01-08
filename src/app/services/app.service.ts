import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Observable, Subject} from "rxjs";

@Injectable()
export class AppService {

	dialogTitle: string = "";
	sidebarProgressToggle: Subject<boolean> = new Subject<boolean>();
	sidebarToggle: Subject<boolean> = new Subject<boolean>();
	dialogTitleEvent: Subject<string> = new Subject<string>();

	confirmationDialogConfig = {
		title: "",
		message: "",
		actionTitle: "OK",
		buttonClass: "btn-primary"
	};
	confirmationDialogConfigEvent: Subject<any> = new Subject<any>();
	configStorage = {
		sidebarCollapsed: true
	};
	private serverURL: string = "/assets/data"; // change to your api server like http://domain.com/api

	private headers: Headers = new Headers(
		{
			'Content-Type': 'application/json'
		}
	);

	constructor(private http: Http) {

		let config = localStorage.getItem("configStorage");
		if (config) {
			this.configStorage = JSON.parse(config);
		}
		if (this.configStorage.sidebarCollapsed !== null) {
			this.sidebarToggle.next(this.configStorage.sidebarCollapsed);
		}

		this.sidebarToggle.subscribe(collapsed => {
			console.log(collapsed);

			this.configStorage.sidebarCollapsed = collapsed;
			localStorage.setItem('configStorage', JSON.stringify(this.configStorage));
		});


		this.dialogTitleEvent.subscribe(title => this.dialogTitle = title);

		this.confirmationDialogConfigEvent.subscribe(config => {
			this.confirmationDialogConfig = Object.assign(this.confirmationDialogConfig, config);
		});

	}


	getUrl(url: string): string {

		return this.serverURL + url;
	}

	getOptions(options: RequestOptionsArgs): RequestOptionsArgs {

		let op = {headers: this.headers};

		if (options) {
			return Object.assign(op, options);
		}

		return op;
	}

	get(endpoint: string, options?: RequestOptionsArgs): Observable<Response> {

		let url = this.getUrl(endpoint);

		let op = this.getOptions(options);

		return this.http.get(url, op);
	}

	/**
	 * Performs a request with `post` http method.
	 */
	post(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response> {

		let url = this.getUrl(endpoint);
		let op = this.getOptions(options);
		return this.http.post(url, body, op);
	}

	/**
	 * Performs a request with `put` http method.
	 */
	put(endpoint: string, body: any, options?: RequestOptionsArgs): Observable<Response> {

		let url = this.getUrl(endpoint);
		let op = this.getOptions(options);
		return this.http.put(url, body, op);
	}

	/**
	 * Performs a request with `delete` http method.
	 */
	delete(endpoint: string, options?: RequestOptionsArgs): Observable<Response> {

		let url = this.getUrl(endpoint);
		let op = this.getOptions(options);
		return this.http.delete(url, op);
	}

}
