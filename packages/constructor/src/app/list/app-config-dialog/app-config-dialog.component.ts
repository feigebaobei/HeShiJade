import { Component, Input, } from '@angular/core';
import { AppService } from 'src/app/service/app.service';
// type
import type { App } from 'src/types/app';
import type { A } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-app-config-dialog',
  templateUrl: './app-config-dialog.component.html',
  styleUrls: ['./app-config-dialog.component.sass']
})
export class AppConfigDialogComponent {
  // @Input() app!: App // | undefined
  @Input() data!: {
    app: App
  } // | undefined
  constructor(
    // private appService: AppService
  ) {
    clog('app', this.data)
    // this.app = this.appService.getCurApp()!
  }
}
