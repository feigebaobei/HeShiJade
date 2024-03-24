import { Component, Input } from '@angular/core';
import { ConfigItem } from 'src/types/base';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.sass']
})
export class ItemComponent {
  @Input() groupItem!: ConfigItem // = {} as ConfigItem
  constructor() {}
  inputChangeH () {}
  selectChangeH () {}
  switchChangeH () {}
  optionsChangeH () {}
}
