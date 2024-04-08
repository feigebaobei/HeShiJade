import type {N, B, A, S, ULID, O, SelectOptionsItem, Options} from './base'

type PropsValue = S | B | N | S[] | SelectOptionsItem[]
interface Component {
  ulid: S
  type: S
  nextUlid: ULID
  prevUlid: ULID
  parentUlid: ULID
  mountPosition: S
  props: {
    [k: S]: PropsValue
  }
  behavior: {
    event: S
    target: S
    payload: S
  }[]
  items: {
    category: S
    label: S
    key: S
    value: A
    options?: Options<S, S>
  }[]
  slots: S
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