import type { BehaviorConfigGroup } from 'src/types/config'
import type { S } from 'src/types/base'
let clog = console.log


let Button: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '单击', value: 'click'},
    ],
    value: '',
    label: '事件',
    key: 'event',
    allowClear: true,
  },
  {
    category: 'textarea',
    value: '',
    label: '方法体',
    key: 'fnBody',
  }
]
let Modal: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '关闭后', value: 'onClose'},
      {label: '关闭前', value: 'beforeHidden'},
    ],
    value: '',
    label: '事件',
    key: 'event',
  },
  {
    category: 'textarea',
    value: '',
    label: '方法体',
    key: 'fnBody',
  }
]
let Form: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '提交', value: 'submit'},
      {label: '重置', value: 'reset'},
      // {label: '取消', value: 'cancel'},
      {label: '渲染完成后', value: 'postRender'},
    ],
    value: 'submit',
    label: '事件',
    key: 'event',
  },
  {
    category: 'textarea',
    value: '',
    label: '方法体',
    key: 'fnBody',
  }
]
let Table: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变行勾选', value: 'rowCheckChange'},
      {label: '改变全勾选', value: 'checkAllChange'},
      {label: '改变列宽', value: 'resize'},
      {label: '关闭子列表', value: 'childrenTableClose'},
      {label: '关闭全部子列表', value: 'allChildrenTableClose'},
      {label: '单击单元格', value: 'cellClick'},
      {label: '双击单元格', value: 'cellDBClick'},
      {label: '单击行', value: 'rowClick'},
      {label: '双击行', value: 'rowDBClick'},
      {label: '改变扩展行', value: 'detialToggle'},
      {label: '开始编辑', value: 'cellEditStart'},
      {label: '结束编辑', value: 'cellEditEnd'},
      {label: '表格内部滚动', value: 'tableScrollEvent'},
      {label: '结束列拖拽', value: 'columnDragEnd'},
      {label: '完成延迟懒加载', value: 'loadMore'},
      {label: '渲染完成后', value: 'postRender'},
    ],
    value: '',
    label: '事件',
    key: 'event',
  },
  {
    category: 'textarea',
    value: '',
    label: '方法体',
    key: 'fnBody',
  }
]
let Select: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变行勾选', value: 'valueChange'},
      {label: '改变全勾选', value: 'toggleChange'},
      {label: '改变列宽', value: 'loadMore'},
    ],
    value: '',
    label: '事件',
    key: 'event',
  },
  {
    category: 'textarea',
    value: '',
    label: '方法体',
    key: 'fnBody',
  }
]
let Checkbox: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      // {label: '改变前', value: 'beforeChange'},
      {label: '改变后', value: 'change'},
    ],
    value: '',
    label: '事件',
    key: 'event',
  },
  {
    category: 'textarea',
    value: '',
    label: '方法体',
    key: 'fnBody',
  }
]
let Tabs: BehaviorConfigGroup = [{
    category: 'select',
    options: [
      {label: '切换', value: 'activeTabChange'},
      // {label: '添加', value: 'addTabChange'},
      {label: '删除', value: 'deleteTabChange'},
    ],
    value: '',
    label: '事件',
    key: 'event',
  },
  {
    category: 'textarea',
    value: '',
    label: '方法体',
    key: 'fnBody',
  }
]
let Pagination: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变页码', value: 'pageIndexChange'},
      // {label: '添加', value: 'addTabChange'},
      {label: '改变分页容量', value: 'pageSizeChange'},
    ],
    value: '',
    label: '事件',
    key: 'event',
  },
  {
    category: 'textarea',
    value: '',
    label: '方法体',
    key: 'fnBody',
  }
]


let Page: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '页面开始加载', value: 'pageLoading'},
      // {label: '添加', value: 'addTabChange'},
      {label: '页面加载完', value: 'pageLoaded'},
      {label: '渲染完成后', value: 'postRender'},
    ],
    value: '',
    label: '事件',
    key: 'event',
  },
  {
    category: 'textarea',
    value: '',
    label: '方法体',
    key: 'fnBody',
  }
]



export {
    Button,
    Modal,
    Form,
    Table,
    Select,
    // Icon, // 没有行为
    Checkbox,
    Tabs,
    Pagination,
    Page,
}
let all: {[k: S]: BehaviorConfigGroup} = {
    Button,
    Modal,
    Form,
    Table,
    Select,
    // Icon, // 没有行为
    Checkbox,
    Tabs,
    Pagination,
    Page,
}
export default all