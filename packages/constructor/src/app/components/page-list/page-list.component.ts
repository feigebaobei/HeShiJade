import { Component } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';

@Component({
  selector: 'app-page-list',
  // standalone: true,
  // imports: [],
  templateUrl: './page-list.component.html',
  styleUrl: './page-list.component.sass'
})
export class PageListComponent {
  constructor(
    private componentService: ComponentService
  ) {
    
  }
  ngOnInit() {}
  ngOnChanges() {}
}
