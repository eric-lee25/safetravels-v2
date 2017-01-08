import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-add-staff-user-dialog',
	templateUrl: './add-staff-user-dialog.component.html',
	styleUrls: ['./add-staff-user-dialog.component.css']
})
export class AddStaffUserDialogComponent implements OnInit {

	constructor() {
	}


	userTypes = [
		{
			value: 0,
			title: 'Super User'
		},
		{
			title: 'Admin User',
			value: 1
		},
		{
			title: 'Tour Guide',
			value: 2
		},
	];

	ngOnInit() {
	}

}
