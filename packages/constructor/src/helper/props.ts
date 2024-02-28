import type { ComponentPropsMetaRaw } from 'src/types/props'
let Button: ComponentPropsMetaRaw = {
    type: {
        type: 'select',
        options: [
            {label: 'button', value: 'button'},
            {label: 'submit', value: 'submit'},
            {label: 'reset', value: 'reset'},
        ],
        value: 'button',
        label: '类型',
        overFields: ['value'],
    },
    bsSize: {
        type: 'select',
        options: [
            {label: 'lg', value: 'lg'},
            {label: 'md', value: 'md'},
            {label: 'sm', value: 'sm'},
            {label: 'xs', value: 'xs'},
        ],
        value: 'md',
        label: '大小',
        overFields: ['value'],
    },
    bordered: {
        type: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '边框',
        overFields: ['value'],
    },
    disabled: {
        type: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '禁用',
        overFields: ['value'],
    },
    width: {
        type: 'input',
        value: '',
        label: '宽度',
        overFields: ['value'],
    }
}
let Input: ComponentPropsMetaRaw = {
    error: {
        type: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否出现错误状态',
        overFields: ['value'],
    },
    size: {
        type: 'select',
        options: [
            { label: 'sm', value: 'sm' },
            { label: '""', value: '' },
            { label: 'lg', value: 'lg' },
        ],
        value: '',
        label: '尺寸',
        overFields: ['value'],
    },
    // showGlowStyle: {
    //     type: 'switch',
    //     options: [
    //         { label: 'false', value: false },
    //         { label: 'true', value: true },
    //     ],
    //     value: true,
    //     label: '发光效果'
    // },
    styleType: {
        type: 'select',
        options: [
            { label: 'default', value: 'default' },
            { label: 'grey', value: 'grey' },
        ],
        value: 'default',
        label: '风格',
        overFields: ['value'],
    },
}
let Select: ComponentPropsMetaRaw = {
    styleType: {
        type: 'select',
        options: [
            { label: 'default', value: 'default' },
            { label: 'grey', value: 'grey' },
        ],
        value: 'default',
        label: '风格',
        overFields: ['value']
    },
    options: {
        type: 'option',
        // value: [
        options: [
            { label: 'oneLabel', value: 'oneVlaue' },
            // { label: 'ones', value: 'one', disabled: true },
        ],
        valueType: 'string',
        label: '选项',
        addable: true,
        reducible: true,
        maxLength: 5,
        minLength: 1,
        overFields: ['options']
    }
}
let Modal: ComponentPropsMetaRaw = {
    title: {
        type: 'input',
        value: 'title',
        label: 'title',
        overFields: ['value'],
    },
    visible: {
        type: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '是否显示',
        overFields: ['value'],
    },
    width: {
        type: 'input',
        value: '',
        label: '宽度',
        overFields: ['value'],
    },
    placement: {
        type: 'select',
        options: [
            {label: 'center', value: 'center'},
            {label: 'top', value: 'top'},
            {label: 'bottom', value: 'bottom'},
        ],
        // value: 'center',
        value: '',
        label: '宽度',
        overFields: ['value'],
    },
}
let Form: ComponentPropsMetaRaw = {
    layout: {
        type: 'select',
        options: [
            { label: '水平', value: 'horizontal' },
            { label: '竖直', value: 'vertical' },
        ],
        value: true,
        label: '排版',
        overFields: ['value'],
    },
    isCancel: {
        type: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: true,
        label: '是否有取消按钮',
        overFields: ['value'],
    },
    isSubmit: {
        type: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: true,
        label: '是否有提交按钮',
        overFields: ['value'],
    },
}
export {
    Button,
    Input,
    Select,
    Modal,
    Form,
}