import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBlockedUserComponent } from './view-blocked-user.component';

describe('ViewBlockedUserComponent', () => {
  let component: ViewBlockedUserComponent;
  let fixture: ComponentFixture<ViewBlockedUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewBlockedUserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBlockedUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
