import {Component, OnInit} from '@angular/core';

import {DxChartModule, DxSelectBoxModule} from 'devextreme-angular';
import {OfferService, OfferInfo} from "../services/offer.service";


@Component({
  selector: 'app-product-offers',
  templateUrl: './product-offers.component.html',
  styleUrls: ['./product-offers.component.css'],
  providers: [OfferService]
})
export class ProductOffersComponent implements OnInit {


  OffersInfo: OfferInfo[];
  types: string[] = ["splineArea", "stackedSplineArea", "fullStackedSplineArea"];


  constructor(private offerService: OfferService) {

    this.OffersInfo = this.offerService.getOffersInfo();

  }

  ngOnInit() {

  }

}
