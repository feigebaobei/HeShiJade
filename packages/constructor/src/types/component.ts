import type {N, B, A, S, ULID, O, SelectOptionsItem, ConfigItem, 
  ConfigItemSelect,
  ConfigItemTextarea,
  ConfigItemInput,
  Options,
} from './base'
// import type { ComponentItem,
//   ItemsMeta,
  // ItemsConfig, } from './items'
// import type { PropsMeta, PropsConfig } from './props'
// import type { BehaviorMeta, BehaviorConfigItem } from './behavior'
// import type { SlotsMeta } from './slots'

// 在不支持option前，暂时不使用SelectOptionsItem[]类型
type PropsValue = S | B | N // | S[] | SelectOptionsItem[]
interface PropsMeta {
    [k: S]: PropsValue
}

interface BehaviorMetaItem {
  event: S
  target: S
  payload: S
}
// button组件中需要指明文本
interface ItemsMetaItemString {
  [k: S]: S
}
// form组件中需要指明表单项的类型
interface ItemsMetaItemCategory {
  category: S
  key: S
  label: S
  value: S
}
// type ItemsMetaItem = ItemsMetaItemString | ItemsMetaItemCategory
// type ItemsMetaItem = ItemsMetaItemCategory
type ItemsMetaItem = {
  // [k: S]: PropsValue
  // [k: S]: A // 先宽松一点吧
  category: S
  label: S
  key: S
  value: A
  options?: Options<S, S>[]
}
interface SlotsMetaItem { // 待增强
  [k: S]: A
}
type BehaviorMeta = BehaviorMetaItem[]
// type ItemsMeta = ItemsMetaItem[]
// type ItemsMeta = ConfigItem[] // 为了兼容像button/form这类组件的item
// interface ItemsMeta {
//   [k: S]: A
// }
type ItemsMeta = ItemsMetaItem[]
// type ItemsMeta = {
//   [k: S]: PropsValue
// }
// type SlotsMeta = SlotsMetaItem[]
type SlotsMeta = {
  // [k: S]: Component | {}
  [k: S]: ULID
}// | {}

interface Component {
  ulid: S
  type: S
  nextUlid: ULID
  prevUlid: ULID
  props: PropsMeta
  behavior: BehaviorMeta
  items: ItemsMeta
  slots: SlotsMeta
  appUlid: ULID
  pageUlid: ULID
}
// interface ComponentConfigTemplate {
//   props: {}
//   behavior: {}
//   items: {}
//   slots: {}
// }
interface Category {
  name: S
  // type: S
  // type => componentCategory
  componentCategory: S
  ulid: ULID
}
type ComponentDefaultConfig = Pick<Component, 'props' | 'behavior' | 'items' | 'slots'>
interface ComponentDefaultConfigAll {
  [k: S]: ComponentDefaultConfig
}
type BehaviorItemKey = 'event' | 'target' | 'payload' // keyof typeof BehaviorItem
// type BehaviorItemKey = keyof typeof BehaviorMetaItem
// interface BehaviorConfigItem {
//   // event: ConfigItem
//   // target: ConfigItem
//   // payload: ConfigItem
//   event: ConfigItemSelect
//   target: ConfigItemInput
//   payload: ConfigItemTextarea
// }

export type {
  PropsValue,
  PropsMeta,
  BehaviorMeta,
  BehaviorMetaItem,
  BehaviorItemKey,
  // BehaviorConfigItem,
  ItemsMeta,
  SlotsMeta,
  Component,
  Category,
  // ComponentConfigMeta,
  // ComponentConfig,
  ConfigItem,
  ComponentDefaultConfig,
  ComponentDefaultConfigAll,
  ItemsMetaItem,
}