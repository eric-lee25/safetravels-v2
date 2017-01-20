import {Injectable} from '@angular/core';
import {MdDialog, MdDialogConfig, MdDialogRef} from "@angular/material";
import {AddProductOfferDialogComponent} from "../elements/dialog/add-product-offer-dialog/add-product-offer-dialog.component";
import {UploadImageDialogComponent} from "../elements/dialog/upload-image-dialog/upload-image-dialog.component";
import {AppService} from "./app.service";
import {AddStaffUserDialogComponent} from "../elements/dialog/add-staff-user-dialog/add-staff-user-dialog.component";
import {TripTokenDialogComponent} from "../elements/dialog/trip-token-dialog/trip-token-dialog.component";
import {ConfirmationDialogComponent} from "../elements/dialog/confirmation-dialog/confirmation-dialog.component";
import {PlanDialogComponent} from "../elements/dialog/plan-dialog/plan-dialog.component";
import {EditTripDialogComponent} from "../elements/dialog/edit-trip-dialog/edit-trip-dialog.component";
import {AddDayToTripDialogComponent} from "../elements/dialog/add-day-to-trip-dialog/add-day-to-trip-dialog.component";
import {AddActivityToDayDialogComponent} from "../elements/dialog/add-activity-to-day-dialog/add-activity-to-day-dialog.component";
import {OffersDialogComponent} from "../elements/dialog/offers-dialog/offers-dialog.component";
import {AddPassengerDialogComponent} from "../elements/dialog/add-passenger-dialog/add-passenger-dialog.component";
import {TermsDialogComponent} from "../elements/dialog/terms-dialog/terms-dialog.component";
import {PrivacyDialogComponent} from "../elements/dialog/privacy-dialog/privacy-dialog.component";
import {MessageDialogComponent} from "../elements/dialog/message-dialog/message-dialog.component";

@Injectable()
export class DialogService {

  constructor(private dialog: MdDialog,
              private appService: AppService) {
  }

  openAddProductOfferDialog() {
    let config: MdDialogConfig = new MdDialogConfig();
    config.width = '400px';
    this.dialog.open(AddProductOfferDialogComponent, config);
  }

  openImageUploadDialog(title?: string): MdDialogRef<UploadImageDialogComponent> {

    this.appService.dialogTitleEvent.next(title);
    let dialogRef = this.dialog.open(UploadImageDialogComponent);

    return dialogRef;
  }

  openAddStaffUserDialog() {

    let config: MdDialogConfig = new MdDialogConfig();

    config.width = '400px';

    this.dialog.open(AddStaffUserDialogComponent, config);

  }

  openTripTokenDialog() {

    this.dialog.open(TripTokenDialogComponent);
  }


  showMessageDialog(title: string, message: string, width?: string) {


    let DialogConfig: MdDialogConfig = new MdDialogConfig();

    if (width) {
      DialogConfig.width = '400px';
    }

    let config = this.appService.confirmationDialogConfig;
    if (title) {
      config.title = title;
    }
    if (message) {
      config.message = message;
    }
    this.appService.messageDialogEvent.next(config);

    this.dialog.open(MessageDialogComponent, DialogConfig);


  }

  openConfirmationDialog(title: string, message: string, actionTitle: string, buttonClass: string): MdDialogRef<ConfirmationDialogComponent> {

    let DialogConfig: MdDialogConfig = new MdDialogConfig();

    DialogConfig.width = '500px';

    let config = this.appService.confirmationDialogConfig;
    if (title) {
      config.title = title;
    }
    if (message) {
      config.message = message;
    }
    if (actionTitle) {
      config.actionTitle = actionTitle;
    }

    if (buttonClass) {
      config.buttonClass = buttonClass;
    }
    this.appService.confirmationDialogConfigEvent.next(config);

    let dialogRef = this.dialog.open(ConfirmationDialogComponent, DialogConfig);

    return dialogRef;

  }

  openPlanDialog() {

    let DialogConfig: MdDialogConfig = new MdDialogConfig();
    DialogConfig.width = '600px';

    this.dialog.open(PlanDialogComponent, DialogConfig);
  }

  openEditTripDialog(): MdDialogRef<EditTripDialogComponent> {
    let dialogConfig: MdDialogConfig = new MdDialogConfig();
    dialogConfig.width = '600px';
    return this.dialog.open(EditTripDialogComponent, dialogConfig);
  }


  openAddDayToTripDialog() {

    let dialogConfig: MdDialogConfig = new MdDialogConfig();
    dialogConfig.width = '500px';
    this.dialog.open(AddDayToTripDialogComponent, dialogConfig);
  }

  openAddActivityToDayDialog() {
    let dialogConfig: MdDialogConfig = new MdDialogConfig();
    dialogConfig.width = '650px';
    this.dialog.open(AddActivityToDayDialogComponent, dialogConfig);

  }

  openOffersDialog(): MdDialogRef<OffersDialogComponent> {
    let dialogConfig: MdDialogConfig = new MdDialogConfig();
    dialogConfig.width = '650px';

    let dialogRef: MdDialogRef<OffersDialogComponent> = this.dialog.open(OffersDialogComponent, dialogConfig);

    return dialogRef;
  }

  openAddPassengerDialog(): MdDialogRef<AddPassengerDialogComponent> {

    let dialogConfig: MdDialogConfig = new MdDialogConfig();
    dialogConfig.width = '650px';

    let dialogRef: MdDialogRef<AddPassengerDialogComponent> = this.dialog.open(AddPassengerDialogComponent, dialogConfig);

    return dialogRef;

  }

  openTermsDialog() {

    let dialogConfig: MdDialogConfig = new MdDialogConfig();
    dialogConfig.width = '600px';
    this.dialog.open(TermsDialogComponent, dialogConfig);

  }

  openPrivacyDialog() {
    let dialogConfig: MdDialogConfig = new MdDialogConfig();
    dialogConfig.width = '600px';
    this.dialog.open(PrivacyDialogComponent, dialogConfig);

  }

}
