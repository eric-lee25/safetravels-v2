import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
@Component({
	selector: 'app-manage-trip',
	templateUrl: './manage-trip.component.html',
	styleUrls: ['./manage-trip.component.css']
})
export class ManageTripComponent implements OnInit {

	constructor(private dialogService: DialogService) {
	}

	messageAdvanced: boolean = false;
	tabConversationHistoryOpen: boolean = true;
	tabConversationScheduleOpen: boolean = false;


	ngOnInit() {

	}


	openTripTokenDialog() {

		this.dialogService.openTripTokenDialog();
	}

	onMessageOptionChange(event) {

		this.messageAdvanced = event.checked;

	}

	showTabConverationHistory() {
		this.tabConversationScheduleOpen = false;
		this.tabConversationHistoryOpen = true;

	}

	showTabConverationSchedule() {

		this.tabConversationHistoryOpen = false;
		this.tabConversationScheduleOpen = true;

	}

	showAddCoverDialog() {
		this.dialogService.openImageUploadDialog("Upload tour cover image");
	}

	deleteTripConfirmation() {

		let title = "Are you sure you want to delete Multi Language activity debug?";
		let msg = "Deleting the trip will delete all information that you have added to the Trip. Trip Members that have been added to the trip already will no longer be able to access the trip on the mobile app.";
		let buttonTitle = "Delete Trip";
		let buttonClass = "btn-danger";

		this.dialogService.openConfirmationDialog(title, msg, buttonTitle, buttonClass);
	}

	openDeleteActivityConfirmation(){
		let title = "Are you sure you want to delete Day 1?";
		let msg = "Deleting the Day Item will delete all information that you have added to the Day, including all Activities and associated Product Offers within the Day.";
		let buttonTitle = "Delete Day";
		let buttonClass = "btn-danger";

		this.dialogService.openConfirmationDialog(title, msg, buttonTitle, buttonClass);

	}

	showEditTripDialog() {

		this.dialogService.openEditTripDialog();
	}

	openAddDayToTripDialog() {

		this.dialogService.openAddDayToTripDialog();
	}

	openAddActivityToDayDialog(){
		this.dialogService.openAddActivityToDayDialog();
	}
}
