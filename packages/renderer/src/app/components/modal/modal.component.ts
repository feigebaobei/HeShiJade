import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ModalService } from 'ng-devui/modal';
import { ComponentService } from 'src/app/service/component.service';
import { shareEvent } from 'src/helper';
import { pool } from 'src/helper/pool';
import { ModalCompComponent } from './modal-comp/modal-comp.component';
import type { A, O } from 'src/types/base';
import type { Component as Comp, componentInstanceData } from 'src/types/component';
import type { ModalComponent as MC } from 'ng-devui/modal';
let clog = console.log
interface M {
  modalInstance: MC
  modalContentInstance: any
}

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit, OnDestroy{
  @Input() data!: componentInstanceData
  config: A
  childrenHeader: Comp[]
  childrenBody: Comp[]
  childrenFooter: Comp[]
  mc: M | null
  constructor(
    private modalService: ModalService,
    private componentService: ComponentService,
  ) {
    this.config = {
      // id: 'dialog-service',
      // title: 'title', // 使用传入的数据
      width: '346px',
      // zIndex: 150,
      component: ModalCompComponent,
      data: {
        // ulid: this.data.ulid,
        // props: this.data.props,
        // items: this.data.items,
        // slots: this.data.slots,
        // behavior: this.data.behavior,
        onClose: (event: Event) => {
          clog('close', event, this, this.mc)
          this.mc?.modalInstance.hide()
        }
      },
      showAnimation: true,
      backdropCloseable: true,
      onClose: () => console.log('on dialog closed'),
      placement: 'center',
      offsetX: '0px',
      offsetY: '0px',
      bodyScrollable: true,
      escapable: true,
      // dMoveable: true,
      // maxHeight: '600px',
    };
    this.childrenHeader = []
    this.childrenBody = []
    this.childrenFooter = []
    this.mc = null
  }
  openDialog() {
    // const results = this.modalService.open({
    this.mc = this.modalService.open({
      ...this.config,
      // dialogtype: 'standard',
      // buttons: [
      //   {
      //     cssClass: 'primary',
      //     text: 'Ok',
      //     disabled: false,
      //     handler: ($event: Event) => {
      //       results.modalInstance.hide();
      //     },
      //   },
      //   {
      //     id: 'btn-cancel',
      //     cssClass: 'common',
      //     text: 'Cancel',
      //     handler: ($event: Event) => {
      //       results.modalInstance.hide();
      //     },
      //   },
      // ],
    });
  }
  setProps(o: O) {
    Object.entries(o).forEach(([k, v]) => {
      this.data.props[k] = v
      this.config[k] = v
    })
  }
  ngOnInit(): void {
    // this.config.title = this.data.props['title']
    this.config.width = this.data.props['width']
    this.config.data.ulid = this.data.ulid
    this.config.data.props = this.data.props
    this.config.data.items = this.data.items
    this.config.data.slots = this.data.slots
    this.config.data.behavior = this.data.behavior
    // this.config.data.onClose = () => {}
    this.config.showAnimation = this.data.props['showAnimation']
    this.config.backdropCloseable = this.data.props['backdropCloseable']
    this.config.placement = this.data.props['placement']
    this.config.offsetX = this.data.props['offsetX']
    this.config.offsetY = this.data.props['offsetY']
    this.config.bodyScrollable = this.data.props['bodyScrollable']
    this.config.escapable = this.data.props['escapable']
    // this.config.dMoveable = true //this.data.props['dMoveable']
    if (this.data.props['visible']) {
      this.openDialog()
    }
    shareEvent.on(this.data.ulid, (payload) => {
      let obj = JSON.parse(payload)
      if (obj.visible) {
        this.openDialog()
      }
    })
    let tree = this.componentService.getTreeByKey()
    if (tree) {
      let curNode = tree.find(this.data.ulid)!
      this.childrenHeader = curNode.children['header']?.toArray() || []
      this.childrenBody = curNode.children['body']?.toArray() || []
      this.childrenFooter = curNode.children['footer']?.toArray() || []
    }
    pool.register(this.data.ulid, this, this.data.behavior)
  }
  ngOnDestroy() {
    pool.unRegister(this.data.ulid)
  }
}
