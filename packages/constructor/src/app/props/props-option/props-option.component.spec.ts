import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsOptionComponent } from './props-option.component';

describe('PropsOptionComponent', () => {
  let component: PropsOptionComponent;
  let fixture: ComponentFixture<PropsOptionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropsOptionComponent]
    });
    fixture = TestBed.createComponent(PropsOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
