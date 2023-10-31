import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AdDirective } from 'src/app/ad.directive';
// 组件
// import { ButtonComponent } from 'ng-devui';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FormComponent } from 'src/app/components/form/form.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { SelectComponent } from 'src/app/components/select/select.component';
import { TableComponent } from 'src/app/components/table/table.component';
// service
import { ComponentService } from 'src/app/service/component.service';
// type
import type { A, S, Ao } from 'src/types/base';
import type {Component as Comp} from 'src/types/component'
// 数据
import { Button as buttonDefaultData,
  Input as inputDefaultData,
Modal as modalDefaultData,
Select as selectDefaultData,
Form as formDefaultData,
Table as tableDefaultData,
 } from '../../../helper/component'
// 我看到实现动态组件功能时都是引入组件的。
// IconModule应该是引入了一个模块。
// 所有我考虑使用封装全部devui的组件来实现.

let clog = console.log

let compMap: Ao = {
  Button: ButtonComponent,
  Form: FormComponent,
  Input: InputComponent,
  Modal: ModalComponent,
  Select: SelectComponent,
  Table: TableComponent,
}

@Component({
  selector: 'app-comp-box',
  templateUrl: './comp-box.component.html',
  styleUrls: ['./comp-box.component.sass']
})
export class CompBoxComponent implements OnInit, OnDestroy {
  @Input() comp: A
  @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
  // private clearTimer: VoidFunction | undefined;
  curComp?: Comp | null
  componentRef: A
  constructor(private componentService: ComponentService) {
    this.curComp = null
    this.componentRef
    this.componentService.compSubject$.subscribe(p => {
      this.curComp = p
      this.init()
    })
    this.componentService.componentProps$.subscribe(p => {
      this.componentRef.instance.data.props = p
    })
  }
  boxClickh() {
    clog('boxClickh')
    // 选中组件
    this.componentService.setCurComponent(this.comp.ulid)
  }
  ngOnInit() {
    this.init()
  }
  init() {
    console.log('init comp', this.comp)
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    // let componentRef: A
    this.componentRef = viewContainerRef.createComponent(compMap[this.comp.type]);
    switch (this.comp.type) {
      case 'Button':
        this.componentRef.instance.data = {
          props: buttonDefaultData.props,
          slot: buttonDefaultData.slot,
        }
        break
      case 'Input':
        this.componentRef.instance.data = {
          props: inputDefaultData.props
        }
        break
      case 'Modal':
        this.componentRef.instance.data = {
          props: modalDefaultData.props
        }
        break
      case 'Select':
        this.componentRef.instance.data = {
          props: selectDefaultData.props
        }
        break
      case 'Form':
        this.componentRef.instance.data = {
          props: formDefaultData.props
        }
        break
      case 'Table':
        this.componentRef.instance.data = {
          props: tableDefaultData.props
        }
        break
    }
  }
  ngOnChange() {}
  ngOnDestroy() {
    this.adHost.viewContainerRef.clear();
  }

}
