import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../../services/dialog.service";
import {MdDialogRef} from "@angular/material";

@Component({
	selector: 'app-offers-dialog',
	templateUrl: './offers-dialog.component.html',
	styleUrls: ['./offers-dialog.component.css']
})
export class OffersDialogComponent implements OnInit {

	constructor(public dialogRef: MdDialogRef<OffersDialogComponent>) {

	}

	ngOnInit() {

	}

}
