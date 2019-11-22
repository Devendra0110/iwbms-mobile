import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimMainFormPage } from './claim-main-form.page';

describe('ClaimMainFormPage', () => {
  let component: ClaimMainFormPage;
  let fixture: ComponentFixture<ClaimMainFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimMainFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimMainFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
