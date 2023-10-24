import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsSelectComponent } from './props-select.component';

describe('PropsSelectComponent', () => {
  let component: PropsSelectComponent;
  let fixture: ComponentFixture<PropsSelectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropsSelectComponent]
    });
    fixture = TestBed.createComponent(PropsSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
