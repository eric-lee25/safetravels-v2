import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {UploadImageDialogComponent} from "../../elements/dialog/upload-image-dialog/upload-image-dialog.component";
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private dialog: MdDialog, private appService: AppService) {
  }

  ngOnInit() {

  }


  openImageDialog() {

    this.appService.dialogTitleEvent.next("Upload Profile Image");
    let dialogRef = this.dialog.open(UploadImageDialogComponent);

  }

}

