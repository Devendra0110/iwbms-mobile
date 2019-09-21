import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerModalPage } from './employer-modal.page';

describe('EmployerModalPage', () => {
  let component: EmployerModalPage;
  let fixture: ComponentFixture<EmployerModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployerModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
