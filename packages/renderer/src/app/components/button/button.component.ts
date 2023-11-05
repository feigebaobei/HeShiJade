import { Component, Input, } from '@angular/core';
// type
import type { A } from 'src/types/base';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent {
  @Input() data: A
  constructor() {}
  
}
