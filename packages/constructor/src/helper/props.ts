// import type { ConfigItem } from 'src/types/props'
import type { B, ConfigItem } from 'src/types/base'
import type { PropsConfigItem } from 'src/types/config'
import type { Component } from 'src/types/component'
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
            {label: '大', value: 'lg'},
            {label: '中', value: 'md'},
            {label: '小', value: 'sm'},
            {label: '更小', value: 'xs'},
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
    icon: {
        category: 'input',
        value: '',
        label: '图标',
        key: 'icon',
    }, // icon
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
    // zIndex: {
    //     category: 'number',
    //     value: 150,
    //     // maxLength
    //     // minLength
    //     label: 'zIndex',
    //     key: 'zIndex',
    // },
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
        // value: true,
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
        // value: true,
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
        // value: true,
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
        // value: true,
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
        // value: true,
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
        // value: true,
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
            { label: '大', value: 'lg', },
            { label: '中', value: 'md', },
            { label: '小', value: 'sm', },
            { label: '更小', value: 'xs', },
            { label: '迷你', value: 'mini', },
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
        hide: function (p: Component['props']) {
            // let o = p.find(item => item.key === 'virtualScroll')
            // clog('o', o)
            return p['virtualScroll']
            // if (o && 'checked' in o) {
            //     return !o.checked
            // } else {
            //     return true
            // }
        },
        hideListenerKey: 'virtualScroll',
    },
    virtualMinBufferPx: {
        category: 'input',
        value: '80',
        label: '虚拟滚动时缓冲区最小高度',
        key: 'virtualMinBufferPx',
        hide: function (p: Component['props']) {
            // let o = p.find(item => item.key === 'virtualScroll')
            // // clog('o', o)
            // // return o!.value as B
            // if (o && 'checked' in o) {
            //     return !o.checked
            // } else {
            //     return true
            // }
            return p['virtualScroll']
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
            { label: '大', value: 'lg' },
            { label: '中', value: '' },
            { label: '小', value: 'sm' },
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
        // value: true,
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
        template: { label: '', value: '', valueType: 'string', disabled: false, hideField: []},
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
        label: '是否禁用',
        key: 'disabled',
    },
    size: {
        category: 'select',
        options: [
            { label: '大', value: 'lg' },
            { label: '中', value: '' },
            { label: '小', value: 'sm' },
        ],
        value: '',
        label: '大小',
        key: 'size',
    },
    placeholder: {
        category: 'input',
        value: '请输入',
        label: '占位符',
        key: 'placeholder',
    },
    searchPlaceholder: {
        category: 'input',
        value: '',
        label: '搜索功能的占位符',
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
        // value: true,
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
        // value: true,
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
        key: 'rotate',
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
        label: '是否禁用',
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
    activeTab: {
        category: 'input',
        value: '',
        label: '当前激活的选项卡Id',
        key: 'activeTab',
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
        label: 'type',
        key: 'type',
    },
    size: {
        category: 'select',
        options: [
            { label: '大', value: 'lg', },
            { label: '中', value: 'md', },
            { label: '小', value: 'sm', },
            { label: '更小', value: 'xs', },
        ],
        value: 'md',
        label: 'size',
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
let Pagination: PropsConfigItem = {
    pageSize: {
        category: 'number',
        value: 10,
        label: '分页容量',
        key: 'pageSize',
    },
    total: {
        category: 'number',
        value: 0,
        label: '总条目数',
        key: 'total',
    },
    pageSizeOptions: {
        category: 'input',
        value: '5,10,20,50',
        label: '分页容量的枚举值',
        key: 'pageSizeOptions',
        placeholder: '以英文逗号分隔数字',
    },
    pageSizeDirection: {
        category: 'input',
        value: '',
        label: '分页容量下拉框的展开方向',
        key: 'pageSizeDirection',
    },
    pageIndex: {
        category: 'number',
        value: 1,
        label: '初始化页码',
        key: 'pageIndex',
    },
    maxItems: {
        category: 'number',
        value: 10,
        label: '分页最多显示按钮数',
        key: 'maxItems',
    },
    preLink: {
        category: 'input',
        value: '',
        label: '上一页按钮显示图标',
        key: 'preLink',
    },
    nextLink: {
        category: 'input',
        value: '',
        label: '下一页按钮显示图标',
        key: 'nextLink',
    },
    size: {
        category: 'select',
        options: [
            { label: '大', value: 'lg', },
            { label: '中', value: '', },
            { label: '小', value: 'sm', },
        ],
        value: '',
        label: '大小',
        key: 'size',
    },
    canJumpPage: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '是否显示分页输入跳转',
        key: 'canJumpPage',
    },
    canChangePageSize: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '是否显示用于选择更改分页容量的下拉框',
        key: 'canChangePageSize',
    },
    canViewTotal: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '是否显示总条目',
        key: 'canViewTotal',
    },
    totalItemText: {
        category: 'input',
        value: '所有条目',
        label: '总条目文本',
        key: 'totalItemText',
    },
    goToText: {
        category: 'input',
        value: '',
        label: '跳至',
        key: 'goToText',
    },
    showJumpButton: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '是否显示跳转按钮',
        key: 'showJumpButton',
    },
    showTruePageIndex: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '页码超出分页范围时候也显示当前页码的开关',
        key: 'showTruePageIndex',
    },
    lite: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '是否切换为极简模式',
        key: 'lite',
    },
    showPageSelector: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        // value: true,
        value: true,
        label: '极简模式下是否显示页码下拉',
        key: 'showPageSelector',
    },
    haveConfigMenu: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '极简模式下是否显示配置',
        key: 'haveConfigMenu',
    },
    autoFixPageIndex: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        // value: true,
        value: true,
        label: '改变分页容量时是否自动修正页码',
        key: 'autoFixPageIndex',
    },
    autoHide: {
        category: 'switch',
        options: [
            { label: 'false', value: false, },
            { label: 'true', value: true, },
        ],
        value: false,
        label: '是否自动隐藏',
        key: 'autoHide',
    },
}
let Flex: PropsConfigItem = {
    justifyContent: {
        category: 'select',
        options: [
            { label: '向开头对齐', value: 'flex-start' },
            { label: '向末尾对齐', value: 'flex-end' },
            { label: '居中', value: 'center' },
            { label: '两端对齐', value: 'space-between' },
            { label: '相等间距', value: 'space-around' },
        ],
        value: 'flex-start',
        label: '主轴的对齐方式',
        key: 'justifyContent',
    },
    alignItems: {
        category: 'select',
        options: [
            { label: '向开头对齐', value: 'flex-start' },
            { label: '向末尾对齐', value: 'flex-end' },
            { label: '居中', value: 'center' },
            { label: '两端对齐', value: 'space-between' },
            { label: '拉伸', value: 'stretch' },
        ],
        value: 'stretch',
        label: '垂直主轴的对齐方式',
        key: 'alignItems',
    },
    flexDirection: {
        category: 'select',
        options: [
            { label: '行', value: 'row' },
            { label: '反向行', value: 'row-reverse' },
            { label: '列', value: 'column' },
            { label: '反向列', value: 'column-reverse' },
        ],
        value: 'row',
        label: '主轴的方向',
        key: 'flexDirection',
    },
    flexWrap: {
        category: 'select',
        options: [
            { label: '不折行', value: 'nowrap' },
            { label: '折行正序', value: 'wrap' },
            { label: '折行倒序', value: 'wrap-reverse' },
        ],
        value: 'nowrap',
        label: '换行',
        key: 'flexWrap',
    },
    rowGap: {
        category: 'input',
        value: '0px',
        label: '行间隔',
        key: 'rowGap',
    },
    columnGap: {
        category: 'input',
        value: '0px',
        label: '列间隔',
        key: 'columnGap',
    },
    padding: {
        category: 'input',
        value: '0px',
        label: 'padding',
        key: 'padding',
    },
    margin: {
        category: 'input',
        value: '0px',
        label: 'margin',
        key: 'margin',
    },
}
let Grid: PropsConfigItem = {
    gridTemplateColumns: {
        category: 'input',
        value: 'auto',
        label: '每列列宽',
        key: 'gridTemplateColumns',
    },
    gridTemplateRows: {
        category: 'input',
        value: 'auto',
        label: '每列行高',
        key: 'gridTemplateRows',
    },
    rowGap: {
        category: 'input',
        value: '0px',
        label: '行间距',
        key: 'rowGap',
    },
    columnGap: {
        category: 'input',
        value: '0px',
        label: '列间距',
        key: 'columnGap',
    },
    gridTemplateAreas: {
        category: 'input',
        value: '',
        label: '定义区域',
        key: 'gridTemplateAreas',
    },
    gridAutoFlow: {
        category: 'select',
        options: [
            { label: '先行后列', value: 'row', },
            { label: '先列后行', value: 'column', },
            { label: '先行后列,尽量填满空格', value: 'row dense', },
            { label: '先列后行,尽量填满空格', value: 'column dense', },
        ],
        value: 'row',
        label: '子元素顺序',
        key: 'gridAutoFlow',
    },
    justifyItems: {
        category: 'select',
        options: [
            { label: '对齐单元格的起始边缘', value: 'start', },
            { label: '对齐单元格的结束边缘', value: 'end', },
            { label: '居中', value: 'center', },
            { label: '拉伸', value: 'stretch', },
        ],
        value: 'stretch',
        label: '元素的水平位置',
        key: 'justifyItems',
    },
    alignItems: {
        category: 'select',
        options: [
            { label: '开始', value: 'start', },
            { label: '末尾', value: 'end', },
            { label: '居中', value: 'center', },
            { label: '拉伸', value: 'stretch', },
        ],
        value: 'stretch',
        label: '元素的竖直位置',
        key: 'alignItems',
    },
    justifyContent: {
        category: 'select',
        options: [
            { label: '开始', value: 'start', },
            { label: '末尾', value: 'end', },
            { label: '居中', value: 'center', },
            { label: '拉伸', value: 'stretch', },
            { label: '不加边界相等间距', value: 'space-around', },
            { label: '两端对齐', value: 'space-between', },
            { label: '加边界相等间距', value: 'space-evently', },
        ],
        value: 'start',
        label: '网格的对齐位置',
        key: 'justifyContent',
    },
    alignContent: {
        category: 'select',
        options: [
            { label: '开始', value: 'start', },
            { label: '末尾', value: 'end', },
            { label: '居中', value: 'center', },
            { label: '拉伸', value: 'stretch', },
            { label: '不加边界相等间距', value: 'space-around', },
            { label: '两端对齐', value: 'space-between', },
            { label: '加边界相等间距', value: 'space-evently', },
        ],
        value: 'start',
        label: '网格的竖直位置',
        key: 'alignContent',
    },
    padding: {
        category: 'input',
        value: '0px',
        label: 'padding',
        key: 'padding',
    },
    margin: {
        category: 'input',
        value: '0px',
        label: 'margin',
        key: 'margin',
    },
}
let Layout: PropsConfigItem = {
    header: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '渲染上区',
        key: 'header',
    },
    headerHeight: {
        category: 'input',
        value: '120px',
        label: '上区高度',
        key: 'headerHeight',
    },
    left: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '渲染左区',
        key: 'left',
    },
    leftWidth: {
        category: 'input',
        value: '200px',
        label: '左区宽度',
        key: 'leftWidth',
    },
    main: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '渲染中区',
        key: 'main',
    },
    mainWidth: {
        category: 'input',
        value: 'auto',
        label: '中区宽度',
        key: 'mainWidth',
    },
    mainHeight: {
        category: 'input',
        value: 'auto',
        label: '中区高度',
        key: 'mainHeight',
    },
    right: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '渲染右区',
        key: 'right',
    },
    rightWidth: {
        category: 'input',
        value: '240px',
        label: '右区宽度',
        key: 'rightWidth',
    },
    footer: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '渲染下区',
        key: 'footer',
    },
    footerHeight: {
        category: 'input',
        value: '120px',
        label: '下区高度',
        key: 'footerHeight',
    },
    borderInner: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '内边框',
        key: 'borderInner',
    },
    borderOut: {
        category: 'switch',
        options: [
            {label: 'false', value: false},
            {label: 'true', value: true},
        ],
        value: true,
        label: '外边框',
        key: 'borderOut',
    },
}
let PageList: PropsConfigItem = {
}
let ShowHide: PropsConfigItem = {
    show: {
        category: 'switch',
        options: [
            {label: '显示', value: true},
            {label: '不显示', value: false},
        ],
        value: true,
        label: '是否显示',
        key: 'show',
    },
}
let Loop: PropsConfigItem = {
    layout: {
        category: 'select',
        options: [
            {label: 'flex', value: 'flex'},
            {label: 'grid', value: 'grid'},
        ],
        value: 'flex',
        label: '布局方式',
        key: 'layout',
    },
    mockCount: {
        category: 'number',
        value: 3,
        label: 'mock数量',
        key: 'mockCount',
    },
    justifyContentFlex: {
        category: 'select',
        options: [
            { label: '向开头对齐', value: 'flex-start' },
            { label: '向末尾对齐', value: 'flex-end' },
            { label: '居中', value: 'center' },
            { label: '两端对齐', value: 'space-between' },
            { label: '相等间距', value: 'space-around' },
        ],
        value: 'flex-start',
        label: '主轴的对齐方式',
        key: 'justifyContentFlex',
        hide: function (p: Component['props']) {
            clog('hide', p)
            return p['layout'] !== 'flex'
        },
        hideListenerKey: 'layout',
        hideCalc: false,
    },
    alignItemsFlex: {
        category: 'select',
        options: [
            { label: '向开头对齐', value: 'flex-start' },
            { label: '向末尾对齐', value: 'flex-end' },
            { label: '居中', value: 'center' },
            { label: '两端对齐', value: 'space-between' },
            { label: '拉伸', value: 'stretch' },
        ],
        value: 'stretch',
        label: '垂直主轴的对齐方式',
        key: 'alignItemsFlex',
        hide: function (p: Component['props']) {
            clog('hide', p)
            return p['layout'] !== 'flex'
        },
        hideListenerKey: 'layout',
        hideCalc: false,
    },
    flexDirection: {
        category: 'select',
        options: [
            { label: '行', value: 'row' },
            { label: '反向行', value: 'row-reverse' },
            { label: '列', value: 'column' },
            { label: '反向列', value: 'column-reverse' },
        ],
        value: 'row',
        label: '主轴的方向',
        key: 'flexDirection',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'flex'
        },
        hideListenerKey: 'layout',
        hideCalc: false,
    },
    flexWrap: {
        category: 'select',
        options: [
            { label: '不折行', value: 'nowrap' },
            { label: '折行正序', value: 'wrap' },
            { label: '折行倒序', value: 'wrap-reverse' },
        ],
        value: 'nowrap',
        label: '换行',
        key: 'flexWrap',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'flex'
        },
        hideListenerKey: 'layout',
        hideCalc: false,
    },
    rowGap: {
        category: 'input',
        value: '0px',
        label: '行间隔',
        key: 'rowGap',
    },
    columnGap: {
        category: 'input',
        value: '0px',
        label: '列间隔',
        key: 'columnGap',
    },
    flexGrow: {
        category: 'number',
        value: 0,
        label: '项目的放大比例',
        key: 'flexGrow',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'flex'
        },
        hideListenerKey: 'layout',
        hideCalc: false,
    },
    flexShrink: {
        category: 'number',
        value: 1,
        label: '项目的缩小比例',
        key: 'flexShrink',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'flex'
        },
        hideListenerKey: 'layout',
        hideCalc: false,
    },
    flexBasis: {
        category: 'input',
        value: 'auto',
        label: '项目本来的宽度',
        key: 'flexBasis',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'flex'
        },
        hideListenerKey: 'layout',
        hideCalc: false,
    },
    itemHeight: {
        category: 'input',
        value: 'auto',
        label: '项目本来的高度',
        key: 'itemHeight',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'flex'
        },
        hideListenerKey: 'layout',
        hideCalc: false,
    },
    gridTemplateColumns: {
        category: 'input',
        value: 'auto',
        label: '每列列宽',
        key: 'gridTemplateColumns',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'grid'
        },
        hideListenerKey: 'layout',
        hideCalc: true,
    },
    gridTemplateRows: {
        category: 'input',
        value: 'auto',
        label: '每列行高',
        key: 'gridTemplateRows',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'grid'
        },
        hideListenerKey: 'layout',
        hideCalc: true,
    },
    gridAutoFlow: {
        category: 'select',
        options: [
            { label: '先行后列', value: 'row', },
            { label: '先列后行', value: 'column', },
            { label: '先行后列,尽量填满空格', value: 'row dense', },
            { label: '先列后行,尽量填满空格', value: 'column dense', },
        ],
        value: 'row',
        label: '子元素顺序',
        key: 'gridAutoFlow',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'grid'
        },
        hideListenerKey: 'layout',
        hideCalc: true,
    },
    justifyItemsGrid: {
        category: 'select',
        options: [
            { label: '对齐单元格的起始边缘', value: 'start', },
            { label: '对齐单元格的结束边缘', value: 'end', },
            { label: '居中', value: 'center', },
            { label: '拉伸', value: 'stretch', },
        ],
        value: 'stretch',
        label: '元素的水平位置',
        key: 'justifyItemsGrid',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'grid'
        },
        hideListenerKey: 'layout',
        hideCalc: true,
    },
    alignItemsGrid: {
        category: 'select',
        options: [
            { label: '开始', value: 'start', },
            { label: '末尾', value: 'end', },
            { label: '居中', value: 'center', },
            { label: '拉伸', value: 'stretch', },
        ],
        value: 'stretch',
        label: '元素的竖直位置',
        key: 'alignItemsGrid',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'grid'
        },
        hideListenerKey: 'layout',
        hideCalc: true,
    },
    justifyContentGrid: {
        category: 'select',
        options: [
            { label: '开始', value: 'start', },
            { label: '末尾', value: 'end', },
            { label: '居中', value: 'center', },
            { label: '拉伸', value: 'stretch', },
            { label: '不加边界相等间距', value: 'space-around', },
            { label: '两端对齐', value: 'space-between', },
            { label: '加边界相等间距', value: 'space-evently', },
        ],
        value: 'start',
        label: '网格的对齐位置',
        key: 'justifyContentGrid',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'grid'
        },
        hideListenerKey: 'layout',
        hideCalc: true,
    },
    alignContentGrid: {
        category: 'select',
        options: [
            { label: '开始', value: 'start', },
            { label: '末尾', value: 'end', },
            { label: '居中', value: 'center', },
            { label: '拉伸', value: 'stretch', },
            { label: '不加边界相等间距', value: 'space-around', },
            { label: '两端对齐', value: 'space-between', },
            { label: '加边界相等间距', value: 'space-evently', },
        ],
        value: 'start',
        label: '网格的竖直位置',
        key: 'alignContentGrid',
        hide: function (p: Component['props']) {
            return p['layout'] !== 'grid'
        },
        hideListenerKey: 'layout',
        hideCalc: true,
    },
}
let InputNumber: PropsConfigItem = {
    value: {
        category: 'number',
        value: 0,
        // value: Number.MAX_SAFE_INTEGER,
        label: '值',
        key: 'value',
    },
    max: {
        category: 'number',
        // value: 10,
        value: Number.MAX_SAFE_INTEGER,
        label: '最大值',
        key: 'max',
    },
    min: {
        category: 'number',
        value: Number.MIN_SAFE_INTEGER,
        label: '最小值',
        key: 'min',
    },
    step: {
        category: 'number',
        value: 1,
        label: '步长',
        key: 'step',
    },
    size: {
        category: 'select',
        options: [
            { label: '大', value: 'lg', },
            { label: '中', value: '', },
            { label: '小', value: 'sm', },
        ],
        value: '',
        label: '步长',
        key: 'size',
    },
    decimalLimit: {
        category: 'number',
        value: 0,
        // value: undefined,
        label: '精度',
        key: 'decimalLimit',
    },
    placeholder: {
        category: 'input',
        value: '',
        label: '占位文本',
        key: 'placeholder',
    },
}
let Radio: PropsConfigItem = {
    name: {
        category: 'input',
        value: '',
        label: 'name',
        key: 'name',
    },
    valueList: {
        category: 'options',
        template: { label: '', value: '', valueType: 'string', disabled: false, hideField: ['label', 'valueType']},
        value: [],
        label: 'valueList',
        key: 'valueList',
    },
    disabled: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '禁用',
        key: 'disabled',
    },
    showGlowStyle: {
        category: 'switch',
        options: [
            { label: 'false', value: false },
            { label: 'true', value: true },
        ],
        value: false,
        label: '悬浮发光效果',
        key: 'showGlowStyle',
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
    Pagination,
    Flex,
    Grid,
    Layout,
    PageList,
    ShowHide,
    Loop,
    InputNumber,
    Radio,
}