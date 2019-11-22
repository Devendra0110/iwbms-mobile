import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFinancial5Page } from './claim-financial5.page';

describe('ClaimFinancial5Page', () => {
  let component: ClaimFinancial5Page;
  let fixture: ComponentFixture<ClaimFinancial5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimFinancial5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimFinancial5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
