import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimFinancial6Page } from './claim-financial6.page';

describe('ClaimFinancial6Page', () => {
  let component: ClaimFinancial6Page;
  let fixture: ComponentFixture<ClaimFinancial6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimFinancial6Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimFinancial6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
