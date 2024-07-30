import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from 'ng-devui/modal';
import { ComponentService } from 'src/app/service/component.service';
// import { PageService } from 'src/app/service/page.service';
import {shareEvent} from 'src/helper';
import { ModalCompComponent } from './modal-comp/modal-comp.component';
import type { A } from 'src/types/base';
import type { Component as Comp } from 'src/types/component';

let clog = console.log

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @Input() data: A
  config: A
  childrenHeader: Comp[]
  childrenBody: Comp[]
  childrenFooter: Comp[]
  constructor(
    private modalService: ModalService,
    private componentService: ComponentService,
  ) {
    this.config = {
      // id: 'dialog-service',
      title: 'title', // 使用传入的数据
      width: '346px',
      zIndex: 150,
      showAnimation: true,
      backdropCloseable: true,
      placement: 'center',
      offsetX: '0px',
      offsetY: '0px',
      bodyScrollable: true,
      escapable: true,
      dMoveable: true,
      maxHeight: '600px',
      component: ModalCompComponent,
      onClose: () => console.log('on dialog closed'),
      data: {
        // ulid: this.data.ulid,
        // props: this.data.props,
        // items: this.data.items,
        // slots: this.data.slots,
        // behavior: this.data.behavior,
      },
    };
    this.childrenHeader = []
    this.childrenBody = []
    this.childrenFooter = []
  }
  
  ngOnInit(): void {
    this.config.title = this.data.props.title
    this.config.width = this.data.props.width
    this.config.zIndex = this.data.props.zIndex
    this.config.showAnimation = this.data.props.showAnimation
    this.config.backdropCloseable = this.data.props.backdropCloseable
    this.config.placement = this.data.props.placement
    this.config.offsetX = this.data.props.offsetX
    this.config.offsetY = this.data.props.offsetY
    this.config.bodyScrollable = this.data.props.bodyScrollable
    this.config.escapable = this.data.props.escapable
    this.config.dMoveable = this.data.props.dMoveable
    this.config.data.ulid = this.data.ulid
    this.config.data.props = this.data.props
    this.config.data.items = this.data.items
    this.config.data.slots = this.data.slots
    this.config.data.behavior = this.data.behavior
    if (this.data.props.visible) {
      this.openDialog()
    }
    shareEvent.listen(this.data.ulid, (payload) => {
      // clog('payload', payload)
      let obj = JSON.parse(payload)
      // clog('obj', obj)
      if (obj.visible) {
        this.openDialog()
      }
    })
    // let curPage = this.pageService.getCur()
    let tree = this.componentService.getTreeByKey()
    if (tree) {
      let curNode = tree.find(this.data.ulid)!
      this.childrenHeader = curNode.children['header']?.toArray() || []
      this.childrenBody = curNode.children['body']?.toArray() || []
      this.childrenFooter = curNode.children['footer']?.toArray() || []
    }
    // clog('12345', this.childrenHeader, this.childrenBody, this.childrenFooter)
  }
  
  openDialog() {
    const results = this.modalService.open({
      ...this.config,
      dialogtype: 'standard',
      buttons: [
        {
          cssClass: 'primary',
          text: 'Ok',
          disabled: false,
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
        {
          id: 'btn-cancel',
          cssClass: 'common',
          text: 'Cancel',
          handler: ($event: Event) => {
            results.modalInstance.hide();
          },
        },
      ],
    });
    console.log(results.modalContentInstance);
  }

}
