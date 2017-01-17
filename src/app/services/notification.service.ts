import {Injectable} from '@angular/core';
import {MdSnackBar} from "@angular/material";
import {NotifyComponent} from "../elements/notify/notify.component";
import {AppService} from "./app.service";

@Injectable()
export class NotificationService {

  constructor(public snackBar: MdSnackBar, private appService: AppService) {


  }

  show(message: string, duration?: number) {

    let notify = {message: message};

    this.appService.notificationEvent.next(notify)

    this.snackBar.openFromComponent(NotifyComponent, {
      duration: duration ? duration : 1000
    });
  }

}
