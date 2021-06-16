import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewMyResourceComponent } from './view-my-resource.component';

describe('ViewMyResourceComponent', () => {
  let component: ViewMyResourceComponent;
  let fixture: ComponentFixture<ViewMyResourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewMyResourceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewMyResourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
