import { Component, Input, OnInit } from '@angular/core';
import type { A, S, B } from 'src/types/base';
import type { Component as Comp } from 'src/types/component';
import type { IButtonSize, IButtonType } from 'ng-devui';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.sass']
})
export class ButtonComponent implements OnInit {
  @Input() data: Comp = {} as Comp
  bordered: B = false
  bsSize: IButtonSize = 'md'
  disabled: B = false
  type: IButtonType = 'button'
  width: S = '100px'
  constructor() {
  }
  ngOnInit() {
    this.bordered = this.data.props['bordered'] as B
    this.bsSize = this.data.props['bsSize'] as IButtonSize
    this.disabled = this.data.props['disabled'] as B
    this.type = this.data.props['type'] as IButtonType
    this.width = this.data.props['width'] as S
  }
}
