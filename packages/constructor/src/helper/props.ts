// import type { ConfigItem } from 'src/types/props'
// import type { ConfigItem, S } from 'src/types/base'
import type { PropsConfigItem } from 'src/types/config'
// interface PropsConfigItem {
//     [k: S]: ConfigItem
// }
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
        key: '',
        // overFields: ['value'],
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
        key: '',
        // overFields: ['value'],
    },
    bordered: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '边框',
        key: '',
        // overFields: ['value'],
    },
    disabled: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '禁用',
        key: '',
        // overFields: ['value'],
    },
    width: {
        category: 'input',
        value: '',
        label: '宽度',
        key: '',
        // overFields: ['value'],
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
        key: '',
        // overFields: ['value'],
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
        key: '',
        // overFields: ['value'],
    },
    styleType: {
        category: 'select',
        options: [
            { label: 'default', value: 'default' },
            { label: 'grey', value: 'grey' },
        ],
        value: 'default',
        label: '风格',
        key: '',
        // overFields: ['value'],
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
        key: '',
    },
    options: {
        // type: 'option',
        category: 'select',
        options: [
            { label: 'oneLabel', value: 'oneVlaue' },
        ],
        // valueType: 'string',
        label: '选项',
        // addable: true,
        // reducible: true,
        // maxLength: 5,
        // minLength: 1,
        key: '',
        value: '',
    }
}
let Modal: PropsConfigItem = {
    title: {
        category: 'input',
        value: 'title',
        label: 'title',
        // overFields: ['value'],
        key: '',
    },
    visible: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '是否显示',
        // overFields: ['value'],
        key: '',
    },
    width: {
        category: 'input',
        value: '',
        label: '宽度',
        // overFields: ['value'],
        key: '',
    },
    placement: {
        category: 'select',
        options: [
            {label: 'center', value: 'center'},
            {label: 'top', value: 'top'},
            {label: 'bottom', value: 'bottom'},
        ],
        // value: 'center',
        value: '',
        label: '宽度',
        // overFields: ['value'],
        key: '',
    },
}
let Form: PropsConfigItem = {
    layout: {
        category: 'select',
        options: [
            { label: '水平', value: 'horizontal' },
            { label: '竖直', value: 'vertical' },
        ],
        // value: true,
        value: 'horizontal',
        label: '排版',
        // overFields: ['value'],
        key: '',
    },
    isCancel: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: true,
        label: '是否有取消按钮',
        // overFields: ['value'],
        key: '',
    },
    isSubmit: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: true,
        label: '是否有提交按钮',
        // overFields: ['value'],
        key: '',
    },
}
export {
    Button,
    Input,
    Select,
    Modal,
    Form,
}