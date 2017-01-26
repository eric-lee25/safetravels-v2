/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductOfferService } from './product-offer.service';

describe('ProductOfferService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductOfferService]
    });
  });

  it('should ...', inject([ProductOfferService], (service: ProductOfferService) => {
    expect(service).toBeTruthy();
  }));
});
