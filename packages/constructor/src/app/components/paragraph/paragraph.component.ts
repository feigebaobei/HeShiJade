import { Component, Input } from '@angular/core';
// type
import { Component as Comp } from 'src/types/component';

@Component({
  selector: 'app-paragraph',
  // standalone: true,
  // imports: [],
  templateUrl: './paragraph.component.html',
  styleUrl: './paragraph.component.sass'
})
export class ParagraphComponent {
  @Input() data!: {props: Comp['props']}
  constructor() {}
}
