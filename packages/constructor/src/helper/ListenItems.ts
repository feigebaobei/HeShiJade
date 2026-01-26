import { Component, Input } from "@angular/core";
import { Text } from "src/types/config";
import { text } from "./config";
import shareEvent, { createEventName } from "./share-event";
// type
import type { Component as Comp } from "src/types/component";
import { InputData } from "./InputData";
import { Oa, S } from "src/types/base";
import { TextBase } from "./text";

let clog = console.log

@Component({
    template: ''
})
export class ListenItems<T extends {key: S, parentKey: S, children?: T[]}> 
extends 
// InputData 
TextBase
{
    menu: T[]
    constructor(
    ) {
        super()
        this.menu = []
    }
    washMenuItem(p: Oa): T {
        return p as T
    }
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
        shareEvent.on(createEventName(this.data.type, this.data.ulid, 'items', 'add'), () => {
        this.opMenu()
        })
        shareEvent.on(createEventName(this.data.type, this.data.ulid, 'items', 'update'), () => {
        this.opMenu()
        })
        shareEvent.on(createEventName(this.data.type, this.data.ulid, 'items', 'remove'), () => {
        this.opMenu()
        })
    }
    ngOnInit() {
        this.opMenu()
        this.listen()
    }
}