import type {N, B, A, S, ULID} from './base'

interface App {
  key: S
  name: S
  ulid: ULID
  members: S[]
  // child: S
  firstPageUlid: ULID
  prevUlid: ULID
  nextUlid: ULID
  pluginsKey: S[]
  // 无子应用
}

export type {
    App,
}