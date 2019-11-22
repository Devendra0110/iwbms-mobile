import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSocial5Page } from './claim-social5.page';

describe('ClaimSocial5Page', () => {
  let component: ClaimSocial5Page;
  let fixture: ComponentFixture<ClaimSocial5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSocial5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSocial5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
