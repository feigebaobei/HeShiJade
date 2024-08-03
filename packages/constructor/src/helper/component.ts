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
 } from 'src/helper/props'
import {
    Button as ButtonBehavior,
    Modal as ModalBehavior,
    Form as FormBehavior,
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
    Object.entries(p).forEach((a) => {
        o[a[0] as keyof BehaviorConfigItem] = a[1].value
    })
    arr.push(o)
    return arr
}


let Button: ComponentDefaultConfig = {
    // props: {
    //     type: 'button',
    //     bsSize: 'md',
    //     bordered: true,
    //     disabled: false,
    //     width: '100px',
    //     text: 'button',
    // },
    props: opProps(ButtonProps),
    // behavior: [
    //     {
    //         event: 'click',
    //         target: 'ulid',
    //         payload: '{"visible": true}',
    //     },
    // ],
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
    // props: {
    //     error: false,
    //     size: '',
    //     showGrowStyle: true,
    //     styleType: 'default',
    // },
    props: opProps(InputProps),
    behavior: [],
    items: [],
    slots: {},
}
let Modal: ComponentDefaultConfig = {
    props: opProps(ModalProps),
    // behavior: [
    //     {event: '', target: '', payload: ''},
    // ],
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
    // behavior: [
    //     {
    //         event: 'submit',
    //         target: '',
    //         payload: '',
    //     },
    // ],
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
    behavior: [],
    items: [
    ],
    slots: {},
}

export let componentDefaultConfigAll: ComponentDefaultConfigAll = {
    Button,
    Input,
    Modal,
    Select,
    Form,
    Table,
}
