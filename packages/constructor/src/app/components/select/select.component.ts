import { Component } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.sass']
})
export class SelectComponent {
  constructor() {
    this.options = [
    'Option 1',
    'Option 2',
    'Option 3',
    ]
  }
}
