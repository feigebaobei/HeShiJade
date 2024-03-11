import type { BehaviorConfigItem } from 'src/types/config'
// 指定组件的配置项
let Button: BehaviorConfigItem = {
  event: {
    category: 'select',
    options: [
      {label: '单击', value: 'click'},
      {label: '双击', value: 'dbClick'},
    ],
    value: '',
    label: '事件',
    key: 'event',
  },
  target: {
    category: 'input',
    value: '',
    label: '目标',
    key: 'target',
  },
  payload: {
    category: 'textarea',
    value: '',
    label: '载荷',
    key: 'payload',
  },
}

export {
    Button
}