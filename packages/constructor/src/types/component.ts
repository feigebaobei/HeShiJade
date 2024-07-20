import type {N, B, A, S, ULID, 
  ConfigItem, 
  // O, SelectOptionsItem, 
  // ConfigItemSelect,
  // ConfigItemTextarea,
  // ConfigItemInput,
  Options,
} from './base'
// 在不支持option前，暂时不使用SelectOptionsItem[]类型
type PropsValue = S | B | N // | S[] | SelectOptionsItem[]
interface PropsMeta {
    // [k: S]: PropsValue
    [k: S]: A
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
type ItemsMetaItem = { // 这是为form开发的。
  category: S
  label: S
  key: S
  value: A
  options?: Options<S, S>[]
  child?: ULID // 这是为table而增强的。
}
interface SlotsMetaItem { // 待增强
  [k: S]: A
}
type BehaviorMeta = BehaviorMetaItem[]
type ItemsMeta = ItemsMetaItem[]
type SlotsMeta = {
  // [k: S]: Component | {}
  [k: S]: ULID
}// | {}
interface ComponentMountEmpty {area: ''}
interface ComponentMountItems {area: 'items', itemIndex: N}
interface ComponentMountSlots {area: 'slots', slotKey: S}
interface Component {
  ulid: S
  type: S
  nextUlid: ULID
  prevUlid: ULID
  parentUlid: ULID
  mount: ComponentMountEmpty | ComponentMountItems | ComponentMountSlots // 表示挂载到父组件的位置
  props: PropsMeta
  behavior: BehaviorMeta
  // items: ItemsMeta
  items: {
    [k: S]: A
  }[]
  slots: SlotsMeta
  appUlid: ULID
  pageUlid: ULID
}

interface Category {
  name: S
  componentCategory: S
  ulid: ULID
}
type ComponentDefaultConfig = Pick<Component, 'props' | 'behavior' | 'items' | 'slots'>
interface ComponentDefaultConfigAll {
  [k: S]: ComponentDefaultConfig
}
type BehaviorItemKey = 'event' | 'target' | 'payload' // keyof typeof BehaviorItem

interface PropsTransfer {
  componentUlid: ULID
  key: S
  value: A
}

export type {
  PropsValue,
  PropsMeta,
  BehaviorMeta,
  BehaviorMetaItem,
  BehaviorItemKey,
  ItemsMeta,
  SlotsMeta,
  Component,
  Category,
  ConfigItem,
  ComponentDefaultConfig,
  ComponentDefaultConfigAll,
  ItemsMetaItem,
  ComponentMountEmpty,
  ComponentMountItems,
  ComponentMountSlots,
  PropsTransfer,
}