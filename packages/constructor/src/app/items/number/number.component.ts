import { Component, EventEmitter, Input, Output, } from '@angular/core';

// type
import { N, S } from 'src/types/base';

@Component({
  selector: 'app-number',
  // standalone: true,
  // imports: [],
  templateUrl: './number.component.html',
  styleUrl: './number.component.sass'
})
export class NumberComponent {
  @Input() label: S = 'label'
  @Input() value: N = 0
  _value: N
  @Output() changeValue = new EventEmitter<N>()
  constructor() {
    this._value = 0
  }
  ngOnInit(): void {
    this._value = this.value
  }
  changeH() {
    this.changeValue.emit(this._value)
  }
}
