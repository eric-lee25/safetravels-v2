import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";

@Component({
	selector: 'app-business-users',
	templateUrl: './business-users.component.html',
	styleUrls: ['./business-users.component.css']
})
export class BusinessUsersComponent implements OnInit {

	constructor(private dialogService: DialogService) {
	}

	ngOnInit() {

	}

	showAddStaffUserDialog() {
		this.dialogService.openAddStaffUserDialog();

	}
}