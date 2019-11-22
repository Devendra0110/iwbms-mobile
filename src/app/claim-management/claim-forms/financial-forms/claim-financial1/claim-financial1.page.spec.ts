import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFinancial1Page } from './claim-financial1.page';

describe('ClaimFinancial1Page', () => {
  let component: ClaimFinancial1Page;
  let fixture: ComponentFixture<ClaimFinancial1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimFinancial1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimFinancial1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
