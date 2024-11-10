import type {N, B, A, S, ULID} from './base'
import type { BehaviorMeta } from './component'
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
  // props
  behavior: BehaviorMeta
  // items
}

export type {
    Page,
}