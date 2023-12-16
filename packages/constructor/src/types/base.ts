type S = string
type N = number
type A = any
type B = boolean
type ULID = S
type F = Function
type O = object
// type At = '@'
// type Email 
interface Ao {
    [k: S]: A
}

type Email = `${S}@${S}`
type ValueType = 'string' | 'number' | 'switch'
interface SelectOptionsItem {
    label: S
    value: A
    diabled?: B // 是否可用
    valueType?: ValueType // 值的类型，优先级高于ComponentPropsMetaItemRaw的valueType
}

export type {
    S, N, A, B, ULID, 
    Email,
    F, Ao, O,
    ValueType,
    SelectOptionsItem,
}
