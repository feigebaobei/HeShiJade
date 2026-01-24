import { Component } from '@angular/core';
import { DrawerModule, DrawerService } from 'ng-devui';
import { CompBase } from 'src/helper/pool';
import { DrawerCompComponent } from './drawer-comp/drawer-comp.component';
import { clog } from 'src/helper';
// type
import type { IDrawerOpenResult } from 'ng-devui';
import type { Oa } from 'src/types/base';

@Component({
  selector: 'app-drawer',
  // standalone: true,
  // imports: [
  //   DrawerModule,
  //   DrawerCompComponent,
  // ],
  templateUrl: './drawer.component.html',
  styleUrl: './drawer.component.sass'
})
export class DrawerComponent extends CompBase {
  result: IDrawerOpenResult | null
  config: Oa
  constructor(
    private drawerService: DrawerService,
  ) {
    super()
    this.result = null
    this.config = {
      drawerContentComponent: DrawerCompComponent,
      width: '50%',
      zIndex: 1000,
      isCover: true,
      data: {
        // props: {},
        // ulid: '',
        data: {},
      },
      backdropCloseable: true,
      escKeyCloseable: true,
      fullScreen: true,
      onClose: () => {
        console.log('on drawer closed');
      },
      afterOpened: () => {},
      beforeHidden: () => {},
      clickDoms: () => {},
      destroyOnHide: true,
      position: 'left',
      bodyScrollable: true,
      showAnimation: true,
      id: '',
      resizable: false,
    }
  }
  openDrawer() {
    this.result = this.drawerService.open({
      ...this.config
    })
  }
  initConfig() {
    this.config['width'] = this.data.props['width']
    this.config['zIndex'] = this.data.props['zIndex']
    this.config['isCover'] = this.data.props['isCover']
    this.config['zIndex'] = this.data.props['zIndex']
    this.config['zIndex'] = this.data.props['zIndex']
    this.config['zIndex'] = this.data.props['zIndex']
    this.config['zIndex'] = this.data.props['zIndex']
    this.config['zIndex'] = this.data.props['zIndex']
    this.config['zIndex'] = this.data.props['zIndex']
    this.config['data'].data = this.data
  }
  override extraNgOnInit() {
    this.initConfig()
    if (this.data.props['autoOpen']) {
      this.openDrawer()
    }
  }
}
