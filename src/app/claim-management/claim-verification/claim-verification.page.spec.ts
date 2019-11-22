import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimVerificationPage } from './claim-verification.page';

describe('ClaimVerificationPage', () => {
  let component: ClaimVerificationPage;
  let fixture: ComponentFixture<ClaimVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimVerificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
