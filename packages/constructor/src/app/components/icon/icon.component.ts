import { Component, Input } from '@angular/core';
// type
import type { Component as Comp } from 'src/types/component'
import type { ULID } from 'src/types';

interface IconData {
  props: Comp['props']
  ulid: ULID
}

@Component({
  selector: 'app-icon',
  // standalone: true,
  // imports: [],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.sass'
})
export class IconComponent {
  @Input() data!: IconData
  constructor() {}
}
