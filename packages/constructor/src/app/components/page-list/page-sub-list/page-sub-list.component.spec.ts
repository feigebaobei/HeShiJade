import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSubListComponent } from './page-sub-list.component';

describe('PageSubListComponent', () => {
  let component: PageSubListComponent;
  let fixture: ComponentFixture<PageSubListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageSubListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PageSubListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
