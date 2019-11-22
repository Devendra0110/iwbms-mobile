import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSocial4Page } from './claim-social4.page';

describe('ClaimSocial4Page', () => {
  let component: ClaimSocial4Page;
  let fixture: ComponentFixture<ClaimSocial4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSocial4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSocial4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
