import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsSwitchComponent } from './props-switch.component';

describe('PropsSwitchComponent', () => {
  let component: PropsSwitchComponent;
  let fixture: ComponentFixture<PropsSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropsSwitchComponent]
    });
    fixture = TestBed.createComponent(PropsSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
