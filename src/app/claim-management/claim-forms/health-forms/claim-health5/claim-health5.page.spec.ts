import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimHealth5Page } from './claim-health5.page';

describe('ClaimHealth5Page', () => {
  let component: ClaimHealth5Page;
  let fixture: ComponentFixture<ClaimHealth5Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimHealth5Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimHealth5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
