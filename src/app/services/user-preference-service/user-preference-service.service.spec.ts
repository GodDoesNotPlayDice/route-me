import { TestBed } from '@angular/core/testing';

import { UserPreferenceServiceService } from './user-preference-service.service';

describe('UserPreferenceServiceService', () => {
  let service: UserPreferenceServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserPreferenceServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
