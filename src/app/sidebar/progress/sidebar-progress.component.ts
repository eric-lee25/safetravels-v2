import {Component, OnInit, Input} from '@angular/core';
import {AppService} from "../../services/app.service";

@Component({
  selector: 'app-sidebar-progress',
  templateUrl: './sidebar-progress.component.html',
  styleUrls: ['./sidebar-progress.component.css']
})
export class SidebarProgressComponent implements OnInit {


  @Input() sidebarProgressToggle: boolean;

  constructor(private appService: AppService) {

  }


  ngOnInit() {


  }


  toggleSidebarProgress(toggle: boolean) {
    this.appService.sidebarProgressToggle.next(toggle);

  }
}
