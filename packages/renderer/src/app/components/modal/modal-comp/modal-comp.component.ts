import { Component, Input, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import { createChildKey } from 'src/helper/index'
import { A } from 'src/types/base';
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
  constructor(
    private componentService: ComponentService
  ) {
    this.componenntListHeader = []
    this.componenntListBody = []
    this.componenntListFooter = []
  }
  ngOnInit() {
    let tree = this.componentService.getTreeByKey()
    clog('data', this.data)
    if (tree) {
      let node = tree.find(this.data.ulid)
      clog('node', node)
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
  }
}
