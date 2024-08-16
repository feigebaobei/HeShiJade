import { Component, Input } from '@angular/core';
import type { ULID } from 'src/types';
import type { B } from 'src/types/base';
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
  // beforeChangeH() {
  //   console.log('beforeChangeH')
  //   return false
  // }
  changeH(v: B) {
    console.log('changeH', v)
  }
  beforeChangeH() {
    return false
  }
}
