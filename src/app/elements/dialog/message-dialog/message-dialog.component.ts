import {Component, OnInit} from '@angular/core';
import {AppService} from "../../../services/app.service";

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.css']
})
export class MessageDialogComponent implements OnInit {

  config: {
    title: string,
    message: string
  };

  constructor(private appService: AppService) {

    this.config = this.appService.messageDialogConfig;

    this.appService.messageDialogEvent.subscribe(config => {
      this.config = config;

    });

  }

  ngOnInit() {


  }

}
