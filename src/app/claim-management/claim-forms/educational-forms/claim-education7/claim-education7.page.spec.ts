import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimEducation7Page } from './claim-education7.page';

describe('ClaimEducation7Page', () => {
  let component: ClaimEducation7Page;
  let fixture: ComponentFixture<ClaimEducation7Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimEducation7Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimEducation7Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
