import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-devui';
import type { A, S } from 'src/types/base';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [
    SelectModule,
    FormsModule,
  ],
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
