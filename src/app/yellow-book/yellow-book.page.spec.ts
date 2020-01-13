import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { YellowBookPage } from './yellow-book.page';

describe('YellowBookPage', () => {
  let component: YellowBookPage;
  let fixture: ComponentFixture<YellowBookPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ YellowBookPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(YellowBookPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
