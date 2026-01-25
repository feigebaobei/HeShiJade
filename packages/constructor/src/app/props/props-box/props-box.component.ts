import { Component, effect, ViewChild } from '@angular/core';
import { PropsDirective } from '../props.directive';
import { ComponentService } from 'src/app/service/component.service';
import { cloneDeep, copy } from 'src/helper';
import { text } from 'src/helper/config';
import { Queue } from 'data-footstone';
// type
import type {Component as Comp, } from 'src/types/component'
import type { PropsConfigItem, Text } from 'src/types/config'
import type { A, ConfigItem, S, F, B, } from 'src/types/base';
// data
// import * as 
import {
  Button as buttonPropsMeta,
  Input as inputPropsMeta,
  Select as selectPropsMeta,
  Modal as modalPropsMeta,
  Form as formPropsMeta,
  Table as tablePropsMeta,
  Icon as iconPropsMeta,
  Checkbox as CheckPropsMeta,
  Tabs as TabsPropsMeta,
  Pagination as PaginationPropsMeta,
  Flex as FlexPropsMeta,
  Grid as GridPropsMeta,
  Layout as LayoutPropsMeta,
  PageList as PageListPropsMeta,
  ShowHide as ShowHidePropsMeta,
  Loop as LoopPropsMeta,
  InputNumber as InputNumberPropsMeta,
  Radio as RadioPropsMeta,
  Avatar as AvatarPropsMeta,
  Card as CardPropsMeta,
  Paragraph as ParagraphPropsMeta,
  Span as SpanPropsMeta,
  ImagePreview as ImagePreviewMeta,
  Accordion as AccordionMeta,
  Breadcrumb as BreadcrumbMeta,
  Cascader as CascaderMeta,
  DatePicker as DatePickerMeta,
  DateRangePicker as DateRangePickerMeta,
  TimePicker as TimePickerMeta,
  Slider as SliderMeta,
  Textarea as TextareaMeta,
  Toggle as ToggleMeta,
  Drawer as DrawerMeta,
  Badge as BadgeMeta,
  Progress as ProgressMeta,
  Rate as RateMeta,
} from '../../../helper/props'

let clog = console.log

type relationTargetKey = Queue<ConfigItem>

