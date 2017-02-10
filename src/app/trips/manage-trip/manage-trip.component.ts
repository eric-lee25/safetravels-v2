import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {Trip} from "../../models/trip.model";
import {TripService} from "../../services/trip.service";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../services/app.service";
import {NotificationService} from "../../services/notification.service";
import {TripPassenger} from "../../models/trip-passenger.model";
import {UploadImageDialogComponent} from "../../elements/dialog/upload-image-dialog/upload-image-dialog.component";
import {DropzoneConfigInterface} from "angular2-dropzone-wrapper";
import {MdDialog} from "@angular/material";
import {AuthService} from "../../services/auth.service";
import {DatePipe} from "@angular/common";
import {TripActivityDayGroup} from "../../models/activity-day-group.model";
import {TripActivity} from "../../models/trip-activity.model";
import {TripDocument} from "../../models/trip-document.model";
import {ProductOffer} from "../../models/product-offer.model";
import {ProductOfferService} from "../../services/product-offer.service";
import {TripMessage} from "../../models/trip-message.model";
import {MessageTemplate} from "../../services/message-template.model";
import {MessageService} from "../../services/message.service";

@Component({
	selector: 'app-manage-trip',
	templateUrl: './manage-trip.component.html',
	styleUrls: ['./manage-trip.component.css'],
	providers: [DatePipe]
})
export class ManageTripComponent implements OnInit {

	trip: Trip = new Trip();
	passengers: TripPassenger[] = [];
	groupDocuments: TripDocument[] = [];

	selectedUserDocuments: TripDocument[] = [];
	selectedPassenger: TripPassenger = null;
	activities: TripActivity[] = [];
	activityDays: TripActivityDayGroup[] = [];
	selectedActivityDay: TripActivityDayGroup = new TripActivityDayGroup();
	offers: ProductOffer[] = [];
	messageTemplates: MessageTemplate[] = [];


	constructor(private route: ActivatedRoute,
							private datePipe: DatePipe,
							private tripService: TripService,
							private messageService: MessageService,
							private notificationService: NotificationService,
							private appService: AppService,
							private dialog: MdDialog,
							private auth: AuthService,
							private dialogService: DialogService,
							private productOfferService: ProductOfferService) {

	}

	messageAdvanced: boolean = false;
	tabConversationHistoryOpen: boolean = true;
	tabConversationScheduleOpen: boolean = false;


	onSelectActivityDayGroup(value: TripActivityDayGroup) {
		this.selectedActivityDay = value;
	}

	ngOnInit() {

		let tripId = this.route.snapshot.params['id'];
		this.tripService.get(tripId, 'admin,guide').subscribe(res => {

			this.trip = res;
			this.productOfferService.getOffers(this.trip.business_id).subscribe(offers => this.offers = offers, err => {
					console.log(err);
				}
			);
			if (res.admin) {
				this.trip.admin = res.admin.data;
			}
			if (res.guide) {
				this.trip.guide = res.guide.data;
			}
			if (res.coverImages.data && res.coverImages.data.length) {
				this.trip.cover_image = res.coverImages.data[0].url;
			}


			this.getMessageTemplates();
			console.log("trip", this.trip);
		}, err => {

			console.log(err);
		});


		this.tripService.getTripPassengers(tripId).subscribe(res => {

			this.passengers = res as TripPassenger[];
		}, err => {
			console.log('passengers error', err);
		});


		// get trips activities
		this.tripService.getActivities(tripId).subscribe(res => {
			this.activities = res;
			this.formatActivities(true);

			console.log(this.activityDays);


		}, err => {
			console.log(err);
		});

		this.tripService.getTripGroupDocuments(tripId).subscribe(res => {

			this.groupDocuments = res;
		}, err => {
			console.log(err);
		});

	}

	getMessageTemplates() {

		this.messageService.getMessageTemplates(this.trip.business_id).subscribe(res => {
			console.log(res);
			this.messageTemplates = res;
		}, err => {
			console.log(err);
		});
	}

	formatActivities(reselect?: boolean) {

		this.activityDays = this.getDayGroupFromActivities(this.activities);

		if (this.activityDays.length && reselect) {
			this.selectedActivityDay = this.activityDays[0];
		}
	}

	getDayGroupFromActivities(activities: TripActivity[]): TripActivityDayGroup[] {

		let days: TripActivityDayGroup[] = [];

		activities.forEach(item => {
			let day = this.datePipe.transform(item.start, 'yyyy-MM-dd');

			//console.log(this.datePipe.transform(item.start, 'yyyy-MM-dd'));

			let indexValue = this.checkDayIsInGroup(day, days);
			if (indexValue !== null) {
				// that mean this activity same day with existing day group
				days[indexValue].activities.push(item);

			} else {

				// let create new group
				let newDayGroup = new TripActivityDayGroup();
				newDayGroup.title = 'Day ' + (days.length + 1);
				newDayGroup.day = day;
				newDayGroup.date = item.start;
				newDayGroup.activities = [];
				newDayGroup.activities.push(item);

				days.push(newDayGroup);
			}

		});

		return days;

	}

