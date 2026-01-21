import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatepickerProModule } from 'ng-devui';
import { ComponentService } from 'src/app/service/component.service';
import { PageService } from 'src/app/service/page.service';
import { createDebounceFn } from 'src/helper';
import { debounceTime } from 'src/helper/config';
// type
import type { A, ConfigItemDate, D, F } from 'src/types/base';

let clog = console.log

@Component({
  selector: 'app-props-date',
  standalone: true,
  imports: [
    FormsModule,
    DatepickerProModule,
  ],
  templateUrl: './props-date.component.html',
  styleUrl: './props-date.component.sass'
})
export class PropsDateComponent {
  @Input() data!: ConfigItemDate
  @Output() change = new EventEmitter()
  modelChangeH: F
  value?: D
  constructor(
    private componentService: ComponentService,
    private pageService: PageService,
  ) {
    // this.value = new Date()
    this.modelChangeH = createDebounceFn((v: Date) => {
      let t 
      if (v) {
        // 有值时应该走confirmEventH
      } else {
        t = undefined
        let curPage = this.pageService.getCurPage()
        let curComponent = this.componentService.curComponentS.get()
        if (curPage && curComponent) {
          this.componentService.removeProps(curPage.ulid, curComponent.ulid, this.data.key)
          this.componentService.reqRemoveProps(this.data.key)
        }
        clog('modelChangeH', v, t)
        this.change.emit(t)
      }
    }, debounceTime)
  }
  confirmEventH(v: D) {
    let t = v.getTime()
      clog('confirmEventH', v, t)
      this.componentService.setProps(this.data.key, t)
      this.componentService.reqUpdateComponent('props', this.data.key, t)
      this.change.emit(v)
  }
  ngOnInit() {
    if (this.data.value !== undefined) {
      this.value = new Date(this.data.value)
    }
    clog('innit', this.value, this.data.value)
  }
}
