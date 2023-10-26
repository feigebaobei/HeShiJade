import type { componentDefaultMeta } from '../types/component'

let Button: componentDefaultMeta = {
    props: {
        type: 'button',
        bsSize: 'md',
        bordered: false,
        disabled: false,
        width: '100px',
    },
    behavior: {},
    item: {},
    slot: 'button',
}
let Input: componentDefaultMeta = {
    props: {
        error: false,
        size: '',
    },
    behavior: {},
    item: {},
    slot: '',
}
let Modal: componentDefaultMeta = {
    props: {},
    behavior: {},
    item: {},
    slot: '',
}
let Select: componentDefaultMeta = {
    props: {
        options: ['one', 'two', 'three'],
        isSearch: false,
        size: '',
        placeholder: '',
    },
    behavior: {},
    item: {},
    slot: '',
}
let Form: componentDefaultMeta = {
    props: {},
    behavior: {},
    item: {},
    slot: '',
}
let Table: componentDefaultMeta = {
    props: {},
    behavior: {},
    item: {},
    slot: '',
}
export {
    Button,
    Input,
    Modal,
    Select,
    Form,
    Table,
}