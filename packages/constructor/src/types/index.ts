import type {N, B, A, S, ULID, Email, } from './base'

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
  // account: S
  // applications: S[]
  ulid: ULID,
  profile: {
    email: Email,
  },
  accessToken: S
  refreshToken: S
  firstApplicationUlid: S
  // lastApplicationUlid: S
}


export type {
    ResponseData,
    // Page
    ULID,
    User,
}