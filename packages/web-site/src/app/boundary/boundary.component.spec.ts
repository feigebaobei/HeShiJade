import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoundaryComponent } from './boundary.component';

describe('BoundaryComponent', () => {
  let component: BoundaryComponent;
  let fixture: ComponentFixture<BoundaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoundaryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoundaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
