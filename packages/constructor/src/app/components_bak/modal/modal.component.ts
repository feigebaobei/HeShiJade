import { Component, Input, OnInit, } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { initComponentMeta } from 'src/helper'
import { createChildKey } from 'src/helper/index'
// type
import type { A, ULID } from 'src/types/base';
import type {Component as Comp, 
  ComponentMountItems,
  ComponentMountSlots,} from 'src/types/component'
let clog = console.log


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit{
  @Input() data: A
  childrenHeader: Comp[]
  childrenBody: Comp[]
  childrenFooter: Comp[]
  // curComponent: Comp
  constructor(
    private componentService: ComponentService,
    private pageService: PageService,
    private appService: AppService,
  ) {
    this.childrenHeader = []
    this.childrenBody = [
      // {
      //     // "_id": "65f1832ecf67e0f44f098eb1",
      //     // "ulid": "01HRVPGTZ2HK32RM1RH3BCQHJ7",
      //     "ulid": "01HRVPGTZ2HK32RM1RH3BCQHJ8",
      //     "type": "Button",
      //     // "prevUlid": "01HR3Y833FAG8PKCDNQ9QPXCVS",
      //     // "nextUlid": "01HT4B4M99ZXGV7W5VYRKC7RSP",
      //     prevUlid: '',
      //     nextUlid: '',
      //     parentUlid: this.data.ulid || '',
      //     mountPosition: 'body',
      //     "props": {
      //         "type": "button",
      //         "bsSize": "md",
      //         "bordered": true,
      //         "disabled": false,
      //         "width": "150px",
      //         "text": "button sub"
      //     },
      //     "behavior": [
      //         {
      //             "event": "click",
      //             "target": "ulid",
      //             "payload": "{\"visible\": true}"
      //         }
      //     ],
      //     "items": [
      //         {
      //             "category": "input",
      //             "label": "文本",
      //             "value": "button star",
      //             "key": ""
      //         }
      //     ],
      //     "slots": {},
      //     "appUlid": "01HGKPCCA5E5F4DH42ZX8PENY8",
      //     "pageUlid": "01HH8ZXBAXMNC72VBPJ3AWCFPG"
      // }
    ]
    this.childrenFooter = []
    // this.curComponent = {} as Comp
  }
  ngOnInit() {
    // let p = this.componentService.curComponent()
    let tree = this.componentService.getTreeByKey()
    if (tree) {
      let node = tree.find(this.data.ulid)
      clog('node', node)
      // createChildKey('slots', (node?.value.mount as ComponentMountSlots).slotKey, 'node')
      // let headerNode = node!.children['header']
      let headerNode = node?.children[createChildKey('slots', 'header', 'node')]
      this.childrenHeader = headerNode?.toArray() || []
      // let bodyNode = node!.children['body']
      let bodyNode = node?.children[createChildKey('slots', 'body', 'node')]
      this.childrenBody = bodyNode?.toArray() || []
      // let footerNode = node!.children['footer']
      let footerNode = node?.children[createChildKey('slots', 'footer', 'node')]
      this.childrenFooter = footerNode?.toArray() || []
    }
  }
  dropHeaderH($event: A) {
    let appUlid = this.appService.getCurApp()?.ulid || ''
    let pageUlid = this.pageService.getCurPage()?.ulid || ''
    let component = initComponentMeta(
      $event.dragData.item.componentCategory, 
      appUlid, pageUlid,
      '', '', this.data.ulid,
      {area: 'slots', slotKey: 'header'},)
    // 在childrenHeader中增加组件元素
    // clog('component', component)
    // component.slots.header = 
    this.childrenHeader.push(component)
    // 在tree中增加节点
    // let tree = this.componentService.getTreeByKey()
    // tree?.mountChild(component, this.data.ulid, 'header')
    // this.componentService.mountComponent(component, this.data.ulid, 'slots', 'header')
    this.componentService.mountComponent(component)
    // clog('tree', this.componentService.getTreeByKey())
    // 请求保存组件的接口
    this.componentService.reqPostCompListByPage(component).then(() => {
      clog('成功在远端保存组件')
    }).catch((error) => {
      clog('error', error)
    })
  }
  dropH($event: A) {
    let appUlid = this.appService.getCurApp()?.ulid || ''
    let pageUlid = this.pageService.getCurPage()?.ulid || ''
    if (this.childrenBody.length) {
      let component = initComponentMeta(
        $event.dragData.item.componentCategory, 
        appUlid, pageUlid, 
        this.childrenBody[this.childrenBody.length - 1].ulid, '', this.data.ulid,
        {area: 'slots', slotKey: 'body'})
      this.childrenBody.push(component)
      // this.componentService.mountComponent(component, component.prevUlid, 'next')
      this.componentService.mountComponent(component)
      // clog('tree', this.componentService.getTreeByKey())
      this.componentService.reqPostCompListByPage(component).then(() => {
        clog('成功在远端保存组件')
      }).catch((error) => {
        clog('error', error)
      })
    } else {
      let component = initComponentMeta(
        $event.dragData.item.componentCategory, 
        appUlid, pageUlid,
        '', '', this.data.ulid,
        {area: 'slots', slotKey: 'body'})
      // 在childrenHeader中增加组件元素
      clog('component', component)
      this.childrenBody.push(component)
      // this.componentService.mountComponent(component, this.data.ulid, 'slots', 'body')
      this.componentService.mountComponent(component)
      clog('tree', this.componentService.getTreeByKey())
      this.componentService.reqPostCompListByPage(component).then(() => {
        clog('成功在远端保存组件')
      }).catch((error) => {
        clog('error', error)
      })
    }
  }
  deleteComponentByUlidH(ulid: ULID) {
    this.childrenHeader = this.childrenHeader.filter(item => item.ulid !== ulid)
    this.componentService.delete(ulid)
    this.componentService.reqDeleteComponent(ulid)
  }
  bodyDeleteComponentByUlidH(ulid: ULID) {
    this.childrenBody = this.childrenBody.filter(item => item.ulid !== ulid)
    this.componentService.delete(ulid)
    this.componentService.reqDeleteComponent(ulid)

  }
}
