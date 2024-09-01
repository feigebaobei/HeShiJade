import { Component, Input, ViewChild } from '@angular/core';
// 指令
// import { StackDirective } from 'src/app/stack.directive';
import { StackDirective } from '../stack.directive';
// 组件
// import { ButtonComponent } from 'src/app/components/button/button.component';
// import { FormComponent } from 'src/app/components/form/form.component';
// import { ModalComponent } from 'src/app/components/modal/modal.component';
// import { InputComponent } from 'src/app/components/input/input.component';
// import { SelectComponent } from 'src/app/components/select/select.component';
// import { TableComponent } from 'src/app/components/table/table.component';
// import { IconComponent } from 'src/app/components/icon/icon.component';
// import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
// import { TabsComponent } from '../tabs/tabs.component';
// import { PaginationComponent } from '../pagination/pagination.component';
// type
import type { A, S } from 'src/types/base';
import type { Component as Comp, } from 'src/types/component';
import type { GridStackOptions, GridStackWidget } from 'gridstack/dist/types';

let clog = console.log
interface SuperGridItem extends GridStackWidget {
  comp: Comp
}

// data
// let compMap: {[k: S]: A} = {
//   Button: ButtonComponent,
//   Form: FormComponent,
//   Modal: ModalComponent,
//   Input: InputComponent,
//   Select: SelectComponent,
//   Table: TableComponent,
//   Icon: IconComponent,
//   Checkbox: CheckboxComponent,
//   Tabs: TabsComponent,
//   Pagination: PaginationComponent,
// }

@Component({
  selector: 'app-stack',
  templateUrl: './stack.component.html',
  styleUrls: ['./stack.component.sass']
})
export class StackComponent {
  // @Input() data: A
  @Input() componentList: Comp[] = []
  _componentList: SuperGridItem[]
  gridOptions: GridStackOptions
  @ViewChild(StackDirective, {static: true}) stack!: StackDirective;
  componentRef: A
  constructor() {
    // let componentRef
    this._componentList = []
    this.gridOptions = {
      margin: 2,
      float: true,
      column: 24,
    }
  }
  ngOnInit() {
    this.init()
  }
  init() {
    this._componentList = []
    clog('init', this.componentList)
    this.componentList.forEach(item => {
      this._componentList.push({
        x: item.gridLayout.x,
        y: item.gridLayout.y,
        w: item.gridLayout.w,
        h: item.gridLayout.h,
        id: item.ulid,
        comp: item,
        // noResize: item.gridLayout.noResize,
        noResize: true,
      })
    })

    // let viewContainerRef = this.stack.viewContainerRef
    // viewContainerRef.clear()
    // this.componentRef = viewContainerRef.createComponent(compMap[this.data.type])
    // switch(this.data.type) {
    //   case 'Button':
    //     this.componentRef.instance.data = {
    //       props: this.data.props,
    //       behavior: this.data.behavior,
    //       slots: this.data.slots,
    //       ulid: this.data.ulid,
    //     }
    //     break;
    //   case 'Form':
    //     this.componentRef.instance.data = {
    //       props: this.data.props,
    //       behavior: this.data.behavior,
    //       items: this.data.items,
    //       slots: this.data.slots,
    //       ulid: this.data.ulid,
    //     }
    //     break;
    //   case 'Modal':
    //     this.componentRef.instance.data = {
    //       props: this.data.props,
    //       behavior: this.data.behavior,
    //       items: this.data.items,
    //       slots: this.data.slots,
    //       ulid: this.data.ulid,
    //     }
    //     break;
    //   case 'Input':
    //     this.componentRef.instance.data = {
    //       props: this.data.props,
    //       ulid: this.data.ulid,
    //     }
    //     break;
    //   case 'Select':
    //     this.componentRef.instance.data = {
    //       props: this.data.props,
    //       ulid: this.data.ulid,
    //     }
    //     break;
    //   case 'Table':
    //     this.componentRef.instance.data = {
    //       props: this.data.props,
    //       behavior: this.data.behavior,
    //       items: this.data.items,
    //       ulid: this.data.ulid,
    //     }
    //     break;
    //   case 'Icon':
    //     this.componentRef.instance.data = {
    //       props: this.data.props,
    //       // behavior: this.data.behavior,
    //       // items: this.data.items,
    //       ulid: this.data.ulid,
    //     }
    //     break;
    //   case 'Checkbox':
    //     this.componentRef.instance.data = {
    //       props: this.data.props,
    //       behavior: this.data.behavior,
    //       // items: this.data.items,
    //       ulid: this.data.ulid,
    //     }
    //     break;
    //   case 'Tabs':
    //     this.componentRef.instance.data = {
    //       props: this.data.props,
    //       behavior: this.data.behavior,
    //       items: this.data.items,
    //       slots: this.data.slots,
    //       ulid: this.data.ulid,
    //     }
    //     break;
    //   case 'Pagination':
    //     this.componentRef.instance.data = {
    //       props: this.data.props,
    //       behavior: this.data.behavior,
    //       // items: this.data.items,
    //       // slots: this.data.slots,
    //       ulid: this.data.ulid,
    //     }
    //     break;
    // }
  }
  changeCBH($event: A) {
    // $event: {
    //   event: Event,
    //   nodes: {
    //     comp: Comp,
    //     el: DOM,
    //     w: N
    //     h: N
    //     x: N
    //     y: N
    //     grid: GridStack
    //   }[]
    //   ...
    // }
    // let curNode = this._componentList.find(item => {
    //   return item.id === $event.nodes[0].id
    // })
    // if (curNode) {
    //   curNode.x = $event.nodes[0].x
    //   curNode.y = $event.nodes[0].y
    //   curNode.w = $event.nodes[0].w
    //   curNode.h = $event.nodes[0].h
    //   clog(curNode)
    //   let gridLayout = {
    //     x: $event.nodes[0].x,
    //     y: $event.nodes[0].y,
    //     w: $event.nodes[0].w,
    //     h: $event.nodes[0].h,
    //   }
    //   this.componentService.setComponentProp('gridLayout', gridLayout)
    //   // 通知父组件
    //   this.change.emit({
    //     ulid: curNode.comp.ulid,
    //     ...gridLayout,
    //   })
    //   // todo 参数改为kv对的object
    //   this.componentService.reqUpdateComponentProps('gridLayout', 'x', $event.nodes[0].x, curNode.comp.ulid)
    //   this.componentService.reqUpdateComponentProps('gridLayout', 'y', $event.nodes[0].y, curNode.comp.ulid)
    //   this.componentService.reqUpdateComponentProps('gridLayout', 'w', $event.nodes[0].w, curNode.comp.ulid)
    //   this.componentService.reqUpdateComponentProps('gridLayout', 'h', $event.nodes[0].h, curNode.comp.ulid)
    // }
  }
  identify(index: number, w: GridStackWidget) {
    return w.id; // or use index if no id is set and you only modify at the end...
    // return index
  }
}
