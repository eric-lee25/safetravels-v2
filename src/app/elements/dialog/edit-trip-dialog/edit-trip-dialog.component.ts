import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-edit-trip-dialog',
	templateUrl: './edit-trip-dialog.component.html',
	styleUrls: ['./edit-trip-dialog.component.css']
})
export class EditTripDialogComponent implements OnInit {

	constructor() {
	}

	ngOnInit() {
	}

	dateOptions = {inputValueRequired: true, selectionTxtFontSize: '13px',width: '100%', showInputField: true, dateFormat: 'yyyy-mm-dd', componentDisabled: false};


	onSelectDate(event) {

	}

}
