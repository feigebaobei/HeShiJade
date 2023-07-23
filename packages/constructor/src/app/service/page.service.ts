import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import type { ResponseData } from 'src/types';
import type { Page } from 'src/types/page';
import { AppService } from './app.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  pageList: Observable<Page[]>
  constructor(
    private http: HttpClient,
    private appService: AppService,
  ) {
    this.pageList = of([])
  }
  getPageList() {
    return new Promise<Page[]>((s, j) => {
      this.http.get<ResponseData>(`http://localhost:5000/page?appUlid=${this.appService.curApp?.ulid}`, {
        withCredentials: true
      }).subscribe(res => {
        if (res.code === 0) {
          this.pageList = res.data
          s(res.data)
        } else {
          j(new Error(res.message))
        }
      })
    })
  }
}
