import { TestBed } from '@angular/core/testing';
import { CostumerService } from './costumer.service';



describe('CostummerService', () => {
  let service: CostumerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CostumerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
