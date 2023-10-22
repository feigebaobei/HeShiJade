import { Component, ViewChild } from '@angular/core';
import { PropsDirective } from 'src/app/props.directive';
import { ComponentService } from 'src/app/service/component.service';
// type
import type {Component as Comp} from 'src/types/component'
import type {ComponentPropsMeta as CPM} from 'src/types/props'
// data
// import * as 
import {
  Button as buttonPropsMeta
} from '../../../helper/props'

@Component({
  selector: 'app-props-box',
  templateUrl: './props-box.component.html',
  styleUrls: ['./props-box.component.sass']
})
export class PropsBoxComponent {
  @ViewChild(PropsDirective, {static: true}) propsDirective!: PropsDirective
  curComp?: Comp | null
  componentPropsMeta: CPM
  constructor(private componentService: ComponentService) {
    this.curComp = null
    this.componentPropsMeta = {}
    this.componentService.compSubject$.subscribe(p => {
      this.curComp = p
      this.componentSelectedChange()
    })
  }
  ngOnInit() {
  }
  componentSelectedChange() {
    switch(this.curComp?.type) {
      case 'Button':
        // debugger
        this.componentPropsMeta = buttonPropsMeta
        break
      case 'Modal':
        break
      case 'Table':
        break
      case 'Form':
        break
      default:
        this.componentPropsMeta = {}
        break
    }
  }
  

}
