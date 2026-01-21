import { Component } from "@angular/core";
import { Text } from "src/types/config";
import { text } from "./config";
import { InputData } from "./InputData";

@Component({
    template: ''
})
export class TextBase extends InputData {
    text: Text
    constructor() {
        super()
        this.text = text
    }
}