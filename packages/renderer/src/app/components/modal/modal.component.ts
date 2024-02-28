import { Component, Input, OnInit } from '@angular/core';
import { A } from 'src/types/base';
import { DialogService } from 'ng-devui/modal';
import {shareEvent} from 'src/helper';

let clog = console.log

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass']
})
export class ModalComponent implements OnInit {
  @Input() data: A
  config: A
  constructor(private dialogService: DialogService) {
    this.config = {
      id: 'dialog-service',
      width: '346px',
      maxHeight: '600px',
      title: 'title',
      content: 'ModalTestComponent for content',
      backdropCloseable: true,
      placement: 'center',

      onClose: () => console.log('on dialog closed'),
      data: {
        name: 'Tom',
        age: 10,
        address: 'Chengdu',
      },
    };
  }
  
  ngOnInit(): void {
    this.config.placement = this.data.props.placement
    this.config.title = this.data.props.title
    this.config.width = this.data.props.width
    if (this.data.props.visible) {
      this.openDialog()
    }
    shareEvent.listen('01HQFYX942DGF1Z8CQ30BTXXSC', (payload) => {
      if (payload.visible) {
        this.openDialog()
      }
    })
  }
  
  openDialog(dialogtype?: string, showAnimation?: boolean) {
    const results = this.dialogService.open({
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
