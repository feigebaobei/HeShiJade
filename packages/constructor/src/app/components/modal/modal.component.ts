import { Component, Input, OnInit, } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { initComponentMeta } from 'src/helper'
// type
import { A } from 'src/types/base';
import type {Component as Comp} from 'src/types/component'
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
      let headerNode = node!.children['header']
      this.childrenHeader = headerNode?.toArray() || []
      let bodyNode = node!.children['body']
      this.childrenBody = bodyNode?.toArray() || []
      let footerNode = node!.children['footer']
      this.childrenFooter = footerNode?.toArray() || []
    }
  }
  dropHeaderH($event: A) {
    let appUlid = this.appService.getCurApp()?.ulid || ''
    let pageUlid = this.pageService.getCurPage()?.ulid || ''
    let component = initComponentMeta($event.dragData.item.componentCategory, appUlid, pageUlid,
      '', '', this.data.ulid, 'header',)
    // 在childrenHeader中增加组件元素
    // clog('component', component)
    // component.slots.header = 
    this.childrenHeader.push(component)
    // 在tree中增加节点
    // let tree = this.componentService.getTreeByKey()
    // tree?.mountChild(component, this.data.ulid, 'header')
    this.componentService.mountComponent(component, this.data.ulid, 'child', 'header')
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
    let component = initComponentMeta($event.dragData.item.componentCategory, appUlid, pageUlid,
      '', '', this.data.ulid, 'body',)
    // 在childrenHeader中增加组件元素
    clog('component', component)
    this.childrenBody.push(component)
    this.componentService.mountComponent(component, this.data.ulid, 'child', 'body')
    clog('tree', this.componentService.getTreeByKey())
    this.componentService.reqPostCompListByPage(component).then(() => {
      clog('成功在远端保存组件')
    }).catch((error) => {
      clog('error', error)
    })
  }
}
