import { TestBed } from '@angular/core/testing';

import { PartyTainersService } from './party-tainers.service';

describe('PartyTainersService', () => {
  let service: PartyTainersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PartyTainersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
