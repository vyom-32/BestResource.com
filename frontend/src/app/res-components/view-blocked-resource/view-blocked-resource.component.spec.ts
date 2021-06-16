import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlockedResourceComponent } from './view-blocked-resource.component';

describe('ViewBlockedResourceComponent', () => {
  let component: ViewBlockedResourceComponent;
  let fixture: ComponentFixture<ViewBlockedResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBlockedResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBlockedResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
