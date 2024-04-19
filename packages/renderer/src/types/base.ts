type S = string
type N = number
type A = any
type B = boolean
type ULID = S
type D = Date
type F = Function
type O = object
interface Ao {
    [k: S]: A
}
type ValueType = 'string' | 'number' | 'switch'
interface SelectOptionsItem {
    label: S
    value: A
    diabled?: B // 是否可用
    valueType?: ValueType // 值的类型，优先级高于ComponentPropsMetaItemRaw的valueType
}
type ENV = 'dev' | 'test' | 'pre' | 'prod'
interface Options<T, G> {
    label: T,
    value: G,
}
type ReqMethod = "get" | "post" | "put" | "delete"
export type {
    S, N, A, B, ULID, 
    F, Ao, O, D,
    ValueType,
    SelectOptionsItem,
    ENV,
    Options,
    ReqMethod,
}
