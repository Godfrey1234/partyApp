import { TestBed } from '@angular/core/testing';

import { ClientBookingsService } from './client-bookings.service';

describe('ClientBookingsService', () => {
  let service: ClientBookingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientBookingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
