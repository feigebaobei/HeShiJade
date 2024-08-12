import { Component, Input } from '@angular/core';
import type { ULID } from 'src/types';
import type { Component as Comp } from 'src/types/component';

interface CheckboxData {
  props: Comp['props']
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
