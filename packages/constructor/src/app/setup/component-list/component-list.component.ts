import { Component, Input } from '@angular/core';
import type { A } from 'src/types/base';

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.sass']
})
export class ComponentListComponent {
  @Input() componentList: A
  constructor() {
    
  }
}
