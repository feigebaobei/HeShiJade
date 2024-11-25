import type {N, B, A, S, ULID} from './base'

interface App {
  key: S
  name: S
  ulid: ULID
  theme: S
  // members: S[]
  version: N
  layout: N
  owner: S
  collaborator: S[]
  // child: S
  firstPageUlid: ULID
  prevUlid: ULID
  nextUlid: ULID
  pluginsKey: S[]
  // 无子应用
}

interface VersionInfo {
  version: N
  remarks: S
}

type EnvKey = 'dev' | 'test' | 'pre' | 'prod'

interface SyntheticVersion {
  dev: VersionInfo
  test: VersionInfo
  pre: VersionInfo
  prod: VersionInfo
}
// interface SyntheticVersion {
//   dev?: {
//     version: N
//     remarks: S
//   }
//   test?: {
//     version: N
//     remarks: S
//   }
//   pre?: {
//     version: N
//     remarks: S
//   }
//   prod?: {
//     version: N
//     remarks: S
//   }
// }

export type {
    App,
    SyntheticVersion,
}