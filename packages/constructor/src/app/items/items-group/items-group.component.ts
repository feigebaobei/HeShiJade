import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';

// type
import type { A, ConfigItem, N, S, } from 'src/types/base';

@Component({
  selector: 'app-items-group',
  templateUrl: './items-group.component.html',
  styleUrls: ['./items-group.component.sass']
})
export class ItemsGroupComponent {
  @Input() group: ConfigItem[] = []
  @Input() index: N = -1
  constructor(private componentService: ComponentService) {


  }
  change(key: S, value: A) {

  }
}
