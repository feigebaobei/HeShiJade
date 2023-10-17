import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompBoxComponent } from './comp-box.component';

describe('CompBoxComponent', () => {
  let component: CompBoxComponent;
  let fixture: ComponentFixture<CompBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CompBoxComponent]
    });
    fixture = TestBed.createComponent(CompBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
