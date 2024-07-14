// import type { ConfigItem } from 'src/types/props'
// import type { ConfigItem, S } from 'src/types/base'
import type { PropsConfigItem } from 'src/types/config'
// interface PropsConfigItem {
//     [k: S]: ConfigItem
// }

let clog = console.log

// 指定组件的配置项
let Button: PropsConfigItem = {
    type: {
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
    bordered: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '边框',
        key: 'bordered',
    },
    disabled: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '禁用',
        key: 'disabled',
    },
    width: {
        category: 'input',
        value: '',
        label: '宽度',
        key: 'width',
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
    visible: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '是否显示',
        key: 'visible',
        // hide: (p: PropsConfigItem) => {
        //     clog('hide', p)
        //     return !!p['title']
        // },
        // hideListenerKey: 'title',
    },
    width: {
        category: 'input',
        value: '',
        label: '宽度',
        key: 'width',
    },
    placement: {
        category: 'select',
        options: [
            {label: 'center', value: 'center'},
            {label: 'top', value: 'top'},
            {label: 'bottom', value: 'bottom'},
        ],
        value: '',
        label: '位置',
        key: 'placement',
    },
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