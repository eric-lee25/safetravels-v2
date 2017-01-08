import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";

@Component({
	selector: 'app-business-account',
	templateUrl: './business-account.component.html',
	styleUrls: ['./business-account.component.css']
})
export class BusinessAccountComponent implements OnInit {

	constructor(private dialogService: DialogService) {
	}

	ngOnInit() {

	}

	showImageDialog(title: string) {
		this.dialogService.openImageUploadDialog(title);
	}

}
