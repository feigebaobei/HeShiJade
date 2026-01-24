import { Component, Input } from "@angular/core";
// type
import type { Component as Comp } from "src/types/component";
import { TextBase } from "./text";

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
}