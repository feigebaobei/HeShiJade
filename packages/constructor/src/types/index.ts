import type {N, B, A, S} from './base'

interface ResponseData {
  code: N
  data: A
  message: S
}

interface Page {
  name: S
  key: S
  ulid: S
}



export type {
    ResponseData,
    Page,
}