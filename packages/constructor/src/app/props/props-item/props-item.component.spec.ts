import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsItemComponent } from './props-item.component';

describe('PropsItemComponent', () => {
  let component: PropsItemComponent;
  let fixture: ComponentFixture<PropsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropsItemComponent]
    });
    fixture = TestBed.createComponent(PropsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
