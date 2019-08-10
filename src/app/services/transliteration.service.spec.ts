import { TestBed } from '@angular/core/testing';

import { TransliterationService } from './transliteration.service';

describe('TransliterationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TransliterationService = TestBed.get(TransliterationService);
    expect(service).toBeTruthy();
  });
});
