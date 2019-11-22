import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFinancial3Page } from './claim-financial3.page';

describe('ClaimFinancial3Page', () => {
  let component: ClaimFinancial3Page;
  let fixture: ComponentFixture<ClaimFinancial3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimFinancial3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimFinancial3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
