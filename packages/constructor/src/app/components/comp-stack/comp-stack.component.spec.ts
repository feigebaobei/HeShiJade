import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompStackComponent } from './comp-stack.component';

describe('CompStackComponent', () => {
  let component: CompStackComponent;
  let fixture: ComponentFixture<CompStackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompStackComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompStackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
