import {Injectable} from '@angular/core';

export class OfferInfo {
  date: string;
  opened: number;
  sent: number;
}

let OffersInfo: OfferInfo[] = [{
  date: "Aug 1",
  opened: 362.53,
  sent: 277.02
}, {
  date: "Aug 2",
  opened: 348.45,
  sent: 328.54
}, {
  date: "Aug 3",
  opened: 279.02,
  sent: 297.02
}, {
  date: "Aug 4",
  opened: 230.93,
  sent: 255.3
}, {
  date: "Aug 5",
  opened: 203.52,
  sent: 173.54
}];


@Injectable()
export class OfferService {

  constructor() {
  }

  getOffersInfo(): OfferInfo[] {
    return OffersInfo;
  }

}
