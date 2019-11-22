import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimHealth1Page } from './claim-health1.page';

describe('ClaimHealth1Page', () => {
  let component: ClaimHealth1Page;
  let fixture: ComponentFixture<ClaimHealth1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimHealth1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimHealth1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
