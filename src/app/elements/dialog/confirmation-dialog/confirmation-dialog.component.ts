import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";

@Component({
	selector: 'app-confirmation-dialog',
	templateUrl: './confirmation-dialog.component.html',
	styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {

	constructor(private appService: AppService) {
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
