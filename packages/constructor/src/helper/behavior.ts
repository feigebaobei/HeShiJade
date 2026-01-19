import type { BehaviorConfigGroup } from 'src/types/config'
import type { S } from 'src/types/base'
let clog = console.log


let Button: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '单击', value: 'click'},
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let Input: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '输入后', value: 'input'},
      {label: '改变后', value: 'change'},
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
      {label: '改变表单项的值', value: 'changeFormItemValue'},
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
    ],
    value: '',
    label: '事件',
    key: 'event',
    // allowClear: true,
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
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let Icon: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
      {label: '改变分页容量', value: 'pageSizeChange'},
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
      {label: '页面加载前', value: 'prePageLoad'},
      {label: '页面加载完', value: 'postPageLoad'},
      {label: '渲染视图后', value: 'postPageRender'},
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
let Flex: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let Grid: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let Layout: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let PageList: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '点击项目', value: 'itemClick'},
      {label: '改变展开状态', value: 'openChange'},
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let ShowHide: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      // {label: '显示', value: 'show'},
      // {label: '隐藏', value: 'hide'},
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let Loop: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let InputNumber: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '键盘输入时', value: 'whileValueChanging'},
      {label: 'model改变后', value: 'ngModelChange'},
      {label: '值改变后', value: 'afterValueChanged'},
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
let Radio: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      // {label: '键盘输入时', value: 'ngModelChange'},
      // {label: 'model改变后', value: 'ngModelChange'},
      {label: '值改变后', value: 'change'},
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
let Avatar: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let Card: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let Paragraph: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let Span: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let ImagePreview: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
let Accordion: BehaviorConfigGroup = [
  {
    category: 'select',
    options: [
      {label: '菜单展开时', value: 'menuToggle'},
      {label: '点击菜单项时', value: 'itemClick'},
      {label: '切换菜单项时', value: 'activeItemChange'},
      {label: '改变属性后', value: 'postComponentNgOnChanges'},
      {label: '初始化组件后', value: 'postComponentNgOnInit'},
      {label: '变更检测后', value: 'postComponentNgDoCheck'},
      {label: '渲染视图后', value: 'postComponentNgAfterViewInit'},
      {label: '销毁组件后', value: 'postComponentNgOnDestroy'},
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
    Input,
    Select,
    Form,
    Table,
    Icon,
    Checkbox,
    Tabs,
    Pagination,
    Page,
    Flex,
    Grid,
    Layout,
    PageList,
    ShowHide,
    Loop,
    InputNumber,
    Radio,
    Avatar,
    Card,
    Paragraph,
    Span,
    ImagePreview,
    Accordion,
}
let all: {[k: S]: BehaviorConfigGroup} = {
    Button,
    Modal,
    Input,
    Select,
    Form,
    Table,
    Icon,
    Checkbox,
    Tabs,
    Pagination,
    Page,
    Flex,
    Grid,
    Layout,
    PageList,
    ShowHide,
    Loop,
    InputNumber,
    Radio,
    Avatar,
    Card,
    Paragraph,
    Span,
    ImagePreview,
    Accordion,
}
export default all