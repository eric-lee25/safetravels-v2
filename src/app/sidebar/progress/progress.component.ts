import {Component, OnInit, Input} from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {


  @Input() sidebarProgressToggle: boolean;

  constructor(private appService: AppService) {

  }


  ngOnInit() {


  }


  toggleSidebarProgress(toggle: boolean) {
    this.appService.sidebarProgressToggle.next(toggle);

  }
}
