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
    },
    {
        label: 'key',      // 在配置面板中的显示的文本
        category: 'input', // 在配置面板中显示的种类
        key: 'key',        // 配置组中项的key
        value: '',      // 在配置面板中设置的值
    },
    {
        label: 'label',
        category: 'input',
        key: 'label',
        value: '',
    },
    {
        label: 'value',
        category: 'input',
        key: 'value',
        value: '',
        hide: function (p: ConfigItem[]) {
            let o = p.find(item => item.key === 'category')
            let r = false
            if (o && 'value' in o) {
                r = o.value === 'switch'
            } else {
                r = true
            }
            return r
        },
        hideListenerKey: 'category',
    },
    {
        label: 'checked',
        category: 'switch',
        key: 'checked',
        checked: false,
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        hide: function (p: ConfigItem[]) {
            let o = p.find(item => item.key === 'category')
            let r = false
            if (o && 'value' in o) {
                r = o.value !== 'switch'
            } else {
                r = true
            }
            return r
        },
        hideListenerKey: 'category',
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
            if (o && 'value' in o) { // 存在且不为select，则隐藏
                r = o.value !== 'select'
            } else { // 不存在，则隐藏
                r = true
            }
            return r
        },
        hideListenerKey: 'category',
    },
    {
        label: '必填',
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        key: 'required',
        // value: false,
        checked: false,
    },
    {
        label: '显示帮助',
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        key: 'hasHelp',
        // value: false,
        checked: false,
    },
    {
        label: '帮助文本',
        category: 'input',
        key: 'helpTips',
        value: '',
        hide: function (p: ConfigItem[]) { // 是否隐藏
            let o = p.find(item => item.key === 'hasHelp')
            // clog('hide', o)
            // return !o!.value
            if (o && 'checked' in o) {
                return !o.checked
            } else {
                return true
            }
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
        // value: true,
        checked: true,
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
    },
    {
        label: 'field',
        category: 'input',
        key: 'field',
        value: '', // 配置项的默认值
    },
    {
        label: 'header',
        category: 'input',
        key: 'header',
        value: '',
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
        // value: false,
        checked: false,
    },
    {
        label: '过滤时是否多选',
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        key: 'filterMultiple',
        // value: false,
        checked: false,
        hide: function (p: ConfigItem[]) { // 是否隐藏
            let o = p.find(item => item.key === 'filterable')
            // return !o!.value
            if (o && 'checked' in o) {
                return !o.checked
            } else {
                return true
            }
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
        // value: false,
        checked: false,
    },
    {
        label: '是否可排序',
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        key: 'sortable',
        // value: false,
        checked: false,
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
        // value: false,
        checked: false,
    },
]
let Flex: ConfigItem[] = [
    {
        label: '项目的排列顺序,越小越靠前',
        category: 'number',
        key: 'order',
        value: 0,
    },
    {
        label: '项目的放大比例',
        category: 'number',
        key: 'flexGrow',
        value: 0,
    },
    {
        label: '项目的缩小比例',
        category: 'number',
        key: 'flexShrink',
        value: 1,
    },
    {
        label: '项目本来的大小',
        category: 'input',
        key: 'flexBasis',
        value: 'auto',
    },
    {
        label: '当前项目的对齐方式',
        category: 'input',
        key: 'alignSelf',
        value: 'auto',
    },
]
let Grid: ConfigItem[] = [
    {
        label: '左边框所在的垂直网格线',
        category: 'input',
        key: 'gridColumnStart',
        value: '',
    },
    {
        label: '上边框所在的垂直网格线',
        category: 'input',
        key: 'gridRowStart',
        value: '',
    },
    {
        label: '右边框所在的垂直网格线',
        category: 'input',
        key: 'gridRowEnd',
        value: '',
    },
    {
        label: '区域',
        category: 'input',
        key: 'gridArea',
        value: '',
    },
    {
        label: '当前元素的水平位置',
        category: 'select',
        options: [
            {label: '开头', value: 'start',},
            {label: '末尾', value: 'end',},
            {label: '居中', value: 'center',},
            {label: '拉伸', value: 'stretch',},
        ],
        key: 'justifySelf',
        value: 'start',
    },
    {
        label: '当前元素的竖直位置',
        category: 'select',
        options: [
            {label: '开头', value: 'start',},
            {label: '末尾', value: 'end',},
            {label: '居中', value: 'center',},
            {label: '拉伸', value: 'stretch',},
        ],
        key: 'alignSelf',
        value: 'start',
    },
]
let Layout: ConfigItem[] = [
    // {
    //     label: '元素',
    //     category: 'select',
    //     options: [
    //         {label: '上区', value: 'header',},
    //         {label: '左区', value: 'left',},
    //         {label: '主区', value: 'main',},
    //         {label: '右区', value: 'right',},
    //         {label: '下区', value: 'footer',},
    //     ],
    //     key: 'alignSelf',
    //     value: 'start',
    // },

]
let PageList: ConfigItem[] = [
    // {
    //     parentKey: '',
    //     key: '',
    //     label: '',
    //     isRenderer: true,
    //     isDisable: false,
    // }
    {
        label: '父key',
        category: 'input',
        key: 'parentKey',
        value: '',
    },
    {
        label: 'key',
        category: 'input',
        key: 'key',
        value: '',
    },
    {
        label: 'label',
        category: 'input',
        key: 'name',
        value: '',
    },
    {
        label: 'icon',
        category: 'input',
        key: 'icon',
        value: '',
    },
    {
        label: '是否打开',
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        key: 'isOpen',
        checked: false,
    },
    {
        label: '渲染',
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        key: 'isRenderer',
        checked: true,
    },
    {
        label: '禁用',
        category: 'switch',
        options: [
            {label: 'false', value: false,},
            {label: 'true', value: true,},
        ],
        key: 'isDisabled',
        checked: false,
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
    Flex,
    Grid,
    Layout,
    PageList,
}

export default all