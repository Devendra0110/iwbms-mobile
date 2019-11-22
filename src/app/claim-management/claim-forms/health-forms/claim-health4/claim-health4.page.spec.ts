import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimHealth4Page } from './claim-health4.page';

describe('ClaimHealth4Page', () => {
  let component: ClaimHealth4Page;
  let fixture: ComponentFixture<ClaimHealth4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimHealth4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimHealth4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
