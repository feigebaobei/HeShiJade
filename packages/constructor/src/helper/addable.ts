import type { BehaviorConfig, ItemsConfig, SlotsConfig, } from 'src/types/config'
import type { S } from 'src/types/base'
type CompConfigAddabel = {
    behavior: BehaviorConfig['addable']
    items: ItemsConfig['addable']
    // slots: SlotsConfig['addable']
}
let Button: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Form: CompConfigAddabel = {
    behavior: true,
    items: true,
}
let Table: CompConfigAddabel = {
    behavior: true,
    items: true,
}
let Input: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Select: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Modal: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Icon: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Checkbox: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Tabs: CompConfigAddabel = {
    behavior: true,
    items: true,
}
let Pagination: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Page: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Flex: CompConfigAddabel = {
    behavior: true,
    items: true,
}
let Grid: CompConfigAddabel = {
    behavior: true,
    items: true,
}
let Layout: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let PageList: CompConfigAddabel = {
    behavior: true,
    items: true,
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
    Grid,
    Layout,
    PageList,
}

export {
    Button,
    Form,
}
export default all