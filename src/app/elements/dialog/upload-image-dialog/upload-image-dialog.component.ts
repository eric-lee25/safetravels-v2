import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-upload-image-dialog',
  templateUrl: './upload-image-dialog.component.html',
  styleUrls: ['./upload-image-dialog.component.css']
})
export class UploadImageDialogComponent implements OnInit {

  constructor(private appService: AppService) {
  }

  title: string = "";

  ngOnInit() {

    this.title = this.appService.dialogTitle;

  }

}
