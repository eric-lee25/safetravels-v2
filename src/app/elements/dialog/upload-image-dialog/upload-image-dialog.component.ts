import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";
import {DropzoneConfigInterface} from "angular2-dropzone-wrapper";
import {MdDialogRef} from "@angular/material";

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.css']
})
export class UploadImageDialogComponent implements OnInit {


  config: DropzoneConfigInterface = this.appService.uploadConfig;

  uploadEvent: any;


  constructor(private appService: AppService, public dialogRef: MdDialogRef<UploadImageDialogComponent>) {

    this.appService.uploadConfigEvent.subscribe(config => this.config = config);

  }

  title: string = "";

  ngOnInit() {

    this.title = this.appService.dialogTitle;


  }

  onUploadSuccess(event) {
    this.uploadEvent = event;
  }

  onSave() {
    this.dialogRef.close(this.uploadEvent);
  }

}
