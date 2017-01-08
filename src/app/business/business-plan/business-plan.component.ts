import {Component, OnInit} from '@angular/core';
import {DialogService} from "../../services/dialog.service";

@Component({
	selector: 'app-business-plan',
	templateUrl: './business-plan.component.html',
	styleUrls: ['./business-plan.component.css']
})
export class BusinessPlanComponent implements OnInit {

	constructor(private dialogService: DialogService) {
	}

	ngOnInit() {

	}

	showPlanDialog(title: string) {

		this.dialogService.openPlanDialog();

	}

}
