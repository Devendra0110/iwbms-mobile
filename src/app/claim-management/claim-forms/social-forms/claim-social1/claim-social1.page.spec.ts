import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimSocial1Page } from './claim-social1.page';

describe('ClaimSocial1Page', () => {
  let component: ClaimSocial1Page;
  let fixture: ComponentFixture<ClaimSocial1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimSocial1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimSocial1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
