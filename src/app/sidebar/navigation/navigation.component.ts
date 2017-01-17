import {Component, OnInit, Input} from '@angular/core';
import {User} from "../../models/user.model";

@Component({
	selector: 'app-navigation',
	templateUrl: './navigation.component.html',
	styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
	@Input() sidebarCollapsed: boolean;
	@Input() user: User;

	constructor() {

	}

	ngOnInit() {

	}


}
