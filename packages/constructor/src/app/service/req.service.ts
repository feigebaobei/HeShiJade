import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Method } from 'src/helper/axios';
import { serviceUrl } from 'src/helper/config';
import { ResponseData } from 'src/types';
import { Oa, O, S } from 'src/types/base';

@Injectable({
  providedIn: 'root'
})
export class ReqService {

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }
  req(url: S, method: Method, params: Oa, options: Oa = {withCredentials: true}): Promise<ResponseData> {
    return new Promise((s, j) => {
      // this.http[method]()
      let h
      switch (method) {
        case 'get':
          h = this.http.get<ResponseData>(url, {
            params,
            withCredentials: options['withCredentials'],
          })
          break;
        case 'post':
          h = this.http.post<ResponseData>(url, params, {
            withCredentials: options['withCredentials'],
          })
          break;
        case 'put':
          h = this.http.put<ResponseData>(url, params, {
            withCredentials: options['withCredentials'],
          })
          break;
        case 'delete':
          h = this.http.delete<ResponseData>(url, {
            params,
            withCredentials: options['withCredentials'],
          })
          break
        case 'option':
          h = this.http.options<ResponseData>(url, {
            params,
            withCredentials: options['withCredentials'],
          })
          break;
      }
      h.subscribe((res) => {
        switch (res.code) {
          case 0:
            s(res)
            break;
          case 100000:
            s(res)
            break;
          case 100130:
            this.router.navigate(['/home']);
            j(res)
            break;
          default:
            j(res)
            break;
        }
      })
    })
  }
}
