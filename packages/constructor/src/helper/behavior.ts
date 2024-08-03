import type { BehaviorConfigItem } from 'src/types/config'

let clog = console.log

// 指定组件的配置项
let Button: BehaviorConfigItem = {
  event: {
    category: 'select',
    options: [
      {label: '单击', value: 'click'},
    ],
    value: '',
    label: '事件',
    key: 'event',
    allowClear: true,
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
    hide: function (itemGroup: BehaviorConfigItem) {
      // this: Component
      // itemGroup: 当前配置项组
      clog('hide', !itemGroup.target.value)
      return !itemGroup.target.value
    },
    hideListenerKey: 'target',
    // hideCalc: true, // 初始值. // 不应该设置初始值，需要在init时计算。
  },
}
let Modal: BehaviorConfigItem = {
  event: {
    category: 'select',
    options: [
      {label: '关闭后', value: 'onClose'},
      {label: '关闭前', value: 'beforeHidden'},
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
    hide: () => false
  },
}
let Form: BehaviorConfigItem = {
  event: {
    category: 'select',
    options: [
      {label: '提交', value: 'submit'},
      {label: '重置', value: 'reset'},
      // {label: '取消', value: 'cancel'},
    ],
    value: 'submit',
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
    // hide: function (itemGroup: BehaviorConfigItem) {
    //   // // this: Component
    //   // // itemGroup: 当前配置项组
    //   // clog('hide', !itemGroup.target.value)
    //   // return !itemGroup.target.value
    // },
    // hideListenerKey: 'target',
    // hideCalc: true, // 初始值. // 不应该设置初始值，需要在init时计算。
  },
}

export {
    Button,
    Modal,
    Form,
}