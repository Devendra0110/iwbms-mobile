import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEducation5Page } from './claim-education5.page';

describe('ClaimEducation5Page', () => {
  let component: ClaimEducation5Page;
  let fixture: ComponentFixture<ClaimEducation5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEducation5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEducation5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
