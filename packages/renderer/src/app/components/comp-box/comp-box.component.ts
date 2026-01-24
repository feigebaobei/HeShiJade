import { Component, Input, ViewChild } from '@angular/core';
// 指令
// import { StackDirective } from 'src/app/stack.directive';
import { StackDirective } from '../stack.directive';
// 组件
import { ButtonComponent } from 'src/app/components/button/button.component';
import { FormComponent } from 'src/app/components/form/form.component';
import { ModalComponent } from 'src/app/components/modal/modal.component';
import { InputComponent } from 'src/app/components/input/input.component';
import { SelectComponent } from 'src/app/components/select/select.component';
import { TableComponent } from 'src/app/components/table/table.component';
import { IconComponent } from 'src/app/components/icon/icon.component';
import { CheckboxComponent } from 'src/app/components/checkbox/checkbox.component';
import { TabsComponent } from '../tabs/tabs.component';
import { PaginationComponent } from '../pagination/pagination.component';
import { FlexComponent } from '../flex/flex.component';
import { GridComponent } from '../grid/grid.component';
import { LayoutComponent } from '../layout/layout.component';
import { PageListComponent } from '../page-list/page-list.component';
import { ShowHideComponent } from '../show-hide/show-hide.component';
import { LoopComponent } from '../loop/loop.component';
import { InputNumberComponent } from '../input-number/input-number.component';
import { RadioComponent } from '../radio/radio.component';
import { AvatarComponent } from '../avatar/avatar.component';
import { CardComponent } from '../card/card.component';
import { ParagraphComponent } from '../paragraph/paragraph.component';
import { SpanComponent } from '../span/span.component';
import { ImagePreviewComponent } from '../image-preview/image-preview.component';
import { AccordionComponent } from '../accordion/accordion.component';
import { BreadcrumbComponent } from '../breadcrumb/breadcrumb.component';
import { CascaderComponent } from '../cascader/cascader.component';
import { DatePickerComponent } from '../date-picker/date-picker.component';
import { TimePickerComponent } from '../time-picker/time-picker.component';
import { DateRangePickerComponent } from '../date-range-picker/date-range-picker.component';
import { SliderComponent } from '../slider/slider.component';
import { TextareaComponent } from '../textarea/textarea.component';
// type
import type { A, N, S } from 'src/types/base';
import type { Component as Comp, } from 'src/types/component';

let clog = console.log

// data
let compMap: {[k: S]: A} = {
  Button: ButtonComponent,
  Form: FormComponent,
  Modal: ModalComponent,
  Input: InputComponent,
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
  InputNumber: InputNumberComponent,
  Radio: RadioComponent,
  Avatar: AvatarComponent,
  Card: CardComponent,
  Paragraph: ParagraphComponent,
  Span: SpanComponent,
  ImagePreview: ImagePreviewComponent,
  Accordion: AccordionComponent,
  Breadcrumb: BreadcrumbComponent,
  Cascader: CascaderComponent,
  DatePicker: DatePickerComponent,
  DateRangePicker: DateRangePickerComponent,
  TimePicker: TimePickerComponent,
  Slider: SliderComponent,
  Textarea: TextareaComponent,
}

@Component({
  selector: 'app-comp-box',
  templateUrl: './comp-box.component.html',
  styleUrls: ['./comp-box.component.sass']
})
export class CompBoxComponent {
  // @Input() data: A
  @Input() data!: Comp
  @Input() loopIndex: N = -1
  @ViewChild(StackDirective, {static: true}) stack!: StackDirective;
  componentRef: A
  constructor() {
    // let componentRef
  }
  ngOnInit() {
    this.init()
  }
  init() {
    let viewContainerRef = this.stack.viewContainerRef
    viewContainerRef.clear()
    // this.componentRef = viewContainerRef.createComponent(ButtonComponent)
    // this.componentRef.instance.data = {
    //   props: {
    //     type: 'button',
    //     bsSize: 'md',
    //     bordered: true,
    //     disabled: false,
    //     width: '100px',
    // },
    //   slot: 'button',
    // }
    this.componentRef = viewContainerRef.createComponent(compMap[this.data.type])
    switch(this.data.type) {
      case 'Button':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Form':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Modal':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Input':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        this.componentRef.instance.loopIndex = this.loopIndex
        break;
      case 'Select':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Table':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Icon':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Checkbox':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Tabs':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Pagination':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Flex':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Grid':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Layout':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'PageList':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'ShowHide':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          // items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Loop':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          // items: this.data.items,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'InputNumber':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Radio':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Avatar':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Card':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Paragraph':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          // slots: this.data.slots,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Span':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'ImagePreview':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Accordion':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Breadcrumb':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Cascader':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'DatePicker':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'DateRangePicker':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'TimePicker':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Slider':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
      case 'Textarea':
        this.componentRef.instance.data = {
          props: this.data.props,
          behavior: this.data.behavior,
          items: this.data.items,
          ulid: this.data.ulid,
          pageUlid: this.data.pageUlid,
        }
        break;
    }
  }
}
