import { Component, Input } from '@angular/core';
import type { A } from 'src/types/base';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent {
  @Input() data: A
  constructor() {

  }
}
