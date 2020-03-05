import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessDetailPage } from './business-detail.page';

describe('BusinessDetailPage', () => {
  let component: BusinessDetailPage;
  let fixture: ComponentFixture<BusinessDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
