type S = string
type N = number
type A = any
type B = boolean
type ULID = S
type F = Function
type O = object
type D = Date
// type At = '@'
interface Oa {
    [k: S]: A
}
type FT<T = A> = (...p: A[]) => T
type Email = `${S}@${S}`
type ValueType = 'string' | 'number' | 'switch'
interface SelectOptionsItem {
    label: S
    value: A
    disabled?: B // 是否可用
    valueType?: ValueType // 值的类型，优先级高于ComponentPropsMetaItemRaw的valueType
}
interface Options<T, G> {
    label: T,
    value: G,
    disabled?: B
}
interface ConfigItemInput {
  category: 'input'
  value: S
  label: S
  key: S
  hide?: FT<B>
  hideListenerKey?: S
  hideCalc?: B
  // show: B
  hideConfig?: B
  placeholder?: S
}
type ConfigItemKeys = keyof ConfigItem
interface ConfigItemTextarea {
  category: 'textarea'
  value: S
  label: S
  key: S
  // hide?: B | FT<B>
  hide?: FT<B>
  hideListenerKey?: S
  hideCalc?: B
  // show: B
}
interface ConfigItemSelect<T> {
  category: 'select'
  value: T
  options: SelectOptionsItem[] // 当前配置项的可选项
  label: S
  key: S
  extend?: {
    select?: {
      options: SelectOptionsItem
    }
    switch?: {
      options: SelectOptionsItem
    }
  }
  hide?: FT<B>
  hideListenerKey?: S
  hideCalc?: B
  allowClear?: B
  // show: B
}
interface ConfigItemNumber {
  category: 'number'
  value: N
  label: S
  key: S
  maxLength?: N
  minLength?: N
  hide?: FT<B>
  hideListenerKey?: S
  hideCalc?: B
  // show: B
}
interface ConfigItemSwitch {
  category: 'switch'
  options: SelectOptionsItem[]
  // value: B
  checked: B
  label: S
  key: S
  hide?: FT<B>
  hideListenerKey?: S
  hideCalc?: B
  // show: B
}
interface ConfigItmeOption {
  category: 'options'
  label: S
  key: S
  value: []
  template: Options<S, S>
  hide?: FT<B>
  hideListenerKey?: S
  hideCalc?: B
  // show: B
}
// type CategoryType = Pick<ConfigItem, 'category'>
type ConfigItem<T = S> = ConfigItemInput
  | ConfigItemTextarea
  | ConfigItemSelect<T>
  | ConfigItemNumber
  | ConfigItemSwitch
  | ConfigItmeOption
type ConfigItemsCategoryType = ConfigItem['category']
export type {
  S, N, A, B, ULID, 
  Email,
  F, Oa, O, D,
  FT,
  ValueType,
  SelectOptionsItem,
  Options,
  ConfigItem,
  ConfigItemInput,
  ConfigItemNumber,
  ConfigItemTextarea,
  ConfigItemSelect,
  ConfigItemSwitch,
  ConfigItmeOption,
  ConfigItemKeys,
  ConfigItemsCategoryType,
}
