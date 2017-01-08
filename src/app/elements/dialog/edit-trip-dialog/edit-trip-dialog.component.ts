import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";

@Component({
	selector: 'app-edit-trip-dialog',
	templateUrl: './edit-trip-dialog.component.html',
	styleUrls: ['./edit-trip-dialog.component.css']
})
export class EditTripDialogComponent implements OnInit {

	title: string = "Multi Language activity debug";


	constructor(private appService: AppService) {

		this.title = this.appService.dialogTitle;
	}

	ngOnInit() {
	}

	dateOptions = {
		inputValueRequired: true,
		selectionTxtFontSize: '13px',
		width: '100%',
		showInputField: true,
		dateFormat: 'yyyy-mm-dd',
		componentDisabled: false
	};


	onSelectDate(event) {

	}

}
