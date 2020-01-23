import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedataVerificationPage } from './redata-verification.page';

describe('RedataVerificationPage', () => {
  let component: RedataVerificationPage;
  let fixture: ComponentFixture<RedataVerificationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedataVerificationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedataVerificationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
