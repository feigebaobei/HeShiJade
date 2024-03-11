import { Component, Input } from '@angular/core';
// type
import type { N, ConfigItem } from 'src/types/base';
// import type { ComponentPropsMetaItem } from 'src/types/props';

@Component({
  selector: 'app-props-option',
  templateUrl: './props-option.component.html',
  styleUrls: ['./props-option.component.sass']
})
export class PropsOptionComponent {
  // @Input() data!: ComponentPropsMetaItem
  // todo 待完善
  @Input() data!: ConfigItem
  labelChange(index: N) {}
  valueChange(index: N) {}
}
