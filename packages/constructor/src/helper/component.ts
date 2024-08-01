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
import type { ComponentDefaultConfig, ComponentDefaultConfigAll, PropsMeta, } from 'src/types/component'
// import type { S } from 'src/types/base'
import type { PropsConfigItem } from 'src/types/config'

let opProps = (pci: PropsConfigItem) => {
    let o: PropsMeta = {}
    Object.entries(pci).forEach(([k, v]) => {
        o[k] = v.value
    })
    return o
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
    behavior: [
        {
            event: 'click',
            target: 'ulid',
            payload: '{"visible": true}',
        },
    ],
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
    // props: {
    //     title: '标题',
    //     visible: false,
    //     width: '',
    //     placement: 'center',
    // },
    props: opProps(ModalProps),
    behavior: [
        {event: '', target: '', payload: ''},
    ],
    items: [],
    slots: {
        // header: '', // value是ulid
        // body: '',   // value是ulid
        // footer: '', // value是ulid
    },
}
let Select: ComponentDefaultConfig = {
    // props: {
    //     // options: [
    //     //     {label: 'one', value: 'one',},
    //     //     {label: 'two', value: 'two',},
    //     //     {label: 'three', value: 'three',},
    //     // ],
    //     isSearch: false,
    //     size: '',
    //     placeholder: '',
    // },
    props: opProps(SelectProps),
    behavior: [],
    items: [],
    slots: {},
}
let Form: ComponentDefaultConfig = {
    // props: {
    //     layout: 'horizontal',
    //     isCancel: true,
    //     isSubmit: true,
    // },
    props: opProps(FormProps),
    behavior: [
        {
            event: 'submit',
            target: '',
            payload: '',
        },
    ],
    items: [
        {
            category: 'input',
            key: 'name',
            label: '姓名',
            value: '张三',
        },
        {
            category: 'input',
            // options: [],
            key: 'name',
            label: '姓名',
            value: '张三',
        },
        {
            category: 'input',
            key: 'name',
            label: '姓名',
            value: '张三',
        },
    ],
    slots: {},
}
let Table: ComponentDefaultConfig = {
    // props: {
    //     size: 'sm',
    // },
    props: opProps(TableProps),
    behavior: [],
    items: [
    ],
    slots: {},
}

// export {
//     Button,
//     Input,
//     Modal,
//     Select,
//     Form,
//     Table,
// }
export let componentDefaultConfigAll: ComponentDefaultConfigAll = {
    Button,
    Input,
    Modal,
    Select,
    Form,
    Table,
}
// export {all}
// export default all