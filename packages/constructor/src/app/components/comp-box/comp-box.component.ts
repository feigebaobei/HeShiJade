import { Component, Input, Output, ViewChild, OnInit, AfterViewInit, OnDestroy, EventEmitter, AfterContentInit, AfterViewChecked } from '@angular/core';
// import { AdDirective } from 'src/app/ad.directive';
import { CompDirective } from '../comp.directive'
// 组件
import { ButtonComponent } from '../button/button.component';
import { FormComponent } from '../form/form.component';
import { InputComponent } from '../input/input.component';
import { ModalComponent } from '../modal/modal.component';
import { SelectComponent } from '../select/select.component';
import { TableComponent } from '../table/table.component';

// service
import { ComponentService } from 'src/app/service/component.service';
// type
import type { A, S, Ao, ULID } from 'src/types/base';
import type {Component as Comp} from 'src/types/component'
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

let compMap: Ao = {
  Button: ButtonComponent,
  Form: FormComponent,
  Input: InputComponent,
  Modal: ModalComponent,
  Select: SelectComponent,
  Table: TableComponent,
}

@Component({
  selector: 'app-comp-boxx',
  templateUrl: './comp-box.component.html',
  styleUrls: ['./comp-box.component.sass']
})
export class CompBoxComponent implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentInit {
  @Input() comp!: Comp
  // @ViewChild(CompDirective, {static: true}) compHost!: CompDirective;
  // @ViewChild(AdDirective, {static: true}) adHost!: AdDirective;
  // @ViewChild(CompDirective, {static: false, read: ElementRef}) compHost!: CompDirective; // 返回undefined
  @ViewChild(CompDirective, {static: true, }) compHost!: CompDirective; // 正常运行
  // @ViewChild(AdDirective, {static: false, read: ElementRef}) adHost!: AdDirective;
  // private clearTimer: VoidFunction | undefined;
  @Output() deleteComp = new EventEmitter<ULID>()
  curComp?: Comp | null
  componentRef: A
  constructor(
    private componentService: ComponentService,
    // private http: HttpClient,
  ) {
    this.curComp = null
    this.componentRef
    this.componentService.curComponent$.subscribe(p => {
      this.curComp = p
      this.update()
    })
  }
  boxClickh($event: A) {
    // 选中组件
    $event.stopPropagation()
    clog(this.comp)
    this.componentService.setCurComponent(this.comp.ulid)
  }
  ngOnInit() {
    // this.init()
  }
  init() {
    // components模块内
    // clog('components模块内', compMap, this.comp, compMap[this.comp.type])
    // clog('components模块内', this.adHost) // undefined
    clog('components模块内', this.compHost) 
    if (!this.compHost) return
    const viewContainerRef = this.compHost.viewContainerRef;
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
          props: this.comp.props,
          items: this.comp.items,
          ulid: this.comp.ulid,
          mount: this.comp.mount,
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
  ngAfterViewInit() {
    // this.init()
    // setTimeout(() => {
    //   this.init()
    // }, 2000)
    // console.log(this.compHost);
  }
  ngAfterContentInit() {
    this.init()
  }
  ngAfterViewChecked(): void {
    clog('ngAfterViewChecked', this.compHost)
  }
  update() {
    if (this.comp.ulid === this.curComp?.ulid) {
      this.init()
    }
  }
  ngOnChange() {
    // this.init()
  }
  ngOnDestroy() {
    this.compHost.viewContainerRef.clear();
  }
  deleteButtonClickH() {
    this.deleteComp.emit(this.curComp?.ulid)
  }
}
