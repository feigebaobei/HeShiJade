import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehaviorBoxComponent } from './behavior-box.component';

describe('BehaviorBoxComponent', () => {
  let component: BehaviorBoxComponent;
  let fixture: ComponentFixture<BehaviorBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BehaviorBoxComponent]
    });
    fixture = TestBed.createComponent(BehaviorBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
