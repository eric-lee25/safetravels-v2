import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";
import {MdDialogRef} from "@angular/material";

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

	constructor(private appService: AppService,
							public dialogRef: MdDialogRef<ConfirmationDialogComponent>) {
	}

	config = {
		title: "",
		message: "",
		actionTitle: "OK",
		buttonClass: "btn-primary"
	};


	ngOnInit() {
		this.config = this.appService.confirmationDialogConfig;
	}

}
