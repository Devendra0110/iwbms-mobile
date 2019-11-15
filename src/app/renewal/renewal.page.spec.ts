import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenewalPage } from './renewal.page';

describe('RenewalPage', () => {
  let component: RenewalPage;
  let fixture: ComponentFixture<RenewalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenewalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenewalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
