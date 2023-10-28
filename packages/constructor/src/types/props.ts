import type { S, A, ULID, B, N, SelectOptionsItem } from "./base"

// type ValueType = 'string' | 'number' | 'switch'
interface ComponentPropsMeta {
    [k: S]: ComponentPropsMetaItem
}
interface ComponentPropsMetaRaw {
    [k: S]: ComponentPropsMetaItemRaw
}
// interface SelectOptionsItem {
//     label: S
//     value: A
//     diabled?: B // 是否可用
//     valueType?: ValueType // 值的类型，优先级高于ComponentPropsMetaItemRaw的valueType
// }
interface ComponentPropsMetaItem extends ComponentPropsMetaItemRaw {
    propKey: S,
    componentUlid: ULID,
}
interface ComponentPropsMetaItemRaw {
    type: S, // 使用哪种表单元素。可以写成枚举值
    options?: SelectOptionsItem[], // select/switch的枚举值

    value?: A , // 值
    valueType?: S , // 值的类型
    label: S, // 文本
    addable?: B, // 是否可以增加
    reducible?: B, // 是否可以减少
    maxLength?: N, // 最大长度
    minLength?: N, // 最小长度
}
export {
    ComponentPropsMeta,
    SelectOptionsItem,
    ComponentPropsMetaItem,
    ComponentPropsMetaRaw,
    ComponentPropsMetaItemRaw,
}