import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompPacketComponent } from './comp-packet.component';

describe('CompPacketComponent', () => {
  let component: CompPacketComponent;
  let fixture: ComponentFixture<CompPacketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CompPacketComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CompPacketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
