import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {UploadImageDialogComponent} from "../../elements/dialog/upload-image-dialog/upload-image-dialog.component";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-business-account',
  templateUrl: './business-account.component.html',
  styleUrls: ['./business-account.component.css']
})
export class BusinessAccountComponent implements OnInit {

  constructor(private dialog: MdDialog, private appService: AppService) {
  }

  ngOnInit() {
  }

  showImageDialog(title: string) {

    this.appService.dialogTitleEvent.next(title);
    this.dialog.open(UploadImageDialogComponent);

  }

}
