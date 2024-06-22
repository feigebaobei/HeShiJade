import type {N, B, A, S, ULID} from './base'

interface Page {
  key: S
  name: S
  ulid: S
  prevUlid: ULID
  nextUlid: ULID
  childUlid?: ULID
  firstComponentUlid: ULID
  // lastComponentUlid: ULID
  appUlid: ULID
}

export type {
    Page,
}