import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaimManagementPage } from './claim-management.page';

describe('ClaimManagementPage', () => {
  let component: ClaimManagementPage;
  let fixture: ComponentFixture<ClaimManagementPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClaimManagementPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaimManagementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
