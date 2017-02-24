import {Component, OnInit} from '@angular/core';
import {AppService} from "./services/app.service";
import {User} from "./models/user.model";
import {AuthService} from "./services/auth.service";
import {Router} from "@angular/router";
import {BusinessService} from "./services/business.service";
import {BusinessAccount} from "./models/business-account.model";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	title = 'app works!';


	sidebarCollapsed: boolean = true;
	showLandingPage: boolean = this.appService.showLandingPage;

	user: User = null;
	businessAccounts: BusinessAccount[] = [];
	currentBusinessAccount: BusinessAccount = new BusinessAccount();

	constructor(public appService: AppService, private auth: AuthService, private router: Router, private businessService: BusinessService) {

		this.appService.sidebarToggle.subscribe(collapsed => this.sidebarCollapsed = collapsed);
		this.sidebarCollapsed = this.appService.configStorage.sidebarCollapsed;

		this.appService.showLandingPageEvent.subscribe(value => this.showLandingPage = value);


		this.user = auth.getCurrentUser();

		this.appService.userEvent.subscribe(user => this.user = user);

		this.appService.onAuthChange$.subscribe(data => {

			if (data.user == null) {
				this.showLogin();
			}
		});


	}

	onChangeBusinessAccount(account: BusinessAccount) {
		this.currentBusinessAccount = account;
		this.appService.currentBusinessAccount$.next(account);
	}

	/**
	 * Toogle sidebar left
	 * @param toggle
	 */
	toggleSidebar(toggle: boolean) {
		this.appService.sidebarToggle.next(toggle);
	}

	ngOnInit() {

		if (this.user == null) {
			this.showLogin();
		}

		let currentBusinessAccount = this.appService.currentBusinessAccount;

		this.businessService.getBusinessesOwner().subscribe(res => {

			this.businessAccounts = res;
			if (this.businessAccounts.length) {
				if (!currentBusinessAccount) {
					this.currentBusinessAccount = this.businessAccounts[0];
					this.appService.currentBusinessAccount$.next(this.currentBusinessAccount);
				}

			}
		}, err => {
			console.log(err);
		});

		this.appService.currentBusinessAccount$.subscribe(account => {
			if (account) {
				this.currentBusinessAccount = account;
			}
		});


	}

	showLogin() {
		this.router.navigate(['/login']);
	}
}
