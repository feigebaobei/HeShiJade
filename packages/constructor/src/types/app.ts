import type {N, B, A, S, ULID} from './base'

interface App {
  key: S
  name: S
  ulid: ULID
  theme: S
  // members: S[]
  version: N
  owner: S
  collaborator: S[]
  // child: S
  firstPageUlid: ULID
  prevUlid: ULID
  nextUlid: ULID
  // 无子应用
}

export type {
    App,
}