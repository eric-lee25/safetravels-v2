import {Injectable} from '@angular/core';
import {User} from "../models/user.model";
import {AppService} from "./app.service";
import {Observable} from "rxjs";
import {CookieService} from "angular2-cookie/services/cookies.service";

@Injectable()

export class AuthService {


	constructor(public appService: AppService, private cookieService: CookieService) {

		this.appService.onAuthChange$.subscribe(data => {
			this.appService.currentUser = data.user;
			this.appService.token = data.token;
		});


		this.appService.currentUser = this.getCurrentUser();
		this.appService.token = this.getToken();


		this.appService.userEvent.subscribe(user => {

			this.setCurrentUser(user);
		});

	}

	login(user: User): Observable<any> {

		let endpoint = '/authenticate?email=' + user.email + '&password=' + user.password;

		return this.appService.get(endpoint).map(res => res.json()).catch(err => Observable.throw(err));
	}

	register(user: User): Observable<any> {

		let endpoint = '/users/register';
		return this.appService.post(endpoint, user).map(res => res.json()).catch(err => Observable.throw(err));


	}

	forgotPassword(email: string): Observable<any> {

		let data = {email: email};
		return this.appService.post('/password/forgot', data).map(res => res).catch(err => Observable.throw(err));
	}


	setCurrentLoginData(data) {

		this.appService.currentUser = data.user;
		this.appService.token = data.token;

		this.appService.onAuthChange$.next(data);

		let user = data.user;
		let token = data.token;

		this.cookieService.putObject('currentUser', user);
		this.cookieService.put('currentUserToken', token);
	}


	setCurrentUser(user: User) {
		this.cookieService.putObject('currentUser', user);

	}

	getCurrentUser(): User {

		let user: any = this.cookieService.getObject('currentUser');


		if (user) {
			this.appService.currentUser = user
		} else {
			this.appService.currentUser = null;
		}

		return this.appService.currentUser;
	}

	getToken(): string {

		let token: string = this.cookieService.get('currentUserToken');

		return token;
	}
	signOut(){
		this.appService.currentBusinessAccount = null;
	}

}
