import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FamilyModalPage } from './family-modal.page';

describe('FamilyModalPage', () => {
  let component: FamilyModalPage;
  let fixture: ComponentFixture<FamilyModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FamilyModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
