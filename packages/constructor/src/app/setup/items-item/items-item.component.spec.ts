import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsItemComponent } from './items-item.component';

describe('ItemsItemComponent', () => {
  let component: ItemsItemComponent;
  let fixture: ComponentFixture<ItemsItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsItemComponent]
    });
    fixture = TestBed.createComponent(ItemsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
