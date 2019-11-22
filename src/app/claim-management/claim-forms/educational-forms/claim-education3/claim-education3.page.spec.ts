import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEducation3Page } from './claim-education3.page';

describe('ClaimEducation3Page', () => {
  let component: ClaimEducation3Page;
  let fixture: ComponentFixture<ClaimEducation3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEducation3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEducation3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
