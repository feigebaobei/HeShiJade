import { Component, OnInit } from '@angular/core';
import { ComponentService } from '../service/component.service';
import type { A, S, N } from 'src/types/base';
import type { Component as Comp } from 'src/types/component';

let clog = console.log

@Component({
  selector: 'app-setup',
  templateUrl: './setup.component.html',
  styleUrls: ['./setup.component.sass']
})
export class SetupComponent implements OnInit {
  // tabActiveId: string | number = 'tab2';
  appKey: S
  pageKey: S
  leftTabActive: S | N
  rightTabActive: S | N
  componentList: Comp[]
  constructor(private componentService: ComponentService) {
    this.pageKey = ''
    this.appKey = ''
    this.leftTabActive = 'page'
    this.rightTabActive = 'props'
    this.componentList = []
  }
  viewBtClickH() {}

  activeTabChange(tab: A) {
    console.log(tab);
  }
  ngOnInit(): void {
    this.componentService.getComponent().then(res => {
      this.componentList = res
    }).catch(error => {
      clog('error', error)
    })
  }
}
