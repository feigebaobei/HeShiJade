import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { reqToPromise } from 'src/helper/index'
// type
import type { O, S } from 'src/types/base';
import type { ResponseData } from 'src/types';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) {
    // this
  }
  req(
    url: S,
    method: 'get' | 'post' | 'put' | 'delete',
    dataParams: O,
  ) {
    let fn
    switch (method) {
      case 'get':
        fn = this.http[method]<ResponseData>(url, {
          params: {...dataParams}
        })
        break;
      case 'post':
        fn = this.http[method]<ResponseData>(url, {
          ...dataParams
        }, {
          withCredentials: true,
        })
        break;
      case 'put':
        fn = this.http[method]<ResponseData>(url, {
          ...dataParams
        }, {
          withCredentials: true
        })
        break;
      case 'delete':
        fn = this.http[method]<ResponseData>(url, {
          params: {...dataParams},
          withCredentials: true,
        })
        break;
    }
    return reqToPromise(fn)
  }
}
