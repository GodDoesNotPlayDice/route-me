import { TestBed } from '@angular/core/testing';

import { TripInProgressService } from './trip-in-progress.service';

describe('TripInProgressService', () => {
  let service: TripInProgressService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripInProgressService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
