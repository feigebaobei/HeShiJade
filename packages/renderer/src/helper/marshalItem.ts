import { Component, Input } from "@angular/core";
// import { Text } from "src/types/config";
// import { text } from "./config";
// import shareEvent, { createEventName } from "./share-event";
// type
import type { Component as Comp } from "src/types/component";
// import { InputData } from "./InputData";
import { A, F, Oa, S } from "src/types/base";
import { CompBase } from "./pool";
// import { TextBase } from "./text";

let clog = console.log

@Component({
    template: ''
})
export class MarshalItem
<T extends {key: S, parentKey: S, children?: T[]}> 
extends
CompBase
// extends 
// InputData 
// TextBase
{
    menu: T[]
    constructor(
    ) {
        super()
        this.menu = []
    }
    // extraNgOnInit() {}
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
    override ngOnInit() {
        this.opMenu()
        this.pool.register(this.data.ulid, this, this.data.behavior)
        this.pool.trigger(this.data.ulid, 'postComponentNgOnInit', this.getLoopEventParams(this.loopIndex, undefined), this)
        this.extraNgOnInit()
    }
}