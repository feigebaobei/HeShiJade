// import type { ComponentPropsMetaRaw } from 'src/types/props'
import { B, Options, S, N, ConfigItem } from 'src/types/base';
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
let Form: ConfigItem =    {
        category: 'input',
        key: '',
        label: '',
        value: '',
    }

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


export {
    // Button,
    // Input,
    // Select,
    // Modal,
    Form,
    FormItemCategory,
    // Button,
}