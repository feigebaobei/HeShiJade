// 它与组件配套。日后可以放在组件目录中。
// component文件 定义数据。
// props文件     定义结构
// 这是所有组件的默认配置数据

import type { ComponentDefaultConfig, ComponentDefaultConfigAll } from 'src/types/component'
// import type { S } from 'src/types/base'

let Button: ComponentDefaultConfig = {
    props: {
        type: 'button',
        bsSize: 'md',
        bordered: true,
        disabled: false,
        width: '100px',
        text: 'button',
    },
    behavior: [
        {
            event: 'click',
            target: 'ulid',
            payload: '{"visible": true}',
        },
    ],
    items: [
        {
            category: 'input',
            label: '文本',
            value: 'button star',
            key: '',
        }
    ],
    slots: {}, // 子组件
}
let Input: ComponentDefaultConfig = {
    props: {
        error: false,
        size: '',
        showGrowStyle: true,
        styleType: 'default',
    },
    behavior: [],
    items: [],
    slots: {},
}
let Modal: ComponentDefaultConfig = {
    props: {
        title: '标题',
        visible: false,
        width: '',
        placement: 'center',
    },
    behavior: [],
    items: [],
    slots: {
        // header: '', // value是ulid
        // body: '',   // value是ulid
        // footer: '', // value是ulid
    },
}
let Select: ComponentDefaultConfig = {
    props: {
        // options: [
        //     {label: 'one', value: 'one',},
        //     {label: 'two', value: 'two',},
        //     {label: 'three', value: 'three',},
        // ],
        isSearch: false,
        size: '',
        placeholder: '',
    },
    behavior: [],
    items: [],
    slots: {},
}
let Form: ComponentDefaultConfig = {
    props: {
        layout: 'horizontal',
        isCancel: true,
        isSubmit: true,
    },
    behavior: [
        {
            event: 'submit',
            target: '',
            payload: '',
        },
    ],
    items: [
        {
            category: 'input',
            key: 'name',
            label: '姓名',
            value: '张三',
        },
        {
            category: 'input',
            // options: [],
            key: 'name',
            label: '姓名',
            value: '张三',
        },
        {
            category: 'input',
            key: 'name',
            label: '姓名',
            value: '张三',
        },
    ],
    slots: {},
}
let Table: ComponentDefaultConfig = {
    props: {
        size: 'sm',
    },
    behavior: [],
    items: [
    ],
    slots: {},
}

// export {
//     Button,
//     Input,
//     Modal,
//     Select,
//     Form,
//     Table,
// }
export let componentDefaultConfigAll: ComponentDefaultConfigAll = {
    Button,
    Input,
    Modal,
    Select,
    Form,
    Table,
}
// export {all}
// export default all