import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropsDateComponent } from './props-date.component';

describe('PropsDateComponent', () => {
  let component: PropsDateComponent;
  let fixture: ComponentFixture<PropsDateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropsDateComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PropsDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
