import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {TripTokenDialogComponent} from "../../elements/dialog/trip-token-dialog/trip-token-dialog.component";
@Component({
  selector: 'app-manage-trip',
  templateUrl: './manage-trip.component.html',
  styleUrls: ['./manage-trip.component.css']
})
export class ManageTripComponent implements OnInit {

  constructor(public dialog: MdDialog) {
  }

  messageAdvanced: boolean = false;
  tabConversationHistoryOpen: boolean = true;
  tabConversationScheduleOpen: boolean = false;


  ngOnInit() {

  }


  openTripTokenDialog() {

    this.dialog.open(TripTokenDialogComponent);
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
}
