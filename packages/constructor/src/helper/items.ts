// import type { ComponentPropsMetaRaw } from 'src/types/props'
import { B, Options, S, N, A, ConfigItem } from 'src/types/base';
import type { 
    // ComponentItem, 
    ItemsMeta } from 'src/types/items';
// 指定组件的配置项

// todo 移入types目录
// for delete 2024.05.01+
// interface ComponentItemsSetter {
//     addable: B
//     optionMap?: {
//         [k: S]: Options<S, S>[]
//     }
//     groupTemplate: ComponentItem
//     showCondition?: B // 显隐
//     checkRules?: CheckExp // 校验
// }
// interface CheckExp {
//     value: S // 对应form中的key
//     operator: Options<S, S>
//     threshold: N | S
// }
// interface Operator {
//     [k: S]: N
// }

// let Form: ComponentItemsSetter = {
//     addable: true,
//     optionMap: { // 模板中项为select时的选项。
//         category: [ // 当category为select时使用
//           { label: 'input', value: 'input', },
//           { label: 'select', value: 'select', },
//           { label: 'switch', value: 'switch', },
//         ],
//     },
//     groupTemplate: {
//         category: '',
//         key: '',
//         label: '',
//         value: '',
//         // showCondition: '',
//     },
// }
// let Button: ItemsMeta = {
//     addable: false,
//     groups: [
//         {
//             category: 'input',
//             key: 'text',
//             label: '文本',
//             value: '',
//         }
//     ]
// }
// let Form: ConfigItem = {
// let Form: {[k: S]: A} = {
//     category: 'input',
//     key: '',
//     label: '',
//     value: '',
// }

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
    },
    {
        label: 'key',      // 在配置面板中的显示的文本
        category: 'input', // 在配置面板中显示的种类
        key: 'key',        // 配置组中项的key
        value: '',      // 在配置面板中设置的值
    },
    {
        label: 'label',
        category: 'input',
        key: 'label',
        value: '',
    },
    {
        label: 'value',
        category: 'input',
        key: 'value',
        value: '',
    },
    {
        label: '',
        category: 'options',
        key: 'options',
        value: [],
        template: {label: '', value: ''},
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
        label: 'field',
        category: 'input',
        key: 'field',
        value: '', // 配置项的默认值
    },
    {
        label: 'header',
        category: 'input',
        key: 'header',
        value: '',
    },
    {
        label: 'width',
        category: 'input',
        key: 'width',
        value: '150px',
    },
]
let all: {[k: S]: ConfigItem[]} = {
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