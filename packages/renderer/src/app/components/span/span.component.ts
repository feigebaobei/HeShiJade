import { Component } from '@angular/core';
import { CompBase } from 'src/helper/pool';

@Component({
  selector: 'app-span',
  // standalone: true,
  // imports: [],
  templateUrl: './span.component.html',
  styleUrl: './span.component.sass'
})
export class SpanComponent extends CompBase {
  constructor() {
    super()
  }
}
