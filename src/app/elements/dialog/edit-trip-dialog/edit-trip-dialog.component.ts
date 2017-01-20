import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";
import {Trip} from "../../../models/trip.model";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-edit-trip-dialog',
  templateUrl: './edit-trip-dialog.component.html',
  styleUrls: ['./edit-trip-dialog.component.css']
})
export class EditTripDialogComponent implements OnInit {

  title: string = "Multi Language activity debug";

  trip: Trip = new Trip();

  constructor(private appService: AppService, public dialogRef: MdDialogRef<EditTripDialogComponent>) {

    this.title = this.appService.dialogTitle;
  }

  ngOnInit() {

    this.trip = this.appService.selectedTrip;

  }

  dateOptions = {
    inputValueRequired: true,
    selectionTxtFontSize: '13px',
    width: '100%',
    showInputField: true,
    dateFormat: 'yyyy-mm-dd',
    componentDisabled: false
  };


  onSelectStartDate(event) {

    this.trip.start_date = event.formatted;
  }

  onSelectEndDate(event) {

    this.trip.end_date = event.formatted;
  }
  onSave() {

    this.dialogRef.close(this.trip);
  }
}
