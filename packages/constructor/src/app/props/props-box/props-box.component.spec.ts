import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsBoxComponent } from './props-box.component';

describe('PropsBoxComponent', () => {
  let component: PropsBoxComponent;
  let fixture: ComponentFixture<PropsBoxComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PropsBoxComponent]
    });
    fixture = TestBed.createComponent(PropsBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
