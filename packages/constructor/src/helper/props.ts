import type { ComponentPropsMetaRaw } from 'src/types/props'
let Button: ComponentPropsMetaRaw = {
    type: {
        type: 'select',
        options: [
            {name: 'button', value: 'button'},
            {name: 'submit', value: 'submit'},
            {name: 'reset', value: 'reset'},
        ],
        value: 'button',
        label: '类型',
    },
    bsSize: {
        type: 'select',
        options: [
            {name: 'lg', value: 'lg'},
            {name: 'md', value: 'md'},
            {name: 'sm', value: 'sm'},
            {name: 'xs', value: 'xs'},
        ],
        value: 'md',
        label: '大小',
    },
    bordered: {
        type: 'switch',
        options: [
            {name: 'false', value: false},
            {name: 'true', value: true},
        ],
        value: false,
        label: '边框',
    },
    disabled: {
        type: 'switch',
        options: [
            {name: 'false', value: false},
            {name: 'true', value: true},
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
export {
    Button
}