import type { BehaviorConfig, ItemsConfig, SlotsConfig, } from 'src/types/config'
import type { S } from 'src/types/base'
type CompConfigAddabel = {
    behavior: BehaviorConfig['addable']
    items: ItemsConfig['addable']
    slots: SlotsConfig['addable']
}
let Button: CompConfigAddabel = {
    // props,
    behavior: true,
    items: false,
    slots: false,
}
let Form: CompConfigAddabel = {
    behavior: true,
    items: true,
    slots: false,
}
let Table: CompConfigAddabel = {
    behavior: false,
    items: true,
    slots: false,
}
let Input: CompConfigAddabel = {
    behavior: false,
    items: true,
    slots: false,
}
let Select: CompConfigAddabel = {
    behavior: false,
    items: true,
    slots: false,
}
let Modal: CompConfigAddabel = {
    behavior: false,
    items: true,
    slots: false,
}
let Icon: CompConfigAddabel = {
    behavior: false,
    items: false,
    slots: false,
}
let Checkbox: CompConfigAddabel = {
    behavior: false,
    items: false,
    slots: false,
}
let Tabs: CompConfigAddabel = {
    behavior: false,
    items: true,
    slots: false,
}


let all: {[k: S]: CompConfigAddabel} = {
    Button,
    Form,
    Table,
    Input,
    Select,
    Modal,
    Icon,
    Checkbox,
    Tabs,
}

export {
    Button,
    Form,
}
export default all