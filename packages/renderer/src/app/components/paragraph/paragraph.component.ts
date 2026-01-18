import { Component } from '@angular/core';
import { CompBase } from 'src/helper/pool';

@Component({
  selector: 'app-paragraph',
  // standalone: true,
  // imports: [],
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.sass'
})
export class ParagraphComponent extends CompBase {
  constructor() {
    super()
  }
}
