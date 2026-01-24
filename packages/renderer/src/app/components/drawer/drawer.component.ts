import { Component } from '@angular/core';
import { DrawerModule, DrawerService } from 'ng-devui';
import { CompBase } from 'src/helper/pool';
import { DrawerCompComponent } from './drawer-comp/drawer-comp.component';
import { clog } from 'src/helper';
// type
import type { IDrawerOpenResult } from 'ng-devui';
import type { B, Oa, S } from 'src/types/base';

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
        data: {},
        close: () => {
          this.result!.drawerInstance.hide();
          this.pool.trigger(this.data.ulid, 'close', this.getLoopEventParams(this.loopIndex, undefined), this)
        },
        fullScreen: () => {
          this.setFullScreen(true)
          this.pool.trigger(this.data.ulid, 'fullScreen', this.getLoopEventParams(this.loopIndex, undefined), this)
        }
      },
      backdropCloseable: true,
      escKeyCloseable: true,
      fullScreen: true,
      // onClose: () => {
      //   // console.log('on drawer closed');
      // },
      afterOpened: () => {
        this.pool.trigger(this.data.ulid, 'afterOpened', this.getLoopEventParams(this.loopIndex, undefined), this)
      },
      beforeHidden: () => {
        let arr = this.pool.trigger(this.data.ulid, 'beforeHidden', this.getLoopEventParams(this.loopIndex, undefined), this)
        return arr[0]
      },
      // clickDoms: () => {},
      destroyOnHide: true,
      position: 'right',
      bodyScrollable: true,
      showAnimation: true,
      id: '',
      resizable: false,
    }
  }
  toggleFullScreen() {
    this.result?.drawerInstance.toggleFullScreen()
  }
  setFullScreen(b: B) {
    this.result?.drawerInstance.setFullScreen(b)
  }
  show() {
    this.result?.drawerInstance.show()
  }
  hide() {
    this.result?.drawerInstance.hide()
  }
  destroy() {
    this.result?.drawerInstance.destroy()
  }
  setWidth(p: S) {
    this.result?.drawerInstance.setWidth(p)
  }
  openDrawer() {
    this.result = this.drawerService.open({
      ...this.config
    })
  }
  initConfig() {
    this.config['autoOpen'] = this.data.props['autoOpen']
    this.config['width'] = this.data.props['width']
    this.config['title'] = this.data.props['title']
    this.config['zIndex'] = this.data.props['zIndex']
    this.config['isCover'] = this.data.props['isCover']
    this.config['backdropCloseable'] = this.data.props['backdropCloseable']
    this.config['escKeyCloseable'] = this.data.props['escKeyCloseable']
    this.config['destroyOnHide'] = this.data.props['destroyOnHide']
    this.config['position'] = this.data.props['position']
    this.config['bodyScrollable'] = this.data.props['bodyScrollable']
    this.config['showAnimation'] = this.data.props['showAnimation']
    this.config['resizable'] = this.data.props['resizable']
    this.config['data'].data = this.data
  }
  override extraNgOnInit() {
    this.initConfig()
    if (this.data.props['autoOpen']) {
      this.openDrawer()
    }
  }
}
