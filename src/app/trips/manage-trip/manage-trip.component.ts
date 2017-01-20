import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";
import {Trip} from "../../models/trip.model";
import {TripService} from "../../services/trip.service";
import {ActivatedRoute} from "@angular/router";
import {AppService} from "../../services/app.service";
import {NotificationService} from "../../services/notification.service";
@Component({
  selector: 'app-manage-trip',
  templateUrl: './manage-trip.component.html',
  styleUrls: ['./manage-trip.component.css']
})
export class ManageTripComponent implements OnInit {

  trip: Trip = new Trip();


  constructor(private route: ActivatedRoute,
              private tripService: TripService,
              private notificationService: NotificationService,
              private appService: AppService,
              private dialogService: DialogService) {

  }

  messageAdvanced: boolean = false;
  tabConversationHistoryOpen: boolean = true;
  tabConversationScheduleOpen: boolean = false;


  ngOnInit() {

    let tripId = this.route.snapshot.params['id'];
    this.tripService.get(tripId, 'admin,guide').subscribe(res => {

      this.trip = res;
      if (res.admin) {
        this.trip.admin = res.admin.data;
      }
      if (res.guide) {
        this.trip.guide = res.guide.data;
      }


      console.log("trip", this.trip);
    }, err => {

      console.log(err);
    });


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
    this.dialogService.openImageUploadDialog("Upload tour cover image");
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

  openDeleteActivityConfirmation() {
    let title = "Delete Activity Confirmation";
    let msg = "Are you sure you want to delete this activity?";
    let buttonTitle = "Delete Activity";
    let buttonClass = "btn-danger";

    let dialogRef = this.dialogService.openConfirmationDialog(title, msg, buttonTitle, buttonClass);

    dialogRef.afterClosed().subscribe(action => {

      console.log("Action:", action);
      if (action == "ok") {
        // let delete the activity here...
      }
    });

  }

  openAddPassengerDialog() {
    let dialogRef = this.dialogService.openAddPassengerDialog();


    dialogRef.afterClosed().subscribe(action => {
      console.log("Action:", action);
    });

  }

  showEditActivityOfferDialog() {

    this.dialogService.openAddActivityToDayDialog();

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
    this.dialogService.openAddActivityToDayDialog();
  }

  openOffersDialog() {
    let dialogRef = this.dialogService.openOffersDialog();

    dialogRef.afterClosed().subscribe(result => {

      console.log("Result:", result);

      if (result == 'openNewOffer') {

        // let open new product offer modal
        this.dialogService.openAddProductOfferDialog();
      }
    });
  }
}
