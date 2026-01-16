import { Component, Input } from '@angular/core';
import { asyncFn } from 'src/helper';
// type
import type { A, S, B, Oa} from 'src/types/base';
import type { Component as Comp } from 'src/types/component';

let clog = console.log

@Component({
  selector: 'app-radio',
  // standalone: true,
  // imports: [],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.sass'
})
export class RadioComponent {
  @Input() data!: {props: Comp['props']}
  // radioBeforeChange: (p: A) => B
  constructor() {
    // this.radioBeforeChange = (p: S) => {
    //   return true
    // }
  }
  ngOnInit() {
  }
}
