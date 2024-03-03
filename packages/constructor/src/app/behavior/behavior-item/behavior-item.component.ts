import { Component, Input } from '@angular/core';
import { BehaviorMeta, BehaviorItem, } from 'src/types/behavior';

let clog = console.log

@Component({
  selector: 'app-behavior-item',
  templateUrl: './behavior-item.component.html',
  styleUrls: ['./behavior-item.component.sass']
})
export class BehaviorItemComponent {
  // @Input() behavior!: BehaviorMeta
  @Input() behavior!: BehaviorItem
  constructor() {
    
  }
  // switch (this.behavior.type) {
  //   case value:
      
  //     break;
  
  //   default:
  //     break;
  // }
  eventValueChange() {
    clog('eventValueChange')
  }
}