@Component({
  selector: 'app-props-box',
  templateUrl: './props-box.component.html',
  styleUrls: ['./props-box.component.sass']
})
export class PropsBoxComponent {
  @ViewChild(PropsDirective, {static: true}) propsDirective!: PropsDirective
  curComp?: Comp | null
  // componentPropsMeta: CPMR
  componentPropsMeta: PropsConfigItem = {
    key: {
      category: 'select',
      options: [
          {label: 'button', value: 'button'},
          {label: 'submit', value: 'submit'},
          {label: 'reset', value: 'reset'},
      ],
      value: 'button',
      label: '类型',
      key: '',
    },
  }
  componentPropsList: ConfigItem[]
  msg: {}[]
  propsMap: Map<S, relationTargetKey>
  text: Text
  propsObj: Comp['props']
  constructor(private componentService: ComponentService) {
    this.curComp = null
    this.componentPropsList = []
    this.msg = []
    this.propsMap = new Map()
    this.text = text
    this.propsObj = {}
    effect(() => {
      let p = this.componentService.curComponentS.get()
      this.curComp = p
      this.componentSelectedChange()
    })
  }
  ngOnInit() {
  }
  initPropsObj() {
    this.componentPropsList.forEach(item => {
      this.propsObj[item.key] = item.value
    })
  }
  opComponentPropsList(meta: PropsConfigItem) {
    Object.values(meta).forEach(item => {
      switch (item.category) {
        case 'options':
          item.value = this.curComp?.props[item.key].map((valueObj: A) => {
            return Object.assign(cloneDeep(item.template), valueObj)
          })
          break;
        default:
          item.value = this.curComp?.props[item.key]
          break;
      }
      this.componentPropsList.push(item)
    })
    this.initPropsObj()
    // clog('this.propsObj', this.componentPropsList, this.propsObj, JSON.stringify(this.propsObj))
    this.componentPropsList.forEach(item => {
      if (item.hideListenerKey) {
        if (item.hide) {
          item.hideCalc = item.hide(this.propsObj)
        }
      }
    })
  }
  componentSelectedChange() {
    // 先清空
    this.componentPropsList = []
    // 再赋值
    // 取出模板再赋值当前值
    // todo 可优化为从map对象中取映射值
    // todo 优化为从配置文件中取出可配置项
    switch(this.curComp?.type) {
      case 'Button':
        this.opComponentPropsList(buttonPropsMeta)
        break
      case 'Input':
        this.opComponentPropsList(inputPropsMeta)
        break
      case 'Select':
        this.opComponentPropsList(selectPropsMeta)
        break
      case 'Modal':
        this.opComponentPropsList(modalPropsMeta)
        break
      case 'Form':
        this.opComponentPropsList(formPropsMeta)
        break
      case 'Table':
        this.opComponentPropsList(tablePropsMeta)
        break;
      case 'Icon':
        this.opComponentPropsList(iconPropsMeta)
        break;
      case 'Checkbox':
        this.opComponentPropsList(CheckPropsMeta)
        break;
      case 'Tabs':
        this.opComponentPropsList(TabsPropsMeta)
        break;
      case 'Pagination':
        this.opComponentPropsList(PaginationPropsMeta)
        break;
      case 'Flex':
        this.opComponentPropsList(FlexPropsMeta)
        break;
      case 'Grid':
        this.opComponentPropsList(GridPropsMeta)
        break;
      case 'Layout':
        this.opComponentPropsList(LayoutPropsMeta)
        break;
      case 'PageList':
        this.opComponentPropsList(PageListPropsMeta)
        break;
      case 'ShowHide':
        this.opComponentPropsList(ShowHidePropsMeta)
        break;
      case 'Loop':
        this.opComponentPropsList(LoopPropsMeta)
        break;
      case 'InputNumber':
        this.opComponentPropsList(InputNumberPropsMeta)
        break;
      case 'Radio':
        this.opComponentPropsList(RadioPropsMeta)
        break;
      case 'Avatar':
        this.opComponentPropsList(AvatarPropsMeta)
        break;
      case 'Card':
        this.opComponentPropsList(CardPropsMeta)
        break;
      case 'Paragraph':
        this.opComponentPropsList(ParagraphPropsMeta)
        break;
      case 'Span':
        this.opComponentPropsList(SpanPropsMeta)
        break;
      case 'ImagePreview':
        this.opComponentPropsList(ImagePreviewMeta)
        break;
      case 'Accordion':
        this.opComponentPropsList(AccordionMeta)
        break;
      case 'Breadcrumb':
        this.opComponentPropsList(BreadcrumbMeta)
        break;
      case 'Cascader':
        this.opComponentPropsList(CascaderMeta)
        break;
      case 'DatePicker':
        this.opComponentPropsList(DatePickerMeta)
        break;
      case 'DateRangePicker':
        this.opComponentPropsList(DateRangePickerMeta)
        break;
      case 'TimePicker':
        this.opComponentPropsList(TimePickerMeta)
        break;
      case 'Slider':
        this.opComponentPropsList(SliderMeta)
        break;
      case 'Textarea':
        this.opComponentPropsList(TextareaMeta)
        break;
      case 'Toggle':
        this.opComponentPropsList(ToggleMeta)
        break;
      case 'Drawer':
        this.opComponentPropsList(DrawerMeta)
        break;
      case 'Badge':
        this.opComponentPropsList(BadgeMeta)
        break;
      case 'Progress':
        this.opComponentPropsList(ProgressMeta)
        break;
      case 'Rate':
        this.opComponentPropsList(RateMeta)
        break;
      default:
        this.componentPropsMeta = {}
        break
    }
    // this.componentPropsList
    //  = this.componentPropsList.map(item => {
    //   // let f = item.hide
    //   // if (f) {
    //   //   return {
    //   //     ...item,
    //   //     hideCalc: f(this.componentPropsList)
    //   //   }
    //   // } else {
    //   //   return {
    //   //     ...item,
    //   //     hideCalc: false
    //   //   }
    //   // }
    // })
    this.componentPropsList.forEach(item => {
      if (item.hideListenerKey) {
        if (this.propsMap.has(item.hideListenerKey)) {
          this.propsMap.get(item.hideListenerKey)?.enqueue(item)
        } else {
          let q: relationTargetKey = new Queue()
          q.enqueue(item)
          this.propsMap.set(item.hideListenerKey, q)
        }
      }
    })
  }
  compUlidClickH (ref: HTMLElement) {
    copy(ref.innerText).then(() => {
      this.msg = [{ severity: 'success', summary: '', content: '已经复制' }];
    })
  }
  listenerChange(listenerKey: S) {
    let q = this.propsMap.get(listenerKey)
    if (q) {
      q.toArray().forEach(item => {
        let b: B
        if (item.hide) {
          b = item.hide(this.propsObj)
          item.hideCalc = b
        } else {
          item.hideCalc = false
        }
      })
    }
  }
  itemChangeH(p: A) {
    // this.componentPropsList.forEach(item => {
    //   if (item.key === p.key) {
    //     item.value = p.value
    //     this.componentService.setProps(item.key, item.value)
    //   }
    // })
    this.initPropsObj()
    this.listenerChange(p.key)
  }

  identify(index: number, w: ConfigItem) {
    // return w.id; // or use index if no id is set and you only modify at the end...
    return w.key
  }
}
