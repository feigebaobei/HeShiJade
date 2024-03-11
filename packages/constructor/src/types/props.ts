import type { S, A, ULID, B, N, SelectOptionsItem } from "./base"

// type ValueType = 'string' | 'number' | 'switch'
// interface ComponentPropsMeta {
//     [k: S]: ComponentPropsMetaItem
// }

// interface ComponentPropsMetaRaw {
//     [k: S]: ComponentPropsMetaItemRaw
// }
// interface SelectOptionsItem {
//     label: S
//     value: A
//     diabled?: B // 是否可用
//     valueType?: ValueType // 值的类型，优先级高于ComponentPropsMetaItemRaw的valueType
// }
// interface ComponentPropsMetaItem extends ComponentPropsMetaItemRaw {
//     propKey: S,
//     componentUlid: ULID,
// }
// interface ComponentPropsMetaItemRaw {
//     type: S, // 使用哪种表单元素。可以写成枚举值
//     options?: SelectOptionsItem[], // select/switch的枚举值

//     value?: A , // 值
//     valueType?: S , // 值的类型
//     label: S, // 文本
//     addable?: B, // 是否可以增加
//     reducible?: B, // 是否可以减少
//     maxLength?: N, // 最大长度
//     minLength?: N, // 最小长度

//     overFields: S[] // 指定需要使用配置数据覆盖
//     [k: S]: A
// }

// type PropsValue = S | B | N | S[] | SelectOptionsItem[]
// interface PropsMeta {
//     [k: S]: PropsValue
// }

// interface PropsConfigInput {
//     category: 'input'
//     value: S
//     label: S
//     key: S
// }
// interface PropsConfigSelect {
//     category: 'select'
//     value: S | N
//     options: SelectOptionsItem // 未来可能会变
//     label: S
//     key: S
// }
// interface PropsConfigNumber {
//     category: 'number'
//     value: N
//     label: S
//     key: S
//     maxLength: N
//     minLength: N
// }
// interface PropsConfigSwitch {
//     category: 'Switch'
//     value: B
//     label: S
//     key: S
// }
// type PropsConfig = PropsConfigInput | PropsConfigSelect | PropsConfigNumber | PropsConfigSwitch
export {
    // ComponentPropsMeta,
    // ComponentPropsMetaItem,
    // ComponentPropsMetaRaw,
    // ComponentPropsMetaItemRaw,
    // PropsMeta,
    SelectOptionsItem,
    // PropsConfig,
}