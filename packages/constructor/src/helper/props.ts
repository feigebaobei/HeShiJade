// import type { ConfigItem } from 'src/types/props'
import type { B, ConfigItem } from 'src/types/base'
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
    url: {
        category: 'input',
        value: '',
        label: 'url',
        key: 'url',
    },
    tableWidth: {
        category: 'input',
        value: '100%',
        label: '表格宽度',
        key: 'tableWidth',
        placeholder: '如：100px',
    },
    maxWidth: {
        category: 'input',
        value: '',
        label: '最大宽度',
        key: 'maxWidth',
    },
    tableHeight: {
        category: 'input',
        value: '',
        label: '表格高度',
        key: 'tableHeight',
    },
    maxHeight: {
        category: 'input',
        value: '',
        label: '最大高度',
        key: 'maxHeight',
    },
    minHeight: {
        category: 'input',
        value: '',
        label: '最小高度',
        key: 'minHeight',
    },
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
    // rowHoveredHighLight: {
    //     category: 'switch',
    //     options: [
    //         {label: 'false', value: false},
    //         {label: 'true', value: true},
    //     ],
    //     value: true,
    //     label: '悬浮行时是否高亮',
    //     key: 'rowHoveredHighLight',
    // },
    fixHeader: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '表头是否固定',
        key: 'fixHeader',
    },
    colDraggable: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '列是否可拖动排序',
        key: 'colDraggable',
    },
    virtualScroll: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '是否虚拟滚动',
        key: 'virtualScroll',
    },
    virtualItemSize: {
        category: 'input',
        value: '40px',
        label: '虚拟滚动时每一行的高度',
        key: 'virtualItemSize',
        hide: function (p: ConfigItem[]) {
            let o = p.find(item => item.key === 'virtualScroll')
            // clog('o', o)
            return o!.value as B
        },
        hideListenerKey: 'virtualScroll',
    },
    virtualMinBufferPx: {
        category: 'input',
        value: '80',
        label: '虚拟滚动时缓冲区最小高度',
        key: 'virtualMinBufferPx',
        hide: function (p: ConfigItem[]) {
            let o = p.find(item => item.key === 'virtualScroll')
            // clog('o', o)
            return o!.value as B
        },
        hideListenerKey: 'virtualScroll',
        placeholder: '如：80',
    },
    checkable: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '是否可勾选行',
        key: 'checkable',
    },
    resizeable: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '是否可以拖拽调整列宽',
        key: 'resizeable',
    },
    headerBg: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '表头是否显示背景色',
        key: 'headerBg',
    },
    tableLayout: {
        category: 'select',
        options: [
            {label: 'fixed', value: 'fixed'},
            {label: 'auto', value: 'auto'},
        ],
        value: 'fixed',
        label: '表格布局',
        key: 'tableLayout',
    },
    borderType: {
        category: 'select',
        options: [
            {label: '只有横线', value: ''},
            {label: '只无边框', value: 'borderless'},
            {label: '全边框', value: 'bordered'},
        ],
        value: '',
        label: '表格边框',
        key: 'borderType',
    },
    striped: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: false,
        label: '是否展示为斑马纹间隔',
        key: 'striped',
    },
    shadowType: {
        category: 'select',
        options: [
            {label: '无阴影', value: 'normal'},
            {label: '有阴影', value: 'embed'},
        ],
        value: 'normal',
        label: '阴影类型',
        key: 'shadowType',
    },
    tableOverflowType: {
        category: 'select',
        options: [
            {label: '自动', value: 'auto'},
            {label: '悬浮时出现', value: 'overlay'},
        ],
        value: 'auto',
        label: '滚动条类型',
        key: 'tableOverflowType',
    },
}
let Input: PropsConfigItem = {
    value: {
        category: 'input',
        value: '',
        label: '值',
        key: 'value',
    },
    error: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否显示错误状态',
        key: 'error',
    },
    size: {
        category: 'select',
        options: [
            { label: '小', value: 'sm' },
            { label: '中', value: '' },
            { label: '大', value: 'lg' },
        ],
        value: '',
        label: '尺寸',
        key: 'size',
    },
    showGlowStyle: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: true,
        label: '是否显示悬浮发光效果',
        key: 'showGlowStyle',
    },
    styleType: {
        category: 'select',
        options: [
            { label: '有线框白底风格', value: 'default' },
            { label: '无线框灰底风格', value: 'gray' },
        ],
        value: 'default',
        label: '风格',
        key: 'styleType',
    },
    placeholder: {
        category: 'input',
        value: '请输入',
        label: '占位符',
        key: 'placeholder',
    },
}
let Select: PropsConfigItem = {
    value: {
        category: 'input',
        value: '',
        label: '值',
        key: 'value',
    },
    styleType: {
        category: 'select',
        options: [
            { label: 'default', value: 'default' },
            { label: 'gray', value: 'gray' },
        ],
        value: 'default',
        label: '风格',
        key: 'styleType',
    },
    options: {
        category: 'options',
        template: { label: '', value: '' },
        value: [],
        label: '选项',
        key: 'options',
    },
    isSearch: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否支持过滤搜索',
        key: 'isSearch',
    },
    optscrollHightons: {
        category: 'input',
        value: '300px',
        label: '选项',
        key: 'scrollHight',
    },
    multiple: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否支持多选',
        key: 'multiple',
    },
    isSelectAll: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否显示全选',
        key: 'isSelectAll',
    },
    readonly: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否可以输入',
        key: 'readonly',
    },
    disabled: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '选项',
        key: 'disabled',
    },
    size: {
        category: 'select',
        options: [
            { label: '小', value: 'sm' },
            { label: '中', value: '' },
            { label: '大', value: 'lg' },
        ],
        value: '',
        label: '大小',
        key: 'size',
    },
    placeholder: {
        category: 'input',
        value: '请输入',
        label: '点位符',
        key: 'placeholder',
    },
    searchPlaceholder: {
        category: 'input',
        value: '',
        label: '搜索功能的点位符',
        key: 'searchPlaceholder',
    },
    direction: {
        category: 'select',
        options: [
            { label: 'auto', value: 'auto' },
            { label: 'up', value: 'up' },
            { label: 'down', value: 'down' },
        ],
        value: 'auto',
        label: '下拉选框弹出方向',
        key: 'direction',
    },
    overview: {
        category: 'select',
        options: [
            { label: 'border', value: 'border' },
            { label: 'underlined', value: 'underlined' },
        ],
        value: 'border',
        label: '决定选择框样式显示',
        key: 'overview',
    },
    appendToBody: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否附加到body',
        key: 'appendToBody',
    },
    allowClear: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '清空',
        key: 'allowClear',
    },
    showAnimation: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: true,
        label: '是否开启动画',
        key: 'showAnimation',
    },
    color: {
        category: 'input',
        value: '',
        label: '复选框颜色',
        key: 'color',
    },
    showGlowStyle: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: true,
        label: '是否显示悬浮发光效果',
        key: 'showGlowStyle',
    },
}
let Icon: PropsConfigItem = {
    icon: {
        category: 'input',
        value: 'icon-add',
        label: '名称',
        key: 'icon',
    },
    operable: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否可操作',
        key: 'operable',
    },
    disabled: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否禁用',
        key: 'disabled',
    },
    rotate: {
        category: 'input',
        value: '',
        label: '旋转角度',
        key: 'icon',
    },
    color: {
        category: 'input',
        value: '#333',
        label: '颜色',
        key: 'color',
    },
}
let Checkbox: PropsConfigItem = {
    label: {
        category: 'input',
        value: '',
        label: 'label',
        key: 'label',
    },
    value: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '值',
        key: 'value',
    },
    disabled: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '名称',
        key: 'disabled',
    },
    halfchecked: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '半选状态',
        key: 'halfchecked',
    },
    color: {
        category: 'input',
        value: '#5e7ce0',
        label: '复选框颜色',
        key: 'color',
    },
    showAnimation: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否显示动画',
        key: 'showAnimation',
    },
    showGlowStyle: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '是否显示悬浮发光效果',
        key: 'showGlowStyle',
    },
}
let Tabs: PropsConfigItem = {
    activeTag: {
        category: 'input',
        value: '',
        label: '当前激活的选项卡Id',
        key: 'activeTag',
    },
    type: {
        category: 'select',
        options: [
            { label: 'tabs', value: 'tabs', },
            { label: 'pills', value: 'pills', },
            { label: 'wrapped', value: 'wrapped', },
            { label: 'slider', value: 'slider', },
        ],
        value: 'tabs',
        label: 'label',
        key: 'type',
    },
    size: {
        category: 'select',
        options: [
            { label: '超小', value: 'xs', },
            { label: '小', value: 'sm', },
            { label: '中', value: 'md', },
            { label: '大', value: 'lg', },
        ],
        value: 'md',
        label: 'label',
        key: 'size',
    },
    customWidth: {
        category: 'input',
        value: '',
        label: '选项卡的宽度',
        key: 'customWidth',
    },
    closeable: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '是否显示删除图标',
        key: 'closeable',
    },
    // addable: {
    //     category: 'switch',
    //     options: [
    //         { label: 'false', value: false, },
    //         { label: 'true', value: true, },
    //     ],
    //     value: false,
    //     label: '是否显示添加选项卡',
    //     key: 'addable',
    // },
    scrollMode: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '是否启用大数据滚动显示',
        key: 'scrollMode',
    },
    isHidden: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '选项卡内容隐藏时是否销毁',
        key: 'isHidden',
    },
}
export {
    Button,
    Modal,
    Form,
    Table,
    Input,
    Select,
    Icon,
    Checkbox,
    Tabs,
}