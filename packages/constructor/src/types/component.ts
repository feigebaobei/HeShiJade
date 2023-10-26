import type {N, B, A, S, ULID, O} from './base'

type PropsValue = S | B | N | S[]
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
interface componentDefaultMeta {
  // props: O
  props: {
    // options?: S[]s
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
  componentDefaultMeta,
}