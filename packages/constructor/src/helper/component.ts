// 它与组件配套。日后可以放在组件目录中。
// component文件 定义数据。
// props文件     定义结构
// 这是所有组件的默认配置数据
import { Button as ButtonProps,
    Input as InputProps,
    Select as SelectProps,
    Modal as ModalProps,
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
import type { ComponentDefaultConfig, ComponentDefaultConfigAll, PropsMeta,
    BehaviorMetaItem,
 } from 'src/types/component'
// import type { S } from 'src/types/base'
import type { PropsConfigItem, BehaviorConfigItem } from 'src/types/config'

let opProps = (pci: PropsConfigItem) => {
    let o: PropsMeta = {}
    Object.entries(pci).forEach(([k, v]) => {
        o[k] = v.value
    })
    return o
}
let opBehavior = (p: BehaviorConfigItem) => {
    let arr: BehaviorMetaItem[] = []
    let o: BehaviorMetaItem = {} as BehaviorMetaItem
    // Object.entries(p).forEach((a) => {
    //     o[a[0] as keyof BehaviorConfigItem] = a[1].value
    // })
    p.forEach(item => {
        o[item.key] = item.value
    })
    arr.push(o)
    return arr
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
    items: [
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
    ],
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
    Input,
    Modal,
    Select,
    Form,
    Table,
    Icon,
    Checkbox,
    Tabs,
    Pagination,
}
