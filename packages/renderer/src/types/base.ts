import type { MenuItemType } from "ng-devui/menu"

type S = string
type N = number
type A = any
type B = boolean
type ULID = S
type D = Date
type F = Function
type O = object
interface Oa {
    [k: S]: A
}
interface Os {
    [k: S]: S
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
interface MenuItem extends MenuItemType {
  icon: S
  isOpen: B
  isDisabled: B
  isRenderer: B
  parentKey: S
  children: MenuItem[]
}
export type {
    S, N, A, B, ULID, 
    F, Oa, Os, O, D,
    ValueType,
    SelectOptionsItem,
    ENV,
    Options,
    ReqMethod,
    MenuItem,
}
