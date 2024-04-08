import { Component, Input, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { AdDirective } from 'src/app/ad.directive';
// 组件
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FormComponent } from 'src/app/components/form/form.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { SelectComponent } from 'src/app/components/select/select.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { HttpClient } from '@angular/common/http';
// service
import { ComponentService } from 'src/app/service/component.service';
// type
import type { A, S, Ao } from 'src/types/base';
import type {Component as Comp} from 'src/types/component'
// 数据
// import { Button as buttonDefaultData,
//   Input as inputDefaultData,
// Modal as modalDefaultData,
// Select as selectDefaultData,
// Form as formDefaultData,
// Table as tableDefaultData,
//  } from '../../../helper/component'
import { ResponseData } from 'src/types';
import { PageService } from 'src/app/service/page.service';
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
  constructor(
    // private pageService: PageService,
    private componentService: ComponentService,
    private http: HttpClient,
  ) {
    this.curComp = null
    this.componentRef
    this.componentService.curComponent$.subscribe(p => {
      this.curComp = p
      // this.init()
      this.update()
    })
    // this.componentService.componentProps$.subscribe(p => {
    //   this.componentRef.instance.data.props = p
    // })
  }
  boxClickh($event: A) {
    // 选中组件
    $event.stopPropagation()
    this.componentService.setCurComponent(this.comp.ulid)
  }
  ngOnInit() {
    this.init()
  }
  init() {
    const viewContainerRef = this.adHost.viewContainerRef;
    viewContainerRef.clear();
    // let componentRef: A
    this.componentRef = viewContainerRef.createComponent(compMap[this.comp.type]);
    switch (this.comp.type) {
      case 'Button':
        this.componentRef.instance.data = {
          // props: buttonDefaultData.props,
          // slot: buttonDefaultData.slot,
          props: this.comp.props,
          slots: this.comp.slots,
          // items: this.comp.items,
          ulid: this.comp.ulid,
        }
        break
      case 'Input':
        this.componentRef.instance.data = {
          // props: inputDefaultData.props
          props: this.comp.props,
          ulid: this.comp.ulid,
        }
        break
      case 'Modal':
        this.componentRef.instance.data = {
          // props: modalDefaultData.props
          props: this.comp.props,
          // items: this.comp.items,
          slots: this.comp.slots,
          ulid: this.comp.ulid,
        }
        break
      case 'Select':
        this.componentRef.instance.data = {
          props: this.comp.props,
          ulid: this.comp.ulid,
        }
        break
      case 'Form':
        this.componentRef.instance.data = {
          props: this.comp.props,
          items: this.comp.items,
          ulid: this.comp.ulid,
        }
        break
      case 'Table':
        this.componentRef.instance.data = {
          props: this.comp.props,
          items: this.comp.items,
          ulid: this.comp.ulid,
        }
        break
    }
  }
  update() {
    if (this.comp.ulid === this.curComp?.ulid) {
      this.init()
    }
    // this.componentRef.instance.data = {
    //   props: data.props
    // }
  }
  ngOnChange() {}
  ngOnDestroy() {
    this.adHost.viewContainerRef.clear();
  }
  deleteButtonClickH() {
    // 应该调用service中的方法
    if (this.curComp) {
      this.componentService.delete(this.curComp.ulid)
      this.http.delete<ResponseData>('http://localhost:5000/components', {
        params: {
          ulid: this.curComp?.ulid || ''
        },
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          clog('删除成功')
        }
      })
    }
  }
}
