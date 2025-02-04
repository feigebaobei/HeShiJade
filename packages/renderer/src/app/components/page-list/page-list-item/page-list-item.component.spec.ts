import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageListItemComponent } from './page-list-item.component';

describe('PageListItemComponent', () => {
  let component: PageListItemComponent;
  let fixture: ComponentFixture<PageListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
