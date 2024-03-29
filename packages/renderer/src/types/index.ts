import type {N, B, A, S, ULID} from './base'

interface ResponseData {
  code: N
  data: A
  message: S
}

// interface Page {
//   name: S
//   key: S
//   ulid: S
// }

interface User {
  account: S
  applications: S[]
}


export type {
    ResponseData,
    // Page
    ULID,
    User,
}