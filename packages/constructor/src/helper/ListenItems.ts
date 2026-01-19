import { Component, Input } from "@angular/core";
import { Text } from "src/types/config";
import { text } from "./config";
import shareEvent, { creatEventName } from "./share-event";
// type
import type { Component as Comp } from "src/types/component";
import { InputData } from "./InputData";
import { Oa, S } from "src/types/base";

let clog = console.log

// @Component({
//     template: ''
// })
// abstract class Wash<T> {
//     abstract washMenuItem(): T
// }

// type washFn<T> = (p: Oa) => T

@Component({
    template: ''
})
export class ListenItems<T extends {key: S, parentKey: S, children?: T[]}> extends 
// Wash<T> 
InputData
{
    // @Input() data!: {
    //     props: Comp['props'],
    //     items: Comp['items'],
    //     slots: Comp['slots'],
    //     ulid: Comp['ulid'],
    // }
    // text: Text
    menu: T[]
    // washMenuItem: washFn<T>
    constructor(
        // f: washFn<T>
    ) {
        super()
        // this.text = text
        this.menu = []
        // this.washMenuItem = f
    }
    washMenuItem(p: Oa): T {
        return p as T
    }
    // abstract washMenuItem(): T {}
    find(arr: T[], k: S): T | undefined {
        let res = arr.find(item => item.key === k)
        if (res) {
            return res
        } else {
            for (let i = 0; i < arr.length; i++) {
                let t = this.find(arr[i].children || [], k)
                if (t) {
                    return t
                }
            }
            return
        }
    }
    opMenu() {
        if (!this.data.items.length) {
            this.menu = []
        } else {
            let washMenuItemList = (this.data.items as Comp['items']).map(item => this.washMenuItem(item))
            for (let i = 0; i < washMenuItemList.length;) {
                let cur = washMenuItemList[i]
                if (cur.parentKey) {
                    let p = this.find(washMenuItemList, cur.parentKey)
                    if (p) {
                        if (Array.isArray(p.children)) {
                            p.children.push(cur)
                        } else {
                            p.children = [cur]
                        }
                    }
                    washMenuItemList.splice(i, 1)
                } else {
                    i++
                }
            }
            this.menu = washMenuItemList
        }
    }
    listen() {
        shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'items', 'add'), () => {
        this.opMenu()
        })
        shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'items', 'update'), () => {
        this.opMenu()
        })
        shareEvent.on(creatEventName(this.data.type, this.data.ulid, 'items', 'remove'), () => {
        this.opMenu()
        })
    }
    ngOnInit() {
        this.opMenu()
        this.listen()
    }
}