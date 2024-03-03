// let Button = {
//     event: {
//         type: 'select',
//         options: [
//             {label: '单击', value: 'click'},
//             {label: '双击', value: 'dbClick'},
//         ],
//         value: undefined,
//         label: '事件',
//         overFields: ['value']
//     },
//     behavior: {
//         type: 'select',
//         options: [
//             {label: '相关组件', value: 'relation'},
//         ],
//         value: undefined,
//         label: '行为',
//         overFields: ['value']
//     },
//     target: {
//         type: 'input',
//         value: '',
//         label: '目标',
//         overFields: ['value'],
//     },
//     props: {
//         type: 'keyValue',
//         keyType: 'select',
//         keyOption: [
//             // {label: 'xxx', value: 'xxx'},
//         ],
//         valueType: 'select',
//         valueOption: [
//             // {label: 'xxx', value: 'xxx'},
//         ],
//         // options: [
//         //     {label: '相关组件', value: 'relation'},
//         // ],
//         value: undefined,
//         label: 'props',
//         overFields: ['value'],
//         maxLength: 3,
//         minLength: 1,
//         addable: true
//     },

import { BehaviorItem } from "src/types/behavior"

// }
let Button: BehaviorItem = {
  event: {
    type: 'select',
    options: [
      {label: '单击', value: 'click'},
      {label: '双击', value: 'dbClick'},
    ],
    value: '',
    label: '事件',
  },
  target: {
    type: 'input',
    value: '',
  },
  payload: {
    type: 'textarea',
    value: '',
  },
}
export {
    Button
}