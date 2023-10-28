import { Component, Input, ViewChild } from '@angular/core';
import { PropsDirective } from 'src/app/props.directive';
import { ComponentService } from 'src/app/service/component.service';
// type
import type {Component as Comp} from 'src/types/component'
import type {
  ComponentPropsMetaRaw as CPMR,
  ComponentPropsMetaItemRaw as CPMIR,
  ComponentPropsMetaItem as CPMI,
} from 'src/types/props'
// import type { A } from 'src/types/base';
// data
// import * as 
import {
  Button as buttonPropsMeta,
  Input as inputPropsMeta,
  Select as selectPropsMeta,
} from '../../../helper/props'

@Component({
  selector: 'app-props-box',
  templateUrl: './props-box.component.html',
  styleUrls: ['./props-box.component.sass']
})
export class PropsBoxComponent {
  // @Input() data: A
  @ViewChild(PropsDirective, {static: true}) propsDirective!: PropsDirective
  curComp?: Comp | null
  componentPropsMeta: CPMR
  componentPropsList: CPMI[]
  constructor(private componentService: ComponentService) {
    this.curComp = null
    this.componentPropsMeta = {}
    this.componentPropsList = []
    this.componentService.compSubject$.subscribe(p => {
      this.curComp = p
      this.componentSelectedChange()
    })
  }
  ngOnInit() {
  }
  componentSelectedChange() {
    // 先清空
    this.componentPropsList = []
    // 再赋值
    switch(this.curComp?.type) {
      case 'Button':
        this.componentPropsMeta = buttonPropsMeta
        Object.keys(this.componentPropsMeta).forEach((key) => {
          let o = {
            ...this.componentPropsMeta[key],
            propKey: key,
            componentUlid: this.curComp!.ulid,
          }
          this.componentPropsList.push(o)
        })
        break
      case 'Input':
        this.componentPropsMeta = inputPropsMeta
        Object.keys(this.componentPropsMeta).forEach((key) => {
          let o = {
            ...this.componentPropsMeta[key],
            propKey: key,
            componentUlid: this.curComp!.ulid,
          }
          this.componentPropsList.push(o)
        })
        break
      case 'Select':
        this.componentPropsMeta = selectPropsMeta
        Object.keys(this.componentPropsMeta).forEach((key) => {
          let o = {
            ...this.componentPropsMeta[key],
            propKey: key,
            componentUlid: this.curComp!.ulid
          }
          this.componentPropsList.push(o)
        })
        break
      // case 'Modal':
      //   break
      // case 'Table':
      //   break
      // case 'Form':
      //   break
      default:
        this.componentPropsMeta = {}
        break
    }
  }
  

}
