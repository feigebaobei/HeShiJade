import { Component, ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { asyncFn, createChildKey } from 'src/helper/index'
import { A, B } from 'src/types/base';
import { Component as Comp } from 'src/types/component';

let clog = console.log


@Component({
  selector: 'app-modal-comp',
  templateUrl: './modal-comp.component.html',
  styleUrls: ['./modal-comp.component.sass']
})
export class ModalCompComponent implements OnInit{
  @Input() data: A
  componenntListHeader: Comp[]
  componenntListBody: Comp[]
  componenntListFooter: Comp[]
  show: B
  parent: HTMLElement
  // @Output() close = new EventEmitter()
  constructor(
    private componentService: ComponentService,
    private elr: ElementRef,
  ) {
    this.componenntListHeader = []
    this.componenntListBody = []
    this.componenntListFooter = []
    this.show = true
    this.parent = this.elr.nativeElement.parentElement; // 关闭方法没用到它
  }
  iconClickH(event: Event) {
    // this.close.emit()
    this.data.onClose(event)
  }
  ngOnInit() {
    new Promise((s, _j) => {
      s(true)
    }).then(() => {
      this.show = false
      let tree = this.componentService.getTreeByKey()
      // clog('data', this.data)
      if (tree) {
        let node = tree.find(this.data.ulid)
        // clog('node', node)
        let headerKey = createChildKey('slots', 'header', 'node')
        let bodyKey = createChildKey('slots', 'body', 'node')
        let footerKey = createChildKey('slots', 'footer', 'node')
        let headerNode = node!.children[headerKey]
        this.componenntListHeader = headerNode?.toArray() || []
        let bodyNode = node!.children[bodyKey]
        this.componenntListBody = bodyNode?.toArray() || []
        let footerNode = node!.children[footerKey]
        this.componenntListFooter = footerNode?.toArray() || []
        
      }
      return true
    }).then(() => {
      asyncFn(() => {
        this.show = true
      })
    })
  }
}
