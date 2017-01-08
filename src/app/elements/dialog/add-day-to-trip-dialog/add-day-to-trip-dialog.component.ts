import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-day-to-trip-dialog',
  templateUrl: './add-day-to-trip-dialog.component.html',
  styleUrls: ['./add-day-to-trip-dialog.component.css']
})
export class AddDayToTripDialogComponent implements OnInit {

  constructor() { }

  dateOptions = {inline: true, inputValueRequired: true, selectionTxtFontSize: '13px',width: '100%', showInputField: true, dateFormat: 'yyyy-mm-dd', componentDisabled: false};

  ngOnInit() {
  }

  onSelectDate(event){

  }

}
