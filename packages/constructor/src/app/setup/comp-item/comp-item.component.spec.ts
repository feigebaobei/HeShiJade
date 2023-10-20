import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompItemComponent } from './comp-item.component';

describe('CompItemComponent', () => {
  let component: CompItemComponent;
  let fixture: ComponentFixture<CompItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompItemComponent]
    });
    fixture = TestBed.createComponent(CompItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
