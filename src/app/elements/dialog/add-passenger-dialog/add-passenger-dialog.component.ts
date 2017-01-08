import { Component, OnInit } from '@angular/core';
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-add-passenger-dialog',
  templateUrl: './add-passenger-dialog.component.html',
  styleUrls: ['./add-passenger-dialog.component.css']
})
export class AddPassengerDialogComponent implements OnInit {

  constructor(public dialogRef: MdDialogRef<AddPassengerDialogComponent>) { }

  ngOnInit() {
  }

}
