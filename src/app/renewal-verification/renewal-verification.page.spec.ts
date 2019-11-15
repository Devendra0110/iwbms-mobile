import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalVerificationPage } from './renewal-verification.page';

describe('RenewalVerificationPage', () => {
  let component: RenewalVerificationPage;
  let fixture: ComponentFixture<RenewalVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalVerificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
