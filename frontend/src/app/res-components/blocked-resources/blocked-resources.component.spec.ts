import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedResourcesComponent } from './blocked-resources.component';

describe('BlockedResourcesComponent', () => {
  let component: BlockedResourcesComponent;
  let fixture: ComponentFixture<BlockedResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BlockedResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
