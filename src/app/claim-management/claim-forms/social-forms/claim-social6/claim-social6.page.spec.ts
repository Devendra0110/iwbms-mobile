import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSocial6Page } from './claim-social6.page';

describe('ClaimSocial6Page', () => {
  let component: ClaimSocial6Page;
  let fixture: ComponentFixture<ClaimSocial6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSocial6Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSocial6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
