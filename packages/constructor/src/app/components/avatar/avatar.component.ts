import { Component, Input } from '@angular/core';
// type
import type { ULID } from 'src/types';
import type { B } from 'src/types/base';
import type { Component as Comp, ComponentData, } from 'src/types/component';

let clog = console.log

@Component({
  selector: 'app-avatar',
  // standalone: true,
  // imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.sass'
})
export class AvatarComponent {
  @Input() data!: ComponentData // todo 其它组件使用此类型
  // isRound: B
  constructor() {
    // this.isRound = true
  }
  // ngOnInit() {
  //   clog('inninini', this.data.props)
  //   switch (this.data.props['shape']) {
  //     case 'circle':
  //       default:
  //       this.isRound = true
  //       break;
  //     case 'rectangle':
  //       this.isRound = true
  //       break;
  //   }
  // }
}
