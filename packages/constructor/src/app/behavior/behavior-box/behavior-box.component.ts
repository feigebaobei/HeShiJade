import { Component, effect } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { cloneDeep, compatibleArray, } from 'src/helper/index'
import addableAll from 'src/helper/addable'
import {
  Button as buttonBehaviorMeta,
  Modal as modalBehaviorMeta,
  Input as inputBehaviorMeta,
  Form as FormBehaviorMeta,
  Table as TableBehaviorMeta,
  Select as SelectBehaviorMeta,
  Icon as IconBehaviorMeta,
  Checkbox as CheckboxBehaviorMeta,
  Tabs as TabsBehaviorMeta,
  Pagination as PaginationBehaviorMeta,
  Flex as FlexBehaviorMeta,
  Grid as GridBehaviorMeta,
  Page as PageBehaviorMeta,
  Layout as LayoutBehaviorMeta,
  PageList as PageListBehaviorMeta,
  ShowHide as ShowHideBehaviorMeta,
  Loop as LoopBehaviorMeta,
  InputNumber as InputNumberBehaviorMeta,
  Radio as RadioBehaviorMeta,
  Avatar as AvatarBehaviorMeta,
  Card as CardBehaviorMeta,
  Paragraph as ParagraphBehaviorMeta,
  Span as SpanBehaviorMeta,
  ImagePreview as ImagePreviewBehaviorMeta,
} from 'src/helper/behavior'
import behaviorTemplate from 'src/helper/behavior'
import { PageService } from 'src/app/service/page.service';
import { text } from 'src/helper/config';
import type { Component as Comp, BehaviorMetaItem } from 'src/types/component';
import type { BehaviorConfigGroup, Text } from 'src/types/config'
import type { B, N } from 'src/types/base';
// type keyType = 'event' | 'target' | 'payload'

let clog = console.log

