import { Component, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';

// type
import type { A, ConfigItem, N, S, Options, ConfigItemSelect, } from 'src/types/base';

@Component({
  selector: 'app-items-group',
  templateUrl: './items-group.component.html',
  styleUrls: ['./items-group.component.sass']
})
export class ItemsGroupComponent {
  @Input() group: ConfigItem[] = []
  @Input() index: N = -1
  // OptionsTemp: Options<S, A>
  constructor(private componentService: ComponentService) {
    // let ele: ConfigItemSelect<A> | undefined = this.group.find(item => item.key === 'category') as ConfigItemSelect<A> | undefined
    // if (ele) {
    //   let selectOption = ele?.extend?.select
    //   // if (selectOption) {
    //   //   // this.OptionsTemp = selectOption
    //   // }
    // }
    // this.OptionsTemp = {}
  }
  changeH() {

  }
}
