import { Component, Input } from "@angular/core";
// import { Text } from "src/types/config";
// import { text } from "./config";
// import shareEvent, { creatEventName } from "./share-event";
// type
import type { Component as Comp } from "src/types/component";

@Component({
    template: ''
})
export class InputData {
    @Input() data!: {
        type: Comp['type'],
        // 搭建侧不需要处理behavior
        props: Comp['props'],
        items: Comp['items'],
        slots: Comp['slots'],
        ulid: Comp['ulid'],
    }
    // text: Text
    constructor() {
        // this.text = text
        
    }
    // opMenu() {
    //     if (this.data.items)
    // }
    // listen() {
    //     shareEvent.on(creatEventName('Accordion', this.data.ulid, 'items', 'add'), () => {
    //     this.opMenu()
    //     })
    //     shareEvent.on(creatEventName('Accordion', this.data.ulid, 'items', 'update'), () => {
    //     this.opMenu()
    //     })
    //     shareEvent.on(creatEventName('Accordion', this.data.ulid, 'items', 'remove'), () => {
    //     this.opMenu()
    //     })
    // }
    // ngOnInit() {
    //     this.opMenu()
    //     this.listen()
    // }
}