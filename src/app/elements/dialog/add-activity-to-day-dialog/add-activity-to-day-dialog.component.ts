import {Component, OnInit} from '@angular/core';

@Component({
	selector: 'app-add-activity-to-day-dialog',
	templateUrl: './add-activity-to-day-dialog.component.html',
	styleUrls: ['./add-activity-to-day-dialog.component.css']
})
export class AddActivityToDayDialogComponent implements OnInit {

	dateOptions = {
		inputValueRequired: true,
		selectionTxtFontSize: '13px',
		width: '100%',
		showInputField: true,
		dateFormat: 'yyyy-mm-dd',
		componentDisabled: false
	};
	multiLangContentCollapsed: boolean = true;

	constructor() {
	}

	ngOnInit() {
	}

	onSelectDate(event) {

	}

	toggleMultiLangContent() {
		this.multiLangContentCollapsed = !this.multiLangContentCollapsed;

	}
}
