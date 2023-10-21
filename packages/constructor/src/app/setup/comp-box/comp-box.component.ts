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
  private clearTimer: VoidFunction | undefined;
  curComp?: Comp | null
  constructor(private componentService: ComponentService) {
    this.curComp = null
    this.componentService.compSubject$.subscribe(p => {
      this.curComp = p
    })
  }
  boxClickh() {
    clog('boxClickh')
    // 选中组件
    this.componentService.setCurComponent(this.comp.ulid)
  }
  ngOnInit() {
    this.init()
    // clog('IconModule, CompItemComponent', IconModule, CompItemComponent, IconComponent, DevUIModule)
    // clog('IconModule, CompItemComponent', DevUIModule)
  }
  init() {
    clog(234, this.comp)
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();

    // const componentRef = viewContainerRef.createComponent(CompItemComponent);
    // const componentRef = viewContainerRef.createComponent(IconComponent);
    // const componentRef = viewContainerRef.createComponent(ButtonComponent);
    const componentRef: A = viewContainerRef.createComponent(compMap[this.comp.type as S]);
    // componentRef.instance.data = {
    //   slot: 'hi'
    // };
    this.initProps(componentRef.instance)
    clog('componentRef', componentRef)
  }
  initProps(instance: A) {
    switch (this.comp.type) {
      case 'Button':
        instance.data = {
          slot: this.comp.slot,
          ...this.comp.props
        }
        break
    }
  }
  ngOnDestroy() {
    // this.clearTimer?.();
    this.adHost.viewContainerRef.clear();
  }

}
