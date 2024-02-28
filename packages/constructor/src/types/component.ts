import type {N, B, A, S, ULID, O, SelectOptionsItem} from './base'
import type { ComponentItem } from './items'

type PropsValue = S | B | N | S[] | SelectOptionsItem[]
interface Component {
  ulid: S
  // name: S
  // key: S
  type: S
  // next: ULID
  nextUlid: ULID
  // prev: ULID
  prevUlid: ULID
  props: {
    [k: S]: PropsValue
  }
  behavior: O
  item: {
    addable: B
    groups: ComponentItem[]
  }
  slot: S
  appUlid: ULID
  pageUlid: ULID
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
  item: {
    addable: B,
    groups: ComponentItem[]
  }
  slot: S
}

export type {
  PropsValue,
  Component,
  Category,
  componentConfig,
}