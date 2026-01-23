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
let ShowHide: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Loop: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let InputNumber: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Radio: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Avatar: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Card: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Paragraph: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Span: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let ImagePreview: CompConfigAddabel = {
    behavior: true,
    items: true,
}
let Accordion: CompConfigAddabel = {
    behavior: true,
    items: true,
}
let Breadcrumb: CompConfigAddabel = {
    behavior: true,
    items: true,
}
let Cascader: CompConfigAddabel = {
    behavior: true,
    items: true,
}
let DatePicker: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let DateRangePicker: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let TimePicker: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Slider: CompConfigAddabel = {
    behavior: true,
    items: false,
}
let Textarea: CompConfigAddabel = {
    behavior: true,
    items: false,
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
    ShowHide,
    Loop,
    InputNumber,
    Radio,
    Avatar,
    Card,
    Paragraph,
    Span,
    ImagePreview,
    Accordion,
    Breadcrumb,
    Cascader,
    DatePicker,
    DateRangePicker,
    TimePicker,
    Slider,
    Textarea,
}

export {
    Button,
    Form,
}
export default all