import type { S, A, ULID } from "./base"

interface ComponentPropsMeta {
    [k: S]: ComponentPropsMetaItem
}
interface ComponentPropsMetaRaw {
    [k: S]: ComponentPropsMetaItemRaw
}
interface SelectOptionsItem {
    label: S
    value: A
}
interface ComponentPropsMetaItem extends ComponentPropsMetaItemRaw {
    propKey: S,
    componentUlid: ULID,
}
interface ComponentPropsMetaItemRaw {
    type: S, // 使用哪种表单元素。可以写成枚举值
    options?: SelectOptionsItem[], // select/switch的枚举值
    value: A, // 值
    label: S, // 文本
}
export {
    ComponentPropsMeta,
    SelectOptionsItem,
    ComponentPropsMetaItem,
    ComponentPropsMetaRaw,
    ComponentPropsMetaItemRaw,
}