import { TestBed } from '@angular/core/testing';

import { CardFlagService } from './card-flag.service';

describe('CardFlagService', () => {
  let service: CardFlagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardFlagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
