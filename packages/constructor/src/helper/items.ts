// import type { ComponentPropsMetaRaw } from 'src/types/props'
import { B, Options, S, N, A, ConfigItem } from 'src/types/base';
import type { 
    // ComponentItem, 
    ItemsMeta } from 'src/types/items';
// 指定组件的配置项

let clog = console.log

let Input: ConfigItem[] = []
let Button: ConfigItem[] = []
let Modal: ConfigItem[] = []
let Form: ConfigItem[] = [
    {
        label: '种类',
        category: 'select',
        options: [
            {label: 'input', value: 'input'},
            {label: 'select', value: 'select'},
            {label: 'switch', value: 'switch'},
        ],
        key: 'category',
        value: 'input',
        // show: true,
    },
    {
        label: 'key',      // 在配置面板中的显示的文本
        category: 'input', // 在配置面板中显示的种类
        key: 'key',        // 配置组中项的key
        value: '',      // 在配置面板中设置的值
        // show: true,
    },
    {
        label: 'label',
        category: 'input',
        key: 'label',
        value: '',
        // show: true,
    },
    {
        label: 'value',
        category: 'input',
        key: 'value',
        value: '',
        // show: true,
    },
    {
        label: '',
        category: 'options',
        key: 'options',
        value: [],
        template: {label: '', value: ''},
        hide: function (p: ConfigItem[]) {
            let o = p.find(item => item.key === 'category')
            // clog('o', o)
            let r = false
            if (o) { // 存在且不为select，则隐藏
                r = o.value !== 'select'
            } else { // 不存在，则隐藏
                r = true
            }
            return r
        },
        hideListenerKey: 'category',
        // show: true,
    },
    {
        label: '必填',
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        key: 'required',
        value: false,
    },
    {
        label: '显示帮助',
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        key: 'hasHelp',
        value: false,
    },
    {
        label: '帮助文本',
        category: 'input',
        key: 'helpTips',
        value: '',
        hide: function (p: ConfigItem[]) { // 是否隐藏
            let o = p.find(item => item.key === 'hasHelp')
            // clog('hide', o)
            return !o!.value
        },
        hideListenerKey: 'hasHelp',
    },
    {
        label: '附加信息',
        category: 'input',
        key: 'extraInfo',
        value: '',
    },
    {
        label: '渲染',
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        key: 'visible',
        value: true,
    },
]
let FormItemCategory = [
    { label: 'input', value: 'input', },
    { label: 'select', value: 'select', },
    { label: 'switch', value: 'switch', },
]
let Table: ConfigItem[] = [
    {
        label: '类型',
        category: 'select',
        options: [
            {label: 'fill', value: 'fill'},
            {label: 'slots', value: 'slots'},
        ],
        key: 'category',
        value: 'fill',
        // show: true,
    },
    {
        label: 'field',
        category: 'input',
        key: 'field',
        value: '', // 配置项的默认值
        // show: true,
    },
    {
        label: 'header',
        category: 'input',
        key: 'header',
        value: '',
        // show: true,
    },
    // {
    //     label: '列宽度是否可调整',
    //     category: 'switch',
    //     options: [
    //         {label: 'false', value: false,},
    //         {label: 'true', value: true,},
    //     ],
    //     key: 'resizeEnabled',
    //     value: false,
    // },
    {
        label: '最大宽度',
        category: 'input',
        key: 'maxWidth',
        value: '',
    },
    {
        label: '宽度',
        category: 'input',
        key: 'width',
        value: '150px',
        // show: true,
    },
    {
        label: '最小宽度',
        category: 'input',
        key: 'minWidth',
        value: '',
    },
    {
        label: '是否可过滤',
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        key: 'filterable',
        value: false,
    },
    {
        label: '过滤时是否多选',
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        key: 'filterMultiple',
        value: false,
        hide: function (p: ConfigItem[]) { // 是否隐藏
            let o = p.find(item => item.key === 'filterable')
            return !o!.value
        },
        hideListenerKey: 'filterable',
    },
    {
        label: '表格或者body滚动时是否关闭过滤框',
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        key: 'closeFilterWhenScroll',
        value: false,
    },
    {
        label: '是否可排序',
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        key: 'sortable',
        value: false,
    },
    {
        label: '该列固定到左侧的距离',
        category: 'input',
        key: 'fixedLeft',
        value: '',
    },
    {
        label: '该列固定到右侧的距离',
        category: 'input',
        key: 'fixedRight',
        value: '',
    },
    {
        label: 'childUlid',
        category: 'input',
        key: 'childUlid',
        value: '',
        // show: false,
        // hide: () => true,
        hideConfig: true,
    },
]
let Select: ConfigItem[] = [
    
]
let Tabs: ConfigItem[] = [
    {
        label: 'id',
        category: 'input',
        key: 'id',
        value: '',
    },
    {
        label: '标题',
        category: 'input',
        key: 'title',
        value: '',
    },
    {
        label: '是否禁用',
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        key: 'disabled',
        value: false,
    },
]
let all: {[k: S]: ConfigItem[]} = {
    Input,
    Button,
    Modal,
    Form,
    // FormItemCategory,
    Table,
    Select,
    // Icon, // 没有子元素
    // Checkbox, // 没有子元素
    Tabs,
    // Pagination, // 没有子元素
}

export default all