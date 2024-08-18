import type {N, B, A, S, ULID, O, SelectOptionsItem, Options} from './base'

type PropsValue = S | B | N | S[] | SelectOptionsItem[]
interface ComponentMountEmpty {area: ''}
interface ComponentMountItems {area: 'items', itemIndex: N}
interface ComponentMountSlots {area: 'slots', slotKey: S}
interface GridLayout {
  x: N
  y: N
  w: N
  h: N
}

interface Component {
  ulid: S
  type: S
  nextUlid: ULID
  prevUlid: ULID
  parentUlid: ULID
  // mountPosition: S
  mount: ComponentMountEmpty | ComponentMountItems | ComponentMountSlots // 表示挂载到父组件的位置
  props: {
    // [k: S]: PropsValue
    [k: S]: A
  }
  behavior: {
    event: S
    target: S
    payload: S
  }[]
  items: { // 搭建侧的类型比此宽松
    // category: S
    // label: S
    // key: S
    // value: A
    // options?: Options<S, S>
    // childUlid?: S
    [k: S]: A
  }[]
  slots: {[k: S]: ULID}
  appUlid: ULID
  pageUlid: ULID
  gridLayout: GridLayout
}
interface Category {
  name: S
  type: S
  ulid: ULID
}
interface componentConfig {
  props: {
    [k: S]: PropsValue,
  },
  behavior: O
  item: O
  slot: S
}

export type {
  PropsValue,
  GridLayout,  
  Component,
  Category,
  componentConfig,
  ComponentMountEmpty,
  ComponentMountItems,
  ComponentMountSlots,
}