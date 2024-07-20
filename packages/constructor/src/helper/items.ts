// import type { ComponentPropsMetaRaw } from 'src/types/props'
import { B, Options, S, N, A, ConfigItem } from 'src/types/base';
import type { 
    // ComponentItem, 
    ItemsMeta } from 'src/types/items';
// 指定组件的配置项

let Input: ConfigItem[] = []
let Select: ConfigItem[] = []
let Button: ConfigItem[] = []
let Modal: ConfigItem[] = []
let Form: ConfigItem[] = [
    {
        label: '种类',
        category: 'select',
        options: [
            {label: 'input', value: 'input'},
            {label: 'select', value: 'select'},
            {label: 'switch', value: 'switch'},
        ],
        key: 'category',
        value: 'input',
        // show: true,
    },
    {
        label: 'key',      // 在配置面板中的显示的文本
        category: 'input', // 在配置面板中显示的种类
        key: 'key',        // 配置组中项的key
        value: '',      // 在配置面板中设置的值
        // show: true,
    },
    {
        label: 'label',
        category: 'input',
        key: 'label',
        value: '',
        // show: true,
    },
    {
        label: 'value',
        category: 'input',
        key: 'value',
        value: '',
        // show: true,
    },
    {
        label: '',
        category: 'options',
        key: 'options',
        value: [],
        template: {label: '', value: ''},
        hide: function (p: ConfigItem[]) {
            let o = p.find(item => item.key === 'category')
            let r = false
            if (o) {
                r = o.value !== 'select'
            } else {
                r = true
            }
            return r
        },
        hideListenerKey: 'category',
        // show: true,
    }
]

let FormItemCategory = [
    { label: 'input', value: 'input', },
    { label: 'select', value: 'select', },
    { label: 'switch', value: 'switch', },
]
// todo 以后再把addable与groups合并在一起
// let Button: ConfigItem = {
//         category: 'input',
//         key: 'text',
//         label: '文本',
//         value: '',
//     }
let Table: ConfigItem[] = [
    {
        label: '类型',
        category: 'select',
        options: [
            {label: 'fill', value: 'fill'},
            {label: 'slots', value: 'slots'},
        ],
        key: 'category',
        value: 'fill',
        // show: true,
    },
    {
        label: 'field',
        category: 'input',
        key: 'field',
        value: '', // 配置项的默认值
        // show: true,
    },
    {
        label: 'header',
        category: 'input',
        key: 'header',
        value: '',
        // show: true,
    },
    {
        label: 'width',
        category: 'input',
        key: 'width',
        value: '150px',
        // show: true,
    },
    {
        label: 'childUlid',
        category: 'input',
        key: 'childUlid',
        value: '',
        // show: false,
        hideConfig: true,
    },
]
let all: {[k: S]: ConfigItem[]} = {
    Input,
    Select,
    Button,
    Modal,
    Form,
    // FormItemCategory,
    Table,
}
// export {
//     // Button,
//     // Input,
//     // Select,
//     // Modal,
//     Form,
//     FormItemCategory,
//     // Button,
//     Table,
// }

export default all