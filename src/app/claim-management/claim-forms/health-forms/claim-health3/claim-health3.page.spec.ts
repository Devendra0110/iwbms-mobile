import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimHealth3Page } from './claim-health3.page';

describe('ClaimHealth3Page', () => {
  let component: ClaimHealth3Page;
  let fixture: ComponentFixture<ClaimHealth3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimHealth3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimHealth3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
