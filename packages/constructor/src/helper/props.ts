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
    },
    bordered: {
        type: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '边框',
    },
    disabled: {
        type: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '禁用',
    },
    width: {
        type: 'input',
        value: '',
        label: '宽度',
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
        label: '是否出现错误状态'
    },
    size: {
        type: 'select',
        options: [
            { label: 'sm', value: 'sm' },
            { label: '""', value: '' },
            { label: 'lg', value: 'lg' },
        ],
        value: '',
        label: '尺寸'
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
        label: '风格'
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
        label: '风格'
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
    }
}
export {
    Button,
    Input,
    Select,
}