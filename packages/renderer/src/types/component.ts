import type {N, B, A, S, ULID, O, SelectOptionsItem} from './base'

type PropsValue = S | B | N | S[] | SelectOptionsItem[]
interface Component {
  ulid: S
  // name: S
  // key: S
  type: S
  next: ULID
  prev: ULID
  props: {
    [k: S]: PropsValue
  }
  behavior: O
  item: O
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
  item: O
  slot: S
}

export type {
  PropsValue,
  Component,
  Category,
  componentConfig,
}