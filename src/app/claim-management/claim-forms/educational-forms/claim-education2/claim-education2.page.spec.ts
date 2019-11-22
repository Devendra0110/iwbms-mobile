import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEducation2Page } from './claim-education2.page';

describe('ClaimEducation2Page', () => {
  let component: ClaimEducation2Page;
  let fixture: ComponentFixture<ClaimEducation2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEducation2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEducation2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