	checkDayIsInGroup(day: string, days: TripActivityDayGroup[]): number {

		if (days.length) {
			for (let i = 0; i < days.length; i++) {
				if (days[i].day == day) {

					return i;
				}
			}
		}

		return null;
	}

	onSelectTripPassenger(passenger?: TripPassenger) {
		if (passenger) {
			this.selectedPassenger = passenger;
		} else {

			this.selectedPassenger = null;
		}

	}

	getBackground(url: string): string {
		if (url && url !== null) {
			return 'url(' + url + ')'
		}

		return 'none';
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

		let config: DropzoneConfigInterface = {
			server: this.appService.serverURL + '/trips/' + this.trip.id + '/cover',
			headers: {"Authorization": "bearer " + this.auth.getToken()},
			paramName: 'image',
			uploadMultiple: false
		};

		this.appService.uploadConfigEvent.next(config);

		this.appService.dialogTitleEvent.next("Upload Tour Cover Image");
		let dialogRef = this.dialog.open(UploadImageDialogComponent);

		dialogRef.afterClosed().subscribe(event => {


			if (event && typeof event[1] !== "undefined") {
				this.trip.cover_image = event[1].data.url;
			}


		});

	}

	showUploadDocumentDialog(user: TripPassenger) {
		let config: DropzoneConfigInterface = {
			server: this.appService.serverURL + '/trips/' + this.trip.id + '/documents',
			headers: {"Authorization": "bearer " + this.auth.getToken()},
			paramName: 'file',
			uploadMultiple: false,
			acceptedFiles: 'image/*,application/pdf,.txt,.doc,.docx'
		};

		this.appService.uploadConfigEvent.next(config);

		this.appService.dialogTitleEvent.next("Upload document");
		let dialogRef = this.dialog.open(UploadImageDialogComponent);

		dialogRef.afterClosed().subscribe(event => {


			if (event && typeof event[1] !== "undefined") {
				this.trip.cover_image = event[1].data.url;
			}


		});
	}

	deleteTripConfirmation() {

		let title = "Are you sure you want to delete Multi Language activity debug?";
		let msg = "Deleting the trip will delete all information that you have added to the Trip. Trip Members that have been added to the trip already will no longer be able to access the trip on the mobile app.";
		let buttonTitle = "Delete Trip";
		let buttonClass = "btn-danger";

		this.dialogService.openConfirmationDialog(title, msg, buttonTitle, buttonClass);
	}

	openDeleteDayConfirmation() {
		let title = "Are you sure you want to delete Day 1?";
		let msg = "Deleting the Day Item will delete all information that you have added to the Day, including all Activities and associated Product Offers within the Day.";
		let buttonTitle = "Delete Day";
		let buttonClass = "btn-danger";

		let dialogRef = this.dialogService.openConfirmationDialog(title, msg, buttonTitle, buttonClass);

		dialogRef.afterClosed().subscribe(action => {

			console.log("Action:", action);
			if (action == "ok") {
				// let delete the activity here...
			}
		});

	}

	findActivityIndex(activity: TripActivity): number {

		if (this.activities.length) {
			for (let i = 0; i < this.activities.length; i++) {
				if (this.activities[i].id == activity.id) {
					return i;
				}
			}
		}
		return null;
	}

	openDeleteActivityConfirmation(activity: TripActivity) {

		this.appService.selectedTripActivityEvent.next(activity);

		let title = "Delete Activity Confirmation";
		let msg = "Are you sure you want to delete this activity?";
		let buttonTitle = "Delete Activity";
		let buttonClass = "btn-danger";

		let dialogRef = this.dialogService.openConfirmationDialog(title, msg, buttonTitle, buttonClass);
		let that = this;

		dialogRef.afterClosed().subscribe(action => {

			console.log("Action:", action);
			if (action == "ok") {
				// let delete the activity here...
				this.tripService.deleteActivity(activity).subscribe(res => {

					let activityIndex = this.findActivityIndex(activity);
					if (activityIndex !== null) {
						that.activities.splice(activityIndex, 1);
						that.formatActivities();
					}
				}, err => {

					this.notificationService.show(err.json().message);
				});
			}
		});

	}

	openAddPassengerDialog() {

		this.appService.selectedTripEvent.next(this.trip);

		let dialogRef = this.dialogService.openAddPassengerDialog();


		dialogRef.afterClosed().subscribe(action => {
			console.log("Action:", action);
		});

	}

