import { Component, Input } from '@angular/core';
// type
import type { Component as Comp } from 'src/types/component';


@Component({
  selector: 'app-span',
  // standalone: true,
  // imports: [],
  templateUrl: './span.component.html',
  styleUrl: './span.component.sass'
})
export class SpanComponent {
  @Input() data!: {props: Comp['props']}
}
