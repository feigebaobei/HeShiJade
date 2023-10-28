// 它与组件配套。日后可以放在组件目录中。
// component文件 定义数据。
// props文件     定义结构
import type { componentConfig } from '../types/component'

let Button: componentConfig = {
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
let Input: componentConfig = {
    props: {
        error: false,
        size: '',
        showGlowStyle: true,
        styleType: 'default',
    },
    behavior: {},
    item: {},
    slot: '',
}
let Modal: componentConfig = {
    props: {},
    behavior: {},
    item: {},
    slot: '',
}
let Select: componentConfig = {
    props: {
        // options: ['one', 'two', 'three'],
        options: [
            {label: 'one', value: 'one',},
            {label: 'two', value: 'two',},
            {label: 'three', value: 'three',},
        ],
        isSearch: false,
        size: '',
        placeholder: '',
    },
    behavior: {},
    item: {},
    slot: '',
}
let Form: componentConfig = {
    props: {},
    behavior: {},
    item: {},
    slot: '',
}
let Table: componentConfig = {
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