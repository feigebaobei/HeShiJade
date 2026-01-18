import { Component } from "@angular/core";
import { Text } from "src/types/config";
import { text } from "./config";

@Component({
    template: ''
})
export class TextBase {
    text: Text
    constructor() {
        this.text = text
    }
}