import { Component, Input } from '@angular/core';
import { asyncFn } from 'src/helper';
import { text } from 'src/helper/config';
// type
import type { A, S, B, Oa} from 'src/types/base';
import type { Component as Comp } from 'src/types/component';
import type { Text } from 'src/types/config';

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
  text: Text
  constructor() {
    // this.radioBeforeChange = (p: S) => {
    //   return true
    // }
    this.text = text
  }
  ngOnInit() {
  }
}
