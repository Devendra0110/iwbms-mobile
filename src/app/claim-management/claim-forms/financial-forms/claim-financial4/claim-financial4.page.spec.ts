import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFinancial4Page } from './claim-financial4.page';

describe('ClaimFinancial4Page', () => {
  let component: ClaimFinancial4Page;
  let fixture: ComponentFixture<ClaimFinancial4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimFinancial4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimFinancial4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
