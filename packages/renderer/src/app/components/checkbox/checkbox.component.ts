import { Component, Input, OnInit } from '@angular/core';
// type
import type { Component as Comp } from 'src/types/component';
import type { ULID } from 'src/types';
import { B } from 'src/types/base';

let clog = console.log

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
export class CheckboxComponent implements OnInit {
  @Input() data!: CheckboxData
  constructor() {}
  ngOnInit() {
    // clog(this.data)
  }
  // beforeChangeH() {
  //   return true
  // }
  changeH(value: B) {
    clog('change', value)
  }
}
