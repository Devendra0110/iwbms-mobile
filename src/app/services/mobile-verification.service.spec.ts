import { TestBed } from '@angular/core/testing';

import { MobileVerificationService } from './mobile-verification.service';

describe('MobileVerificationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MobileVerificationService = TestBed.get(MobileVerificationService);
    expect(service).toBeTruthy();
  });
});
