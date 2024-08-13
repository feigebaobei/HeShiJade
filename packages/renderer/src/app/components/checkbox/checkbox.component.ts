import { Component, Input } from '@angular/core';
// type
import type { Component as Comp } from 'src/types/component';
import type { ULID } from 'src/types';

interface CheckboxData {
  props: Comp['props']
  behavior: Comp['behavior']
  ulid: ULID
}

@Component({
  selector: 'app-checkbox',
  // standalone: true,
  // imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.sass'
})
export class CheckboxComponent {
  @Input() data!: CheckboxData
  constructor() {}
}
