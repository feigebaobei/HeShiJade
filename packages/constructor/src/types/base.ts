import type { MenuItemType } from 'ng-devui/menu'

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
}
interface ConfigItemSelect<T = N | S> {
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
}
interface ConfigItemSwitch {
  category: 'switch'
  options: SelectOptionsItem[]
  value: B
  // checked: B
  label: S
  key: S
  hide?: FT<B>
  hideListenerKey?: S
  hideCalc?: B
}
// interface ConfigItemOption {
interface ConfigItemOption {
  category: 'options'
  label: S
  key: S
  // value: ConfigItemOption['template'][]
  value: Pick<ConfigItemOption['template'], 'label' | 'value' | 'disabled'>[]
  // template: Options<S, S>
  // template: Partial<{
  //   label: S
  //   value: S | N | B
  //   valueType: 'string' | 'number' | 'boolean'
  //   disabled: B
  //   hideField: ('label' | 'value' | 'valueType' | 'disabled')[]
  //   // addButton: B, // 这是保留字段。2027.01.01+删除
  //   // miuns: B // 这是保留字段。2027.01.01+删除
  // }>
  template: {
    label: S
    value: S | N | B
    valueTip?: S
    valueType: 'string' | 'number' | 'boolean'
    disabled: B
    hideField: ('label' | 'value' | 'valueType' | 'disabled' | 'miuns')[]
    miuns?: B,
  }
  addButton?: B,
  hide?: FT<B>
  hideListenerKey?: S
  hideCalc?: B
}
interface ConfigItemDate {
  category: 'date'
  label: S
  // value?: Date
  value?: N
  key: S
  hide?: FT<B>
  hideListenerKey?: S
  hideCalc?: B
}
// type CategoryType = Pick<ConfigItem, 'category'>
type ConfigItem<T = N | S> = ConfigItemInput
  | ConfigItemTextarea
  | ConfigItemSelect<T>
  | ConfigItemNumber
  | ConfigItemSwitch
  | ConfigItemOption
  | ConfigItemDate
type ConfigItemsCategoryType = ConfigItem['category']

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
  ConfigItemOption,
  ConfigItemDate,
  ConfigItemKeys,
  ConfigItemsCategoryType,
  MenuItem,
}
