import { Component, Input, OnChanges, OnInit } from '@angular/core';
// type
import type { A } from 'src/types/base';

@Component({
  selector: 'app-props-input',
  templateUrl: './props-input.component.html',
  styleUrls: ['./props-input.component.sass']
})
export class PropsInputComponent implements OnInit, OnChanges {
  @Input() data: A
  ngOnInit(): void {
    console.log('props input', this, this.data)
  }
  ngOnChanges(...p: A) {
    console.log('changie', p)
  }
}
