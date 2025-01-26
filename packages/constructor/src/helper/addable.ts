import type { BehaviorConfig, ItemsConfig, SlotsConfig, } from 'src/types/config'
import type { S } from 'src/types/base'
type CompConfigAddabel = {
    behavior: BehaviorConfig['addable']
    items: ItemsConfig['addable']
    // slots: SlotsConfig['addable']
}
let Button: CompConfigAddabel = {
    // props,
    behavior: true,
    items: false,
    // slots: false,
}
let Form: CompConfigAddabel = {
    behavior: true,
    items: true,
    // slots: false,
}
let Table: CompConfigAddabel = {
    behavior: true,
    items: true,
    // slots: false,
}
let Input: CompConfigAddabel = {
    behavior: true,
    items: false,
    // slots: false,
}
let Select: CompConfigAddabel = {
    behavior: true,
    items: false,
    // slots: false,
}
let Modal: CompConfigAddabel = {
    behavior: true,
    items: false,
    // slots: false,
}
let Icon: CompConfigAddabel = {
    behavior: true,
    items: false,
    // slots: false,
}
let Checkbox: CompConfigAddabel = {
    behavior: true,
    items: false,
    // slots: false,
}
let Tabs: CompConfigAddabel = {
    behavior: true,
    items: true,
    // slots: false,
}
let Pagination: CompConfigAddabel = {
    behavior: true,
    items: false,
    // slots: false,
}
let Page: CompConfigAddabel = {
    behavior: true,
    items: false,
    // slots: false,
}
let Flex: CompConfigAddabel = {
    behavior: true,
    items: false,
    // slots: false,
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
    Pagination,
    Page,
    Flex,
}

export {
    Button,
    Form,
}
export default all