/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PriceGroupService } from './priceGroup.service';

describe('Service: PriceGroup', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PriceGroupService]
    });
  });

  it('should ...', inject([PriceGroupService], (service: PriceGroupService) => {
    expect(service).toBeTruthy();
  }));
});
