import {Component, OnInit} from '@angular/core';
import {MdDialogRef} from "@angular/material";
import {BusinessUser} from "../../../models/business-user.model";

@Component({
	selector: 'app-add-staff-user-dialog',
	templateUrl: './add-staff-user-dialog.component.html',
	styleUrls: ['./add-staff-user-dialog.component.css']
})
export class AddStaffUserDialogComponent implements OnInit {


	newUser: BusinessUser = new BusinessUser();

	constructor(public dialogRef: MdDialogRef<AddStaffUserDialogComponent>) {

	}


	userTypes = [
		{
			value: 'admin',
			title: 'Admin'
		},
		{
			title: 'Tour Guide',
			value: 'guide'
		},
	];

	ngOnInit() {
	}


	onSave() {
		this.dialogRef.close(this.newUser);
	}
}
