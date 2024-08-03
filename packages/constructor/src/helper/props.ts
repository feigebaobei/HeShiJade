// import type { ConfigItem } from 'src/types/props'
// import type { ConfigItem, S } from 'src/types/base'
import type { PropsConfigItem } from 'src/types/config'
// interface PropsConfigItem {
//     [k: S]: ConfigItem
// }

let clog = console.log

// 指定组件的配置项
let Button: PropsConfigItem = {
    type: { // 类型
        category: 'select',
        options: [
            {label: 'button', value: 'button'},
            {label: 'submit', value: 'submit'},
            {label: 'reset', value: 'reset'},
        ],
        value: 'button',
        label: '类型',
        key: 'type',
    },
    bsStyle: { // 风格
        category: 'select',
        options: [
            {label: 'primary', value: 'primary'},
            {label: 'common', value: 'common'},
            {label: 'text', value: 'text'},
            {label: 'danger', value: 'danger'},
        ],
        value: 'primary',
        label: '风格',
        key: 'bsStyle',
    },
    bsSize: {
        category: 'select',
        options: [
            {label: 'lg', value: 'lg'},
            {label: 'md', value: 'md'},
            {label: 'sm', value: 'sm'},
            {label: 'xs', value: 'xs'},
        ],
        value: 'md',
        label: '大小',
        key: 'bsSize',
    },
    bordered: { // 是否有边框
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '边框',
        key: 'bordered',
    },
    // icon: {
    //     category: 'input',
    //     value: '',
    //     label: '图标',
    //     key: 'icon',
    // }, // icon
    shape: {
        category: 'select',
        options: [
            {label: '圆形', value: 'circle'},
            {label: '矩形', value: ''},
        ],
        value: '',
        label: '形状',
        key: 'shape',
    }, // 是否圆形
    showLoading: {
        category: 'switch',
        options: [
            {label: '显示', value: true},
            {label: '隐藏', value: false},
        ],
        value: false,
        label: '是否显示加载提示',
        key: 'showLoading',
    }, // 是否显示加载提示
    width: { // 宽度
        category: 'input',
        value: '',
        label: '宽度',
        key: 'width',
    },
    disabled: { // 是否禁用
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '禁用',
        key: 'disabled',
    },
    text: {
        category: 'input',
        value: 'button',
        label: '文本',
        key: 'text',
    }
}
let Input: PropsConfigItem = {
    error: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否出现错误状态',
        key: 'error',
    },
    size: {
        category: 'select',
        options: [
            { label: 'sm', value: 'sm' },
            { label: '""', value: '' },
            { label: 'lg', value: 'lg' },
        ],
        value: '',
        label: '尺寸',
        key: 'size',
    },
    styleType: {
        category: 'select',
        options: [
            { label: 'default', value: 'default' },
            { label: 'grey', value: 'grey' },
        ],
        value: 'default',
        label: '风格',
        key: 'styleType',
    },
}
let Select: PropsConfigItem = {
    styleType: {
        category: 'select',
        options: [
            { label: 'default', value: 'default' },
            { label: 'grey', value: 'grey' },
        ],
        value: 'default',
        label: '风格',
        key: 'styleType',
    },
    options: {
        category: 'select',
        options: [
            { label: 'oneLabel', value: 'oneVlaue' },
        ],
        value: '',
        label: '选项',
        key: 'options',
    }
}
let Modal: PropsConfigItem = {
    title: {
        category: 'input',
        value: 'title',
        label: 'title',
        key: 'title',
    },
    width: {
        category: 'input',
        value: '640px',
        label: '宽度',
        key: 'width',
    },
    zIndex: {
        category: 'number',
        value: 150,
        // maxLength
        // minLength
        label: 'zIndex',
        key: 'zIndex',
    },
    visible: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '是否默认显示', // 默认显示 与 显示 共用一个。
        key: 'visible',
        // hide: (p: PropsConfigItem) => {
        //     clog('hide', p)
        //     return !!p['title']
        // },
        // hideListenerKey: 'title',
    },
    showAnimation: {
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        value: true,
        label: '是否使用动画',
        key: 'showAnimation',
    },
    backdropCloseable: {
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        value: true,
        label: '点击空白是否关闭',
        key: 'backdropCloseable',
    },
    placement: {
        category: 'select',
        options: [
            {label: 'center', value: 'center'},
            {label: 'top', value: 'top'},
            {label: 'bottom', value: 'bottom'},
            {label: 'unset', value: 'unset'},
        ],
        value: 'center',
        label: '位置',
        key: 'placement',
    },
    offsetX: {
        category: 'input',
        value: '0px',
        label: '横向偏移',
        key: 'offsetX',
        placeholder: '如：0px'
    },
    offsetY: {
        category: 'input',
        value: '0px',
        label: '纵向偏移',
        key: 'offsetY',
        placeholder: '如：0px'
    },
    bodyScrollable: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '外层是否可滚动',
        key: 'bodyScrollable',
    },
    escapable: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '外层支持esc关闭',
        key: 'escapable',
    },
    // dMoveable: {
    //     category: 'switch',
    //     options: [
    //         {label: 'false', value: false},
    //         {label: 'true', value: true},
    //     ],
    //     value: true,
    //     label: '是否可拖动',
    //     key: 'dMoveable',
    // },
}
let Form: PropsConfigItem = {
    layout: {
        category: 'select',
        options: [
            { label: '水平', value: 'horizontal' },
            { label: '竖直', value: 'vertical' },
        ],
        value: 'horizontal',
        label: '排版',
        key: 'layout',
    },
    labelSize: {
        category: 'input',
        value: '100px',
        label: 'label的宽度',
        key: 'labelSize',
        placeholder: '如：100px'
    },
    labelAlign: {
        category: 'select',
        options: [
            {label: 'start', value: 'start'},
            {label: 'center', value: 'center'},
            {label: 'end', value: 'end'},
        ],
        value: 'start',
        label: 'label的对齐方式',
        key: 'labelAlign',
    },
    isCancel: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: true,
        label: '是否有取消按钮',
        key: 'isCancel',
    },
    isSubmit: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: true,
        label: '是否有提交按钮',
        key: 'isSubmit',
    },
    url: {
        category: 'input',
        value: '',
        label: 'url',
        key: 'url',
    },
}
let Table: PropsConfigItem = {
    size: {
        category: 'select',
        options: [
            { label: 'mini', value: 'mini', },
            { label: 'xs', value: 'xs', },
            { label: 'sm', value: 'sm', },
            { label: 'md', value: 'md', },
            { label: 'lg', value: 'lg', },
        ],
        value: 'sm',
        label: '大小',
        key: 'size',
    },
    url: {
        category: 'input',
        value: '',
        label: 'url',
        key: 'url',
    }
}
export {
    Button,
    Input,
    Select,
    Modal,
    Form,
    Table,
}