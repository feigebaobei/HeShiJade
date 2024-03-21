||完成日期||
|-|-|-|
|处理items的数据类型|||
|整理component为模块|||
|解决创建页面成功但是提示错误的问题|||
|解决新创建页面新创建的组件无法正常显示的问题|||
|解决删除组件控制前后组件错误的问题|||
|设置当前的app/page/component|||
|整理list（DialogComponent, AppConfigDialogComponent, PublishDialogComponent）为module|||
|添加新组件时，及时在舞台上显示。|||
|// todo 改名为 setItemOfCurComponen|||
||||

props 一对kv就能搞定的
item 子元素
slot 子组件
meta 保存在数据库中，渲染组件时使用
config 配置面板中使用

form组件的item
[
    {
        category: 'input',
        label: '姓名',
        value: 'san',
        key: 'name'
    },
    {
        category: 'number',
        label: '年龄',
        value: 18,
        key: 'age'
    },
]

table组件的item
[
    {
        field: 'age',
        header: '年龄',
        width: '150px',
    },
]

form组件的配置面板
[
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
        value: 'age',      // 在配置面板中设置的值
    },
    {
        label: 'label',
        category: 'input',
        key: 'label',
        value: '姓名',
    },
    {
        label: 'value',
        category: 'input',
        key: 'value',
        value: 'san',
    },
]

table组件的配置面板
[
    {
        label: 'field',
        category: 'input',
        key: 'field',
        value: 'age',
    },
    {
        label: 'header',
        category: 'input',
        key: 'header',
        value: 'city',
    },
    {
        label: 'width',
        category: 'input',
        key: 'width',
        value: '150px',
    },
]

form的配置面板的模板
[
    {
        label: '种类',
        category: 'select',
        options: [
            {label: 'input', value: 'input'},
            {label: 'select', value: 'select'},
            {label: 'switch', value: 'switch'},
        ],
        key: 'category',
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
        key: 'label',
        value: '',
    },
    {
        label: 'value',
        category: 'input',
        key: 'value',
        value: '',
    },
]

table的配置面板的模板
[
    {
        label: 'field',
        category: 'input',
        key: 'field',
        value: '',
    },
    {
        label: 'header',
        category: 'input',
        key: 'header',
        value: '',
    },
    {
        label: 'width',
        category: 'input',
        key: 'width',
        value: '',
    },
]