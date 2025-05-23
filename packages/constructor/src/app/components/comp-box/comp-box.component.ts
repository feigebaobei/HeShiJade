import { Component, Input, Output, ViewChild, OnInit, AfterViewInit, OnDestroy, EventEmitter, AfterContentInit, AfterViewChecked, computed, effect } from '@angular/core';
import { CompDirective } from '../comp.directive'
// 组件
import { ButtonComponent } from '../button/button.component';
import { FormComponent } from '../form/form.component';
import { InputComponent } from '../input/input.component';
import { ModalComponent } from '../modal/modal.component';
import { SelectComponent } from '../select/select.component';
import { TableComponent } from '../table/table.component';
import { IconComponent } from '../icon/icon.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { TabsComponent } from '../tabs/tabs.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { FlexComponent } from '../flex/flex.component';
import { GridComponent } from '../grid/grid.component';
import { LayoutComponent } from '../layout/layout.component';
import { PageListComponent } from '../page-list/page-list.component';
import { ShowHideComponent } from '../show-hide/show-hide.component';
import { LoopComponent } from '../loop/loop.component';
// service
import { PageService } from 'src/app/service/page.service';
import { ComponentService } from 'src/app/service/component.service';
// type
import type { A, S, Oa, ULID } from 'src/types/base';
import type {Component as Comp} from 'src/types/component'
import type { Page } from 'src/types/page';
// 数据
// import { Button as buttonDefaultData,
//   Input as inputDefaultData,
// Modal as modalDefaultData,
// Select as selectDefaultData,
// Form as formDefaultData,
// Table as tableDefaultData,
//  } from '../../../helper/component'
// import { ResponseData } from 'src/types';
// import { PageService } from 'src/app/service/page.service';
// 我看到实现动态组件功能时都是引入组件的。
// IconModule应该是引入了一个模块。
// 所有我考虑使用封装全部devui的组件来实现.

let clog = console.log

let compMap: Oa = {
  Button: ButtonComponent,
  Form: FormComponent,
  Input: InputComponent,
  Modal: ModalComponent,
  Select: SelectComponent,
  Table: TableComponent,
  Icon: IconComponent,
  Checkbox: CheckboxComponent,
  Tabs: TabsComponent,
  Pagination: PaginationComponent,
  Flex: FlexComponent,
  Grid: GridComponent,
  Layout: LayoutComponent,
  PageList: PageListComponent,
  ShowHide: ShowHideComponent,
  Loop: LoopComponent,
}

@Component({
  selector: 'app-comp-box',
  templateUrl: './comp-box.component.html',
  styleUrls: ['./comp-box.component.sass']
})
export class CompBoxComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit {
  @Input() comp!: Comp
  @ViewChild(CompDirective, {static: true, }) compHost!: CompDirective; // 正常运行
  @Output() deleteComp = new EventEmitter<ULID>()
  curComp?: Comp | null
  componentRef: A
  curPage: Page
  // propsSReadonly: A
  constructor(
    private componentService: ComponentService,
    private pageService: PageService
    // private http: HttpClient,
  ) {
    this.curComp = null
    this.componentRef
    effect(() => {
      let p = this.componentService.curComponentS.get()
      this.curComp = p
    })
    this.curPage = this.pageService.getCurPage()!
    // this.propsSReadonly = this.componentService.propsSReadonly
    // this.componentService.props$.subscribe((v) => {
    //   if (this.comp.ulid === v.componentUlid) {
    //     this.init()
    //   }
    // })
    effect(() => {
      let v = this.componentService.propsS.get()
      if (this.comp.ulid === v?.componentUlid) {
        this.init()
      }
    })
  }
  ngOnInit() {
  }
  init() {
    if (!this.compHost) return
    const viewContainerRef = this.compHost.viewContainerRef;
    viewContainerRef.clear();
    // let componentRef: A
    clog('sss', this.comp.type)
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
          mount: this.comp.mount,
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
          ulid: this.comp.ulid,
          props: this.comp.props,
          items: this.comp.items,
          mount: this.comp.mount,
        }
        break
      case 'Table':
        this.componentRef.instance.data = {
          props: this.comp.props,
          items: this.comp.items,
          slots: this.comp.slots,
          ulid: this.comp.ulid,
        }
        break
      case 'Icon':
        this.componentRef.instance.data = {
          props: this.comp.props,
          ulid: this.comp.ulid,
        }
        break
      case 'Checkbox':
        this.componentRef.instance.data = {
          props: this.comp.props,
          // behavior: this.comp.behavior, // 搭建侧可以不需要使用行为
          ulid: this.comp.ulid,
        }
        break
      case 'Tabs':
        this.componentRef.instance.data = {
          props: this.comp.props,
          items: this.comp.items,
          slots: this.comp.slots,
          ulid: this.comp.ulid,
        }
        break
      case 'Pagination':
        this.componentRef.instance.data = {
          props: this.comp.props,
          items: this.comp.items,
          ulid: this.comp.ulid,
        }
        break
      case 'Flex':
        this.componentRef.instance.data = {
          props: this.comp.props,
          slots: this.comp.slots,
          items: this.comp.items,
          ulid: this.comp.ulid,
        }
        break;
      case 'Grid':
        this.componentRef.instance.data = {
          props: this.comp.props,
          slots: this.comp.slots,
          items: this.comp.items,
          ulid: this.comp.ulid,
        }
        break;
      case 'Layout':
        this.componentRef.instance.data = {
          props: this.comp.props,
          slots: this.comp.slots,
          items: this.comp.items,
          ulid: this.comp.ulid,
        }
        break;
      case 'PageList':
        this.componentRef.instance.data = {
          props: this.comp.props,
          slots: this.comp.slots,
          items: this.comp.items,
          ulid: this.comp.ulid,
        }
        break
      case 'ShowHide':
        this.componentRef.instance.data = {
          props: this.comp.props,
          slots: this.comp.slots,
          ulid: this.comp.ulid,
        }
        break;
      case 'Loop':
        this.componentRef.instance.data = {
          props: this.comp.props,
          slots: this.comp.slots,
          ulid: this.comp.ulid,
        }
        break;
    }
  }
  ngAfterViewInit() {
  }
  ngAfterContentInit() {
    this.init()
  }
  ngAfterViewChecked(): void {
  }
  // update() { // 通常指的是当Angular更新DOM或执行数据绑定
  // }
  // ngOnChanges() {
  // }
  ngOnDestroy() {
    this.compHost.viewContainerRef.clear();
  }
}
