import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Observable, Subject} from "rxjs";
import {User} from "../models/user.model";
import {DropzoneConfigInterface} from "angular2-dropzone-wrapper";
import {Trip} from "../models/trip.model";
import {ProductOffer} from "../models/product-offer.model";
import {TripActivity} from "../models/trip-activity.model";
import {ActivityType} from "../models/activity-type.model";
import {Country} from "../models/country.model";
import {BusinessAccount} from "../models/business-account.model";

@Injectable()
export class AppService {

	dialogTitle: string = "";
	sidebarProgressToggle: Subject<boolean> = new Subject<boolean>();
	sidebarToggle: Subject<boolean> = new Subject<boolean>();
	dialogTitleEvent: Subject<string> = new Subject<string>();
	onAuthChange$: Subject<any> = new Subject<any>();


	public currentUser: User = null;
	public token: string = "";

	userEvent: Subject<User> = new Subject<User>();

	confirmationDialogConfig = {
		title: "",
		message: "",
		actionTitle: "OK",
		buttonClass: "btn-primary"
	};
	confirmationDialogConfigEvent: Subject<any> = new Subject<any>();


	messageDialogConfig = {
		title: "",
		message: "",
	};

	messageDialogEvent: Subject<any> = new Subject<any>();

	configStorage = {
		sidebarCollapsed: true
	};

	notification: any = {
		message: '',
		type: 'success'
	};

	notificationEvent: Subject<any> = new Subject<any>();

	public showLandingPage: boolean = false;
	showLandingPageEvent: Subject<boolean> = new Subject<boolean>();

	public serverURL: string = "https://newapi.safetravels.com"; // change to your api server like http://domain.com/api


	private headers: Headers = new Headers(
		{
			'Content-Type': 'application/json'
		}
	);

	uploadConfig: DropzoneConfigInterface = {
		server: this.serverURL + '/me/avatar',
		maxFilesize: 50,
		acceptedFiles: 'image/*',
		headers: {"Authorization": "bearer " + this.token}
	};

	uploadConfigEvent: Subject<DropzoneConfigInterface> = new Subject<DropzoneConfigInterface>();

	selectedTrip: Trip = new Trip();
	selectedTripEvent: Subject<Trip> = new Subject<Trip>();
	selectedTripActivity: TripActivity = new TripActivity();
	selectedTripActivityEvent: Subject<TripActivity> = new Subject<TripActivity>();
	offers: ProductOffer[] = [];
	offersEvent: Subject<ProductOffer[]> = new Subject<ProductOffer[]>();

	productOffer: ProductOffer = new ProductOffer();
	productOfferEvent: Subject<ProductOffer> = new Subject<ProductOffer>();

	activityTypes: ActivityType[] = [];
	activityTypesEvent: Subject<ActivityType[]> = new Subject<ActivityType[]>();
	countries: Country[] = [];
	countriesEvent: Subject<Country[]> = new Subject<Country[]>();

	currentBusinessAccount: BusinessAccount;
	currentBusinessAccount$: Subject<BusinessAccount> = new Subject<BusinessAccount>();
	businessAccounts: BusinessAccount[] = [];
	businessAccounts$: Subject<BusinessAccount[]> = new Subject<BusinessAccount[]>();


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


		this.messageDialogEvent.subscribe(config => {
			this.messageDialogConfig = Object.assign(this.messageDialogConfig, config);

		});

		this.showLandingPageEvent.subscribe(value => this.showLandingPage = value);


		this.onAuthChange$.subscribe(data => {

			let tokenKey = data.token;

			this.token = tokenKey;

			this.currentUser = data.user;

			this.userEvent.next(this.currentUser);

			if (tokenKey) {
				this.headers.set("Authorization", "bearer " + tokenKey);
				this.uploadConfig.headers = {"Authorization": "bearer " + tokenKey};
			} else {
				this.headers.delete("Authorization");
			}


		});


		// upload event

		this.uploadConfigEvent.subscribe(config => {

			this.uploadConfig.headers = this.uploadConfig.headers = {"Authorization": "bearer " + this.token};

			this.uploadConfig = Object.assign(this.uploadConfig, config);
		});


		this.notificationEvent.subscribe(notification => this.notification = Object.assign(this.notification, notification));

		// select trip event

		this.selectedTripEvent.subscribe(trip => this.selectedTrip = trip);
		this.productOfferEvent.subscribe(offer => this.productOffer = offer);
		this.selectedTripActivityEvent.subscribe(activity => this.selectedTripActivity = activity);

		this.activityTypesEvent.subscribe(types => this.activityTypes = types);
		this.countriesEvent.subscribe(countries => this.countries = countries);

		this.offersEvent.subscribe(offers => this.offers = offers);
		this.currentBusinessAccount$.subscribe(account => this.currentBusinessAccount = account);

		this.userEvent.subscribe(user => {

			this.currentUser = user;

			if (user) {
				this.getBusinessAccounts();
			}
		});

	}


	getBusinessAccounts() {

		this.getBusinessAccountsData().subscribe(accounts => {

			this.businessAccounts = accounts;
			this.businessAccounts$.next(accounts);
			if (this.businessAccounts.length && !this.currentBusinessAccount) {
				this.currentBusinessAccount = this.businessAccounts[0];
				this.currentBusinessAccount$.next(this.currentBusinessAccount);
			}


		}, err => {
			console.log(err);
		});


	}

	getBusinessAccountsData(): Observable<BusinessAccount[]> {
		return this.get('/businesses?role=owner').map(res => res.json().data).catch(err => Observable.throw(err));
	}

	getUrl(url: string): string {

		return this.serverURL + url;
	}

	getOptions(options: RequestOptionsArgs): RequestOptionsArgs {

		let op = {headers: this.headers};


		if (this.token) {
			op.headers.set("Authorization", "bearer " + this.token);
		} else {
			op.headers.delete("Authorization");
		}


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
