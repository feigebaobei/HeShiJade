import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
// type
import type { A, S } from 'src/types/base';
import type { ComponentPropsMetaItem } from 'src/types/props'

let clog = console.log

@Component({
  selector: 'app-props-input',
  templateUrl: './props-input.component.html',
  styleUrls: ['./props-input.component.sass']
})
export class PropsInputComponent implements OnInit, OnChanges {
  @Input() data!: ComponentPropsMetaItem
  value: S
  constructor(private componentService: ComponentService) {
    this.value = this.data?.value
  }
  ngOnInit(): void {
    // console.log('props input', this, this.data)
  }
  ngOnChanges(...p: A) {
    // console.log('changie', p)
  }
  ngModel(...p: A) {
    console.log('ngModel', p)
  }
  change() {
    this.componentService.setCurComponentProp(this.data.propKey, this.data.value)
    // // clog('curr r rs', this.componentService.curComponent(), this.data.propKey, this.data.value)
    this.componentService.reqUpdateComponentProps('props', this.data.propKey, this.data.value)
    // console.log('change', this.data.value)
  }
}
