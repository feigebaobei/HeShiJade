import { Component, Input } from '@angular/core';
import type { A, S } from 'src/types/base';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent {
  @Input() data: A
  // options: S[]
  constructor() {
    // this.options = [
    // 'Option 1',
    // 'Option 2',
    // 'Option 3',
    // ]
  }
}
