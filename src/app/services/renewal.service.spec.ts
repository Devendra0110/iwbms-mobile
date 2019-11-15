import { TestBed } from '@angular/core/testing';

import { RenewalService } from './renewal.service';

describe('RenewalService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RenewalService = TestBed.get(RenewalService);
    expect(service).toBeTruthy();
  });
});
