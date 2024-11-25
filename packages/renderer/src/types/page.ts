import type {N, B, A, S, ULID, Os,} from './base'

interface Page {
  key: S
  name: S
  ulid: S
  prevUlid?: ULID
  nextUlid?: ULID
  childUlid?: ULID
  firstComponentUlid?: ULID
  appUlid: ULID
  behavior: {
    event: S
    fnBody: S
  }[]
}

export type {
    Page,
}