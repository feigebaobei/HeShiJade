import { Component, Input } from '@angular/core';
// type
import type { N } from 'src/types/base';
import type { ComponentPropsMetaItem } from 'src/types/props';

@Component({
  selector: 'app-props-option',
  templateUrl: './props-option.component.html',
  styleUrls: ['./props-option.component.sass']
})
export class PropsOptionComponent {
  @Input() data!: ComponentPropsMetaItem
  labelChange(index: N) {}
  valueChange(index: N) {}
}
