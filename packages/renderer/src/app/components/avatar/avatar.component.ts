import { Component, Input } from '@angular/core';
import { CompBase } from 'src/helper/pool';
import { N } from 'src/types/base';
import { componentInstanceData } from 'src/types/component';

@Component({
  selector: 'app-avatar',
  // standalone: true,
  // imports: [],
  templateUrl: './avatar.component.html',
  styleUrl: './avatar.component.sass'
})
export class AvatarComponent extends CompBase {
  @Input() override data!: componentInstanceData
  @Input() override loopIndex: N = -1;
  constructor() {
    super()
  }
}
