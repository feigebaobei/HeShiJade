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
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: 'title', // 使用传入的数据
      component: ModalCompComponent,
      backdropCloseable: true,
      placement: 'center',
      onClose: () => console.log('on dialog closed'),
      data: {
        name: 'Tom',
        age: 10,
        address: 'Chengdu',
        title: 'hi title'
      },
    };
    this.childrenHeader = []
    this.childrenBody = []
    this.childrenFooter = []
  }
  
  ngOnInit(): void {
    this.config.placement = this.data.props.placement
    this.config.title = this.data.props.title
    this.config.width = this.data.props.width
    if (this.data.props.visible) {
      this.openDialog()
    }
    shareEvent.listen(this.data.ulid, (payload) => {
      clog('payload', payload)
      let obj = JSON.parse(payload)
      clog('obj', obj)
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
  
  openDialog(dialogtype?: string, showAnimation?: boolean) {
    const results = this.modalService.open({
      ...this.config,
      dialogtype: dialogtype,
      showAnimation: showAnimation,
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
