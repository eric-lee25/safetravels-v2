import {Component, OnInit} from '@angular/core';
import {MdDialog} from '@angular/material';
import {UploadImageDialogComponent} from "../../elements/dialog/upload-image-dialog/upload-image-dialog.component";
import {AppService} from "../../services/app.service";
import {User} from "../../models/user.model";
import {DropzoneConfigInterface} from "angular2-dropzone-wrapper";
import {AuthService} from "../../services/auth.service";
import {UserService} from "../../services/user.service";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User = this.appService.currentUser;

  constructor(private dialog: MdDialog,
              private userService: UserService,
              private appService: AppService,
              private notificationService: NotificationService,
              private auth: AuthService) {

    this.appService.userEvent.subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit() {

  }


  openImageDialog() {

    let config: DropzoneConfigInterface = {
      server: this.appService.serverURL + '/me/avatar',
      headers: {"Authorization": "bearer " + this.auth.getToken()},
      paramName: 'image',
      uploadMultiple: false
    };

    this.appService.uploadConfigEvent.next(config);

    this.appService.dialogTitleEvent.next("Upload Profile Image");
    let dialogRef = this.dialog.open(UploadImageDialogComponent);

    dialogRef.afterClosed().subscribe(event => {


      if (event && typeof event[1] !== "undefined") {
        this.user.avatar = event[1].data.avatar;
      }

      this.appService.userEvent.next(this.user);


    });

  }

  onProfileSave() {

    this.userService.update(this.user).subscribe(res => {

      this.notificationService.show("Your profile has been updated");

    }, err => {

      this.notificationService.show(err.json().message);
    });
  }

}