@Component({
  selector: 'app-behavior-box',
  templateUrl: './behavior-box.component.html',
  styleUrls: ['./behavior-box.component.sass']
})
export class BehaviorBoxComponent {
  componentBehaviorList: BehaviorConfigGroup[]
  curComp?: Comp | null
  componentBehaviorMeta: BehaviorConfigGroup
  addable: B
  text: Text
  constructor(private componentService: ComponentService,
    private pageService: PageService,
  ) {
    this.addable = false
    this.componentBehaviorMeta = [
      {
        category: 'select',
        options: [],
        value: '',
        label: '事件',
        key: '',
      },
      {
        category: 'textarea',
        value: '',
        label: '',
        key: '',
      }
    ]
    this.componentBehaviorList = []
    this.text = text
    effect(() => {
      let comp = this.componentService.curComponentS.get()
      let page = this.pageService.pageS.get()
      if (comp) {
        this.curComp = comp
        this.curComponentChange()
        this.addable = addableAll[comp.type].behavior
      } else if (page) {
        this.curComp = null
        this.curComponentChange()
        this.addable = addableAll['Page'].behavior
      }
    })
  }
  setComponentBehaviorListByType(compBehaviorMeta: BehaviorConfigGroup) {
    this.curComp!.behavior.forEach(item => {
      let arr: BehaviorConfigGroup = cloneDeep(compBehaviorMeta)
      Object.entries(item).forEach(([k, v]) => {
        let o = arr.find(item => item.key === k)
        if (o) {
          o.value = v
        }
      })
      this.componentBehaviorList.push(arr)
    })
  }
  setPageBehaviorListByType(compBehaviorMeta: BehaviorConfigGroup) {
    let page = this.pageService.getCurPage()
    if (page) {
      compatibleArray(page.behavior).forEach((item: (typeof page.behavior)[number]) => {
        let arr: BehaviorConfigGroup = cloneDeep(compBehaviorMeta)
        Object.entries(item).forEach(([k, v]) => {
          let o = arr.find(item => item.key === k)
          if (o) {
            o.value = v
          }
        })
        this.componentBehaviorList.push(arr)
      })
    }
  }
  curComponentChange() {
    this.componentBehaviorList = []
    switch (this.curComp?.type) {
      case 'Button':
        this.setComponentBehaviorListByType(buttonBehaviorMeta)
        break;
      case 'Modal':
        this.setComponentBehaviorListByType(modalBehaviorMeta)
        break;
      case 'Input':
        this.setComponentBehaviorListByType(inputBehaviorMeta)
        break;
      case 'Select':
        this.setComponentBehaviorListByType(SelectBehaviorMeta)
        break;
      case 'Form':
        this.setComponentBehaviorListByType(FormBehaviorMeta)
        break;
      case 'Table':
        this.setComponentBehaviorListByType(TableBehaviorMeta)
        break;
      case 'Icon':
        this.setComponentBehaviorListByType(IconBehaviorMeta)
        break;
      case 'Checkbox':
        this.setComponentBehaviorListByType(CheckboxBehaviorMeta)
        break;
      case 'Tabs':
        this.setComponentBehaviorListByType(TabsBehaviorMeta)
        break;
      case 'Pagination':
        this.setComponentBehaviorListByType(PaginationBehaviorMeta)
        break;
      case 'Flex':
        this.setComponentBehaviorListByType(FlexBehaviorMeta)
        break;
      case 'Grid':
        this.setComponentBehaviorListByType(GridBehaviorMeta)
        break;
      case 'Layout':
        this.setComponentBehaviorListByType(LayoutBehaviorMeta)
        break;
      case 'PageList':
        this.setComponentBehaviorListByType(PageListBehaviorMeta)
        break;
      case 'ShowHide':
        this.setComponentBehaviorListByType(ShowHideBehaviorMeta)
        break;
      case 'Loop':
        this.setComponentBehaviorListByType(LoopBehaviorMeta)
        break;
      case 'InputNumber':
        this.setComponentBehaviorListByType(InputNumberBehaviorMeta)
        break;
      case 'Radio':
        this.setComponentBehaviorListByType(RadioBehaviorMeta)
        break;
      case 'Avatar':
        this.setComponentBehaviorListByType(AvatarBehaviorMeta)
        break;
      case 'Card':
        this.setComponentBehaviorListByType(CardBehaviorMeta)
        break;
      case 'Paragraph':
        this.setComponentBehaviorListByType(ParagraphBehaviorMeta)
        break;
      case 'Span':
        this.setComponentBehaviorListByType(SpanBehaviorMeta)
        break;
      case 'ImagePreview':
        this.setComponentBehaviorListByType(ImagePreviewBehaviorMeta)
        break;
      default:
        this.setPageBehaviorListByType(PageBehaviorMeta)
        break;
      }
  }
  addH() {
    let group: BehaviorConfigGroup = [] // as BehaviorConfigGroup
    if (this.curComp) {
      Object.values(behaviorTemplate[this.curComp.type]).forEach((item) => {
        group.push(cloneDeep(item))
      })
      this.componentBehaviorList.push(group)
      let o: BehaviorMetaItem = {}
      group.forEach(item => {
        o[item.key] = item.value
      })
      this.componentService.addBehaviorOfCurComponent(o)
      this.componentService.reqAddBehavior(o)
    } else {
      Object.values(behaviorTemplate['Page']).forEach((item) => {
        group.push(cloneDeep(item))
      })
      this.componentBehaviorList.push(group)
      let o: BehaviorMetaItem = {}
      group.forEach(item => {
        o[item.key] = item.value
      })
      // todo 测试添加组件
      this.pageService.addBehaviorOfCurPage(o)
      this.pageService.reqAddBehavior(o)
    }
  }
  removeH(i: N) {
    this.componentBehaviorList.splice(i, 1)
    if (this.curComp) {
      this.componentService.removeBehaviorOfCurComponent(this.pageService.getCurPage()!.ulid, this.curComp!.ulid, i)
      this.componentService.reqRemoveBehavior(this.curComp!.ulid, i)
    } else {
      this.pageService.removeBehaviorOfCurPage(i)
      this.pageService.reqRemoveBehavior(this.pageService.getCurPage()!.ulid, i)
    }
  }
}
