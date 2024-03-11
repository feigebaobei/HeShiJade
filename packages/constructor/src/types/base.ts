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
// todo 完善类型
interface SelectOptionsItem {
    label: S
    value: A
    diabled?: B // 是否可用
    valueType?: ValueType // 值的类型，优先级高于ComponentPropsMetaItemRaw的valueType
}
interface Options<T, G> {
    label: T,
    value: G,
}
interface ConfigItemInput {
  category: 'input'
  value: S
  label: S
  key: S
}
type ConfigItemKeys = keyof ConfigItem
interface ConfigItemTextarea {
  category: 'textarea'
  value: S
  label: S
  key: S
}
interface ConfigItemSelect<T> {
  category: 'select'
  // value: S | N
  value: T
  options: SelectOptionsItem[]
  label: S
  key: S
}
interface ConfigItemNumber {
  category: 'number'
  value: N
  label: S
  key: S
  maxLength: N
  minLength: N
}
interface ConfigItemSwitch {
  category: 'switch'
  options: SelectOptionsItem[]
  value: B
  label: S
  key: S
}
type CategoryType = Pick<ConfigItem, 'category'>
type ConfigItem<T = S> = ConfigItemInput
  | ConfigItemTextarea
  | ConfigItemSelect<T>
  | ConfigItemNumber
  | ConfigItemSwitch
export type {
  S, N, A, B, ULID, 
  Email,
  F, Ao, O,
  ValueType,
  SelectOptionsItem,
  Options,
  ConfigItem,
  ConfigItemInput,
  ConfigItemNumber,
ConfigItemTextarea,
ConfigItemSelect,
ConfigItemSwitch,
  ConfigItemKeys,
  CategoryType,
}
