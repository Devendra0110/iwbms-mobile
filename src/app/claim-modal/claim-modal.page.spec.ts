import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimModalPage } from './claim-modal.page';

describe('ClaimModalPage', () => {
  let component: ClaimModalPage;
  let fixture: ComponentFixture<ClaimModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
