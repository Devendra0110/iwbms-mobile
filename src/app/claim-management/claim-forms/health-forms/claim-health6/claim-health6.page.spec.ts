import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimHealth6Page } from './claim-health6.page';

describe('ClaimHealth6Page', () => {
  let component: ClaimHealth6Page;
  let fixture: ComponentFixture<ClaimHealth6Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimHealth6Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimHealth6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
