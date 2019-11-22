import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSocial3Page } from './claim-social3.page';

describe('ClaimSocial3Page', () => {
  let component: ClaimSocial3Page;
  let fixture: ComponentFixture<ClaimSocial3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSocial3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSocial3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
