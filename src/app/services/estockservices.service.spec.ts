import { TestBed } from '@angular/core/testing';

import { EstockservicesService } from './estockservices.service';

describe('EstockservicesService', () => {
  let service: EstockservicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstockservicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
