import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorItemComponent } from './behavior-item.component';

describe('BehaviorItemComponent', () => {
  let component: BehaviorItemComponent;
  let fixture: ComponentFixture<BehaviorItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BehaviorItemComponent]
    });
    fixture = TestBed.createComponent(BehaviorItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
