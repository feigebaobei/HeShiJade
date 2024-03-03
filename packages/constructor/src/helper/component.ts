// 它与组件配套。日后可以放在组件目录中。
// component文件 定义数据。
// props文件     定义结构
// 这是所有组件的默认配置数据
import type { Options, S,
    //  A, ULID, B, N, 
    // Options, 
    B,
    N,
    } from "../types/base"
import type { componentConfig } from '../types/component'

let Button: componentConfig = {
    props: {
        type: 'button',
        bsSize: 'md',
        bordered: false,
        disabled: false,
        width: '100px',
    },
    behavior: {
        addable: true,
        groups: [
            {
                event: 'click',
                target: 'ulid',
                payload: '{"visible": true}',
            },
        ],
    },
    item: {
        addable: true,
        groups: [],
    },
    slot: 'button',
}
let Input: componentConfig = {
    props: {
        error: false,
        size: '',
        showGlowStyle: true,
        styleType: 'default',
    },
    behavior: {
        addable: true,
        groups: []
    },
    item: {
        addable: true,
        groups: [],
    },
    slot: '',
}
let Modal: componentConfig = {
    props: {
        title: 'str',
        visible: false,
        width: '',
        placement: 'center',
    },
    behavior: {
        addable: true,
        groups: []
    },
    item: {
        addable: true,
        groups: [],
    },
    slot: '',
}
let Select: componentConfig = {
    props: {
        options: [
            {label: 'one', value: 'one',},
            {label: 'two', value: 'two',},
            {label: 'three', value: 'three',},
        ],
        isSearch: false,
        size: '',
        placeholder: '',
    },
    behavior: {
        addable: true,
        groups: []
    },
    item: {
        addable: true,
        groups: [],
    },
    slot: '',
}
let Form: componentConfig = {
    props: {
        layout: 'horizontal',
        isCancel: true,
        isSubmit: true,
    },
    behavior: {
        addable: true,
        groups: []
    },
    item: {
        addable: true, // 是否可增加
        groups: [
            {
                category: 'input',
                key: 'name',
                label: '姓名',
                value: '张三',
            },
            {
                category: 'select',
                key: 'interest',
                label: '爱好',
                value: '读书',
                options: [
                    { label: '旅游', value: 'travel' },
                    { label: '读书', value: 'read' },
                ],
            },
            {
                category: 'switch',
                key: 'gender',
                label: '性别',
                checked: false,
                // value: false,
            }
        ],
    },
    slot: '',
}
let Table: componentConfig = {
    props: {},
    behavior: {
        // addable: B,
        // groups: BehaviorItem[],
        addable: true,
        groups: []
    },
    // behavior: BehaviorMeta,
    // behavior: {
    //     addable: true,
    //     groups: BehaviorMeta[]
    // },
    item: {
        addable: true,
        groups: [],
    },
    slot: '',
}
export {
    Button,
    Input,
    Modal,
    Select,
    Form,
    Table,

    // categoryList,
}