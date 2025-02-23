import { Component, effect, Input } from '@angular/core';
import { ComponentService } from 'src/app/service/component.service';
import groupTemplate from 'src/helper/items'
import addableAll from 'src/helper/addable'
import { cloneDeep, compatibleArray } from 'src/helper/index'
import { PageService } from 'src/app/service/page.service';
import { text } from 'src/helper/config';
// type
import type { B, ConfigItem, N, S, ULID } from 'src/types/base';
import type { Component as Comp, ItemsMeta, ItemsMetaItem
 } from 'src/types/component';
import { Text } from 'src/types/config';

let clog = console.log


@Component({
  selector: 'app-items-box',
  templateUrl: './items-box.component.html',
  styleUrls: ['./items-box.component.sass']
})
export class ItemsBoxComponent {
  // @Input() Items: Comp['items'] = []
  addable: B = false
  groupList: ConfigItem[][] = []
  curComponent: Comp | null = null
  text: Text
  constructor(
    private pageService: PageService,
    private componentService: ComponentService) {
    this.groupList = []
    this.text = text
    effect(() => {
      let p = this.componentService.curComponentS.get()
      if (p) {
        this.curComponent = p
        this.groupList = []
        p.items.forEach(item => {
          let group = this.groupForConfig(p!.type)
          Object.entries(item).forEach(([k, v]) => {
            let gi = group.find(gi => gi.key === k)
            if (gi) {
              switch (gi.category) {
                case 'input':
                case 'number':
                case 'textarea':
                case 'options':
                case 'select':
                case 'switch':
                default:
                  gi.value = v
                  break;
                // case 'switch':
                //   gi.checked = v
                //   break;
              }
            }
          })
          this.groupList.push(group)
        })
        this.addable = addableAll[p.type].items
      } else {
        this.curComponent = null
        this.groupList = []
      }
    })
  }
  addH() {
    if (this.curComponent) {
      let group = this.groupForConfig(this.curComponent.type)
      this.groupList.push(group)
      // todo 检查使用ItemsMetaItem的地方
      let obj: ItemsMetaItem = {} as ItemsMetaItem
      groupTemplate[this.curComponent.type].forEach((item) => {
        let k: keyof ItemsMetaItem = item.key as unknown as keyof ItemsMetaItem
        switch (item.category) {
          case 'input':
          case 'number':
          case 'textarea':
          case 'options':
          case 'select':
          case 'switch':
          default:
            obj[k] = item.value
            break;
          // case 'switch':
          //   obj[k] = item.checked
          //   break;
        }
      })
      this.componentService.addItems(obj)
      this.componentService.reqAddItems(obj)
    }
  }
  removeH(i: N) {
    // 在这里处理公共的逻辑。各组件的逻辑在其内部自己处理。
    // 删除配置面板的item
    let curPage = this.pageService.getCurPage()
    this.groupList.splice(i, 1)
    if (this.curComponent && curPage) {
      // 在store中的item
      this.componentService.removeItems(curPage.ulid, this.curComponent.ulid, i)
      // 在远端删除组件的item
      this.componentService.reqRemoveItems(this.curComponent.ulid, i)
    }
  }
  groupForConfig(type: S): ConfigItem[] {
    let r = cloneDeep(compatibleArray(groupTemplate[type])) // .filter(t => !t.hideConfig)) // 取出要显示的
    return r
  }
}
