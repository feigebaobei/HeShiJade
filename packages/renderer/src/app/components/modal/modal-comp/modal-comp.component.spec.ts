import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompComponent } from './modal-comp.component';

describe('ModalCompComponent', () => {
  let component: ModalCompComponent;
  let fixture: ComponentFixture<ModalCompComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCompComponent]
    });
    fixture = TestBed.createComponent(ModalCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
