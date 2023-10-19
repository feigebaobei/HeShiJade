import { Component, Input, } from '@angular/core';
// import { ComponentService } from 'src/app/service/component.service';
// import type { A } from 'src/types/base';
import type { Category } from 'src/types/component';
let clog = console.log

@Component({
  selector: 'app-component-list',
  templateUrl: './component-list.component.html',
  styleUrls: ['./component-list.component.sass']
})
export class ComponentListComponent{
  @Input() componentCategoryList: Category[]
  constructor(
    // private componentService: ComponentService
    ) {
    this.componentCategoryList = []
  }
  // ngOnInit
  // ngOnInit() {

  // }
  onItemDrop(...p: any[]) {
    clog('onItemDrop', p)
  }
}
