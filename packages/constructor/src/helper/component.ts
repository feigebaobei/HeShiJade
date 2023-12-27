// 它与组件配套。日后可以放在组件目录中。
// component文件 定义数据。
// props文件     定义结构
// 这是所有组件的默认配置数据
import type { componentConfig } from '../types/component'

let Button: componentConfig = {
    props: {
        type: 'button',
        bsSize: 'md',
        bordered: false,
        disabled: false,
        width: '100px',
    },
    // behavior: {
        
    // },
    behavior: [
        {
            event: 'click',
            type: 'relation',
            target: 'ulid',
            props: {
                visible: true
            }
        }
    ],
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
    props: {
        title: 'str',
        visible: false,
        width: '',
        placement: 'center',
    },
    behavior: {},
    item: {},
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
    behavior: {},
    item: {},
    slot: '',
}
let Form: componentConfig = {
    props: {
        layout: 'horizontal',
        isCancel: true,
        isSubmit: true,
    },
    behavior: {},
    item: {
        addable: true, // 是否可增加
        groups: [
            {
                type: 'Input',
                label: '姓名',
                value: '张三',
            },
            {
                type: 'Select',
                label: '爱好',
                value: '读书',
                options: [
                    { label: '旅游', value: 'travel' },
                    { label: '读书', value: 'read' },
                ],
            },
            {
                type: 'Switch',
                label: '性别',
                value: 1,
                options: [
                    { label: '男', value: 1 },
                    { label: '女', value: 0 },
                ],
            }
        ],
    },
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

    // categoryList,
}