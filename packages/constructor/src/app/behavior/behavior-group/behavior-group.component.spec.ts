import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorGroupComponent } from './behavior-group.component'

describe('BehaviorGroupComponent', () => {
  let component: BehaviorGroupComponent;
  let fixture: ComponentFixture<BehaviorGroupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BehaviorGroupComponent]
    });
    fixture = TestBed.createComponent(BehaviorGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
