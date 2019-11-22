import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEducation4Page } from './claim-education4.page';

describe('ClaimEducation4Page', () => {
  let component: ClaimEducation4Page;
  let fixture: ComponentFixture<ClaimEducation4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEducation4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEducation4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
