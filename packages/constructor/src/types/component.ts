import type {N, B, A, S, ULID, O} from './base'

interface Component {
  ulid: S
  // name: S
  // key: S
  type: S
  next: ULID
  prev: ULID
  props: O
  behaivor: O
  item: O
  slot: S
  appUlid: ULID
  pageUlid: ULID
}

export type {
  Component,
}