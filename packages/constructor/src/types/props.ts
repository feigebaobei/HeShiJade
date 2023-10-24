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
    type: S, // 可以写成枚举值
    options?: SelectOptionsItem[],
    value: A,
    label: S,
}
export {
    ComponentPropsMeta,
    SelectOptionsItem,
    ComponentPropsMetaItem,
    ComponentPropsMetaRaw,
    ComponentPropsMetaItemRaw,
}