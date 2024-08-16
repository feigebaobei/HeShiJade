import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsNumberComponent } from './props-number.component';

describe('PropsNumberComponent', () => {
  let component: PropsNumberComponent;
  let fixture: ComponentFixture<PropsNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropsNumberComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropsNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
