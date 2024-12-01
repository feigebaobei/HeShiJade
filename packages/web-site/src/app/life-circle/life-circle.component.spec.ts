import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCircleComponent } from './life-circle.component';

describe('LifeCircleComponent', () => {
  let component: LifeCircleComponent;
  let fixture: ComponentFixture<LifeCircleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeCircleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LifeCircleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
