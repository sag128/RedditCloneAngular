import { TestBed } from '@angular/core/testing';

import { UserProfileGuardService } from './user-profile-guard.service';

describe('UserProfileGuardService', () => {
  let service: UserProfileGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserProfileGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
