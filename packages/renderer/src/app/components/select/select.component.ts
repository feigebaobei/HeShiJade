import { Component, Input, } from '@angular/core';
import { A, S } from 'src/types/base';

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
      
    // ]
  }
}
