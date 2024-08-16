import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsInputComponent } from './props-input.component';

describe('PropsInputComponent', () => {
  let component: PropsInputComponent;
  let fixture: ComponentFixture<PropsInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropsInputComponent]
    });
    fixture = TestBed.createComponent(PropsInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