	showEditActivityDialog(activity: TripActivity) {

		this.appService.selectedTripActivityEvent.next(activity);
		let ref = this.dialogService.openAddActivityToDayDialog();

		ref.afterClosed().subscribe(activity => {
			console.log("After edit", activity);
			this.appService.selectedTripActivityEvent.next(null);
		});

	}

	showEditTripDialog() {

		this.appService.selectedTripEvent.next(this.trip);

		let dialogRef = this.dialogService.openEditTripDialog();

		dialogRef.afterClosed().subscribe(trip => {

			console.log('trip after edited:', trip);

			if (trip) {

				this.tripService.update(trip).subscribe(() => {
				}, err => {
					console.log(err);

					this.notificationService.show(err.json().message, 'error');
				});

			}
		});
	}

	openAddDayToTripDialog() {

		this.dialogService.openAddDayToTripDialog();
	}

	openAddActivityToDayDialog() {
		this.appService.selectedTripEvent.next(this.trip);

		let ref = this.dialogService.openAddActivityToDayDialog();
		ref.afterClosed().subscribe(activity => {
			if (activity) {
				this.activities.push(activity);
				this.formatActivities();

				console.log("Activity:", activity);

			}
		});
	}

	openOffersDialog(activity: TripActivity) {

		this.appService.selectedTripActivityEvent.next(activity);
		this.appService.offersEvent.next(this.offers);

		let dialogRef = this.dialogService.openOffersDialog();

		dialogRef.afterClosed().subscribe(result => {

			this.appService.selectedTripActivityEvent.next(null);

			console.log("Result:", result);

			if (result && result.type == 'openNewOffer') {
				// let open new product offer modal
				let ref = this.dialogService.openAddProductOfferDialog();

				let that = this;
				ref.afterClosed().subscribe(offer => {
					this.productOfferService.createOffer(this.trip.business_id, offer).subscribe(res => {
						that.offers.push(res);
						that.openOffersDialog(activity);
					}, err => {
						this.notificationService.show("An error adding offer", 'error');
						console.log(err);
					});

				});
			}
			if (result && result.type == 'save') {

				// do insert
				if (result.data && result.data.length) {
					for (let i = 0; i < result.data.length; i++) {
						let offer = result.data[i];
						this.tripService.attachOfferToActivity(activity.id, offer.id).subscribe(res => {

							//
							console.log(res);

						}, err => {
							console.log(err);
						});
					}
				}
				// do remove

				let offersNeedRemove = this.findOfferItemsNeedRemove(activity, result.data);

				let offerIds = [];
				if (offersNeedRemove.length) {
					for (let i = 0; i < offersNeedRemove.length; i++) {
						offerIds.push(offersNeedRemove[i].id);
					}
				}
				if (offerIds) {
					this.tripService.removeOfferFromActivity(activity.id, offerIds).subscribe(res => {
					}, err => {
						console.log(err);
					})
				}
				activity.offers.data = result.data;

			}

		});
	}

	findOfferItemsNeedRemove(activity: TripActivity, activatedOffers: ProductOffer[]): ProductOffer[] {

		let offers: ProductOffer[] = [];

		if (activity.offers && activity.offers.data) {
			let oldOffers = activity.offers.data;
			if (activatedOffers.length == 0) {
				return oldOffers;
			} else {

				for (let i = 0; i < oldOffers.length; i++) {
					let checkOffer = this.findOfferIsExist(oldOffers[i], activatedOffers);
					if (checkOffer) {
						// offer is exist. so we dont need remove
					} else {
						offers.push(oldOffers[i]);
					}
				}
			}
		}
		return offers;
	}


	findOfferIsExist(offer: ProductOffer, offers: ProductOffer[]): boolean {

		for (let i = 0; i < offers.length; i++) {
			if (offers[i].id == offer.id) {
				return true;
			}
		}
		return false;
	}

	removeOfferFromActivity(activity: TripActivity, offer: ProductOffer) {

		for (let i = 0; i < activity.offers.data.length; i++) {
			if (offer.id == activity.offers.data[i].id) {
				activity.offers.data.splice(i, 1);

			}
		}


		this.tripService.removeOfferFromActivity(activity.id, [offer.id]).subscribe(res => {

//
		}, err => {

			console.log(err);
		});

	}

	findPassengerIndex(user: TripPassenger, users: TripPassenger[]): number {
		if (users.length) {
			for (let i = 0; i < users.length; i++) {
				if (users[i].id == user.id) {
					return i;
				}
			}
		}
		return null;
	}

	removeTripUser(user: TripPassenger) {

		this.tripService.removeTripPassenger(this.trip.id, user.id).subscribe(res => {
			let userIndex = this.findPassengerIndex(user, this.passengers);
			if (userIndex !== null) {
				this.passengers.splice(userIndex, 1);
			}

		}, err => {

			console.log(err);
			this.notificationService.show("An error to remove trip passsenger", 'error');
		})
	}

}
