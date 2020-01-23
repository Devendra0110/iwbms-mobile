import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashReceiptModalPage } from './cash-receipt-modal.page';

describe('CashReceiptModalPage', () => {
  let component: CashReceiptModalPage;
  let fixture: ComponentFixture<CashReceiptModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashReceiptModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashReceiptModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
