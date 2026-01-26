import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DrawerCompComponent } from './drawer-comp.component';

describe('DrawerCompComponent', () => {
  let component: DrawerCompComponent;
  let fixture: ComponentFixture<DrawerCompComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DrawerCompComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DrawerCompComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
