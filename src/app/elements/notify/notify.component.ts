import {Component, OnInit} from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.css']
})
export class NotifyComponent implements OnInit {

  notification: any = this.appService.notification;

  constructor(private appService: AppService) {

  }

  ngOnInit() {
    this.appService.notificationEvent.subscribe(notification => this.notification = notification);
  }

}
