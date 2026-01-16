import { Component, Input } from '@angular/core';
import type { A } from 'src/types/base';

@Component({
  selector: 'app-input-number',
  // standalone: true,
  // imports: [],
  templateUrl: './input-number.component.html',
  styleUrl: './input-number.component.sass'
})
export class InputNumberComponent {
  @Input() data: A
  constructor () {}
}
