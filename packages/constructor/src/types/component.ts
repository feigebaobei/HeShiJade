import type {N, B, A, S, ULID, 
  ConfigItem, 
  // O, 
  // SelectOptionsItem, 
  // ConfigItemSelect,
  // ConfigItemTextarea,
  // ConfigItemInput,
  Options,
} from './base'
// 在不支持option前，暂时不使用SelectOptionsItem[]类型
type PropsValue = S | B | N 
| {label: S, value: S | B | N, disabled: B}[] // options
// | Date // Date类型也使用N.

// | S[] // | SelectOptionsItem[]
interface PropsMeta {
    // [k: S]: PropsValue
    [k: S]: A
}
interface GridLayout {
  x: N
  y: N
  w: N
  h: N
  noResize: B
}
type PartialGridLayout = Partial<GridLayout>
interface GridLayoutDefault {
  w: N
  h: N
  noResize: B
}
interface BehaviorMetaItem {
  // event: S
  // fnBody: S
  [k: S]: S
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
// todo 考虑删除这个类型
type ItemsMetaItem = {
  category: S
  label: S
  key: S
  value?: A
  checked?: B
  options?: Options<S, S>[]
}
interface SlotsMetaItem { // 待增强
  [k: S]: A
}
type BehaviorMeta = BehaviorMetaItem[]
type ItemsMeta = ItemsMetaItem[]
type SlotsMeta = {
  [k: S]: ULID
}
interface ComponentMountEmpty {area: ''}
interface ComponentMountItems {area: 'items', itemIndex: N}
interface ComponentMountSlots {area: 'slots', slotKey: S}
interface Component {
  ulid: ULID
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
  gridLayout: GridLayout
}
interface ComponentData {
  props: Component['props']
  slots: Component['slots']
  items: Component['items']
  ulid: Component['ulid']
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
// type BehaviorItemKey = 'event' | 'target' | 'payload' // keyof typeof BehaviorItem
type BehaviorItemKey = keyof BehaviorMetaItem

interface PropsTransfer {
  componentUlid: ULID
  key: S
  value: A
}
interface ChangeGridLayoutParams {
  ulid: ULID
  x: GridLayout['x']
  y: GridLayout['y']
  w: GridLayout['w']
  h: GridLayout['h']
}
type ComponentItemsValue = Component['items'][number]

export type {
  PropsValue,
  PropsMeta,
  GridLayout,
  PartialGridLayout,
  GridLayoutDefault,
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
  ChangeGridLayoutParams,
  ComponentItemsValue,
  ComponentData,
}