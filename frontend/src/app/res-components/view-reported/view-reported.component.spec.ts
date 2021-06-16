import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewReportedComponent } from './view-reported.component';

describe('ViewReportedComponent', () => {
  let component: ViewReportedComponent;
  let fixture: ComponentFixture<ViewReportedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewReportedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewReportedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
