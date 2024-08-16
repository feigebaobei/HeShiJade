import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CircumComponent } from './circum.component';

describe('CircumComponent', () => {
  let component: CircumComponent;
  let fixture: ComponentFixture<CircumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CircumComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CircumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
