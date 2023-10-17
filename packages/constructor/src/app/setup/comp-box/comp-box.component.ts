import { Component, Input } from '@angular/core';
import type { A } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-comp-box',
  templateUrl: './comp-box.component.html',
  styleUrls: ['./comp-box.component.sass']
})
export class CompBoxComponent {
  @Input() comp: A
  constructor() {}
  btClickH() {
    clog('btClickH')
  }
}
