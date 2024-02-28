import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSwitchComponent } from './item-switch.component';

describe('ItemSwitchComponent', () => {
  let component: ItemSwitchComponent;
  let fixture: ComponentFixture<ItemSwitchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemSwitchComponent]
    });
    fixture = TestBed.createComponent(ItemSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
