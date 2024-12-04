// 它与组件配套。日后可以放在组件目录中。
// component文件 定义数据。
// props文件     定义结构
// 这是所有组件的默认配置数据
import { Button as ButtonProps,
    Modal as ModalProps,
    Input as InputProps,
    Select as SelectProps,
    Form as FormProps,
    Table as TableProps,
    Icon as IconProps,
    Checkbox as CheckboxProps,
    Tabs as TabsProps,
    Pagination as PaginationProps,
 } from 'src/helper/props'
import {
    Button as ButtonBehavior,
    Modal as ModalBehavior,
    Form as FormBehavior,
    Table as TableBehavior,
    Checkbox as CheckboxBehavior,
    Tabs as TabsBehavior,
    Pagination as PaginationBehavior,
} from 'src/helper/behavior'
import ItemAll from 'src/helper/items'

import type { ComponentDefaultConfig, ComponentDefaultConfigAll, PropsMeta,
    BehaviorMetaItem,
    ConfigItem,
    Component,
    ComponentItemsValue,
 } from 'src/types/component'
import type { PropsConfigItem, BehaviorConfigGroup } from 'src/types/config'

// let {
//     Form: FromItems
// } = ItemAll
let FormItems = ItemAll['Form']
let opProps = (pci: PropsConfigItem) => {
    let o: PropsMeta = {}
    Object.entries(pci).forEach(([k, v]) => {
        if ('value' in v) {
            o[k] = v.value
        }
        if ('checked' in v) {
            o[k] = v.checked
        }
    })
    return o
}
let opBehavior = (p: BehaviorConfigGroup) => {
    let arr: BehaviorMetaItem[] = []
    let o: BehaviorMetaItem = {} as BehaviorMetaItem
    // Object.entries(p).forEach((a) => {
    //     o[a[0] as keyof BehaviorConfigGroup] = a[1].value
    // })
    p.forEach(item => {
        o[item.key] = item.value
    })
    arr.push(o)
    return arr
}
let opItemsEle = (p: ConfigItem[]): ComponentItemsValue => {
    let o: ComponentItemsValue = {}
    p.forEach(item => {
        if ('value' in item) {
            o[item.key] = item.value
        }
        if ('checked' in item) {
            o[item.key] = item.checked
        }
    })
    return o
}
// 从配置文件中取出全量的组件的配置项。再与赋值。就可以当做组件的默认配置使用了。
let opItemsOfForm = () => {
    let defaultValueArr = [
        {
            category: 'input',
            key: 'name',
            label: '姓名',
            value: '张三',
        },
        {
            category: 'select',
            options: [
                {label: 'one', value: 'one'},
                {label: 'two', value: 'two'},
                {label: 'three', value: 'three'},
            ],
            key: 'org',
            label: '组织',
            value: 'one',
        },
    ]
    let templateArr = [opItemsEle(FormItems), opItemsEle(FormItems),]
    return defaultValueArr.map((item, index) => {
        Object.entries(item).forEach(([k, v]) => {
            templateArr[index][k] = v
        })
        return templateArr[index]
    })
}


let Button: ComponentDefaultConfig = {
    props: opProps(ButtonProps),
    behavior: opBehavior(ButtonBehavior),
    items: [
        {
            category: 'input',
            label: '文本',
            value: 'button star',
            key: '',
        }
    ],
    slots: {}, // 子组件
}
let Input: ComponentDefaultConfig = {
    props: opProps(InputProps),
    behavior: [],
    items: [],
    slots: {},
}
let Modal: ComponentDefaultConfig = {
    props: opProps(ModalProps),
    behavior: opBehavior(ModalBehavior),
    items: [],
    slots: {
        // header: '', // value是ulid
        // body: '',   // value是ulid
        // footer: '', // value是ulid
    },
}
let Select: ComponentDefaultConfig = {
    props: opProps(SelectProps),
    behavior: [],
    items: [],
    slots: {},
}
let Form: ComponentDefaultConfig = {
    props: opProps(FormProps),
    behavior: opBehavior(FormBehavior),
    items: opItemsOfForm(), // [opItemsEle(FormItems), opItemsEle(FormItems),],
    // items的字段不全 todo
    // items: [
    //     {
    //         category: 'input',
    //         key: 'name',
    //         label: '姓名',
    //         value: '张三',
    //     },
    //     {
    //         category: 'select',
    //         options: [
    //             {label: 'one', value: 'one'},
    //             {label: 'two', value: 'two'},
    //             {label: 'three', value: 'three'},
    //         ],
    //         key: 'org',
    //         label: '组织',
    //         value: 'one',
    //     },
    // ],
    slots: {},
}
let Table: ComponentDefaultConfig = {
    props: opProps(TableProps),
    behavior: opBehavior(TableBehavior),
    items: [],
    slots: {},
}
let Icon: ComponentDefaultConfig = {
    props: opProps(IconProps),
    behavior: [],
    items: [],
    slots: {},
}
let Checkbox: ComponentDefaultConfig = {
    props: opProps(CheckboxProps),
    behavior: opBehavior(CheckboxBehavior),
    items: [],
    slots: {},
}
let Tabs: ComponentDefaultConfig = {
    props: opProps(TabsProps),
    behavior: opBehavior(TabsBehavior),
    items: [
        // {
        //     id: 'id',
        //     title: 'title',
        //     disabled: false,
        // },
    ],
    slots: {},
}
let Pagination: ComponentDefaultConfig = {
    props: opProps(PaginationProps),
    behavior: opBehavior(PaginationBehavior),
    items: [],
    slots: {},
}

export let componentDefaultConfigAll: ComponentDefaultConfigAll = {
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
}
