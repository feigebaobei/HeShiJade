"use strict";(self.webpackChunkrenderer=self.webpackChunkrenderer||[]).push([[87],{7087:(O,l,i)=>{i.r(l),i.d(l,{LayoutComponent:()=>M});var h=i(5567),a=i(6388),d=i(652),t=i(7390),f=i(6501),g=i(5706);function v(s,m){if(1&s){const e=t.RV6();t.j41(0,"div",1),t.bIt("click",function(){const o=t.eBV(e).$implicit,r=t.XpG();return t.Njj(r.pageItemClickH(o))}),t.EFF(1),t.k0s()}if(2&s){const e=m.$implicit;t.R7$(),t.SpI(" ",e.name," ")}}console;let C=(()=>{class s{constructor(e,n){this.pageService=e,this.route=n,this.pageList=[],this.cur=void 0,this.pageService.list$.subscribe(o=>{this.pageList=o,this.route.paramMap.subscribe(r=>{let c=r.get("pageKey"),p=this.pageList.find(u=>u.key===c);p&&this.pageService.setCur(p.ulid)})}),this.pageService.cur$.subscribe(o=>{this.cur=o})}pageItemClickH(e){this.pageService.setCur(e.ulid)}static#t=this.\u0275fac=function(n){return new(n||s)(t.rXU(f.b),t.rXU(g.nX))};static#e=this.\u0275cmp=t.VBU({type:s,selectors:[["app-page-list"]],standalone:!0,features:[t.aNF],decls:2,vars:1,consts:[["class","page_item",3,"click",4,"ngFor","ngForOf"],[1,"page_item",3,"click"]],template:function(n,o){1&n&&(t.j41(0,"div"),t.DNE(1,v,2,1,"div",0),t.k0s()),2&n&&(t.R7$(),t.Y8G("ngForOf",o.pageList))},dependencies:[a.MD,a.Sq],styles:[".page_item[_ngcontent-%COMP%]{padding:8px;border:1px solid #ddd;margin:4px;cursor:pointer}"]})}return s})();var x=i(9757),L=i(4273),y=i(4125),b=i(9583);function P(s,m){if(1&s&&t.nrm(0,"app-stack",2),2&s){const e=t.XpG();t.Y8G("componentList",e.componentList)}}console;let M=(()=>{class s{constructor(e,n,o,r){this.route=e,this.appService=n,this.envService=o,this.componentService=r,this.show=!0,this.componentList=[],this.popupsComponentList=[],this.route.paramMap.subscribe(c=>{c.get("appKey")&&c.get("env")&&this.appService.reqAppDetail(c.get("appKey"),c.get("env")),c.get("env")&&this.envService.setCur(c.get("env"))}),this.componentService.componentList$.subscribe(c=>{new Promise((p,u)=>{p(!0)}).then(()=>(this.show=!1,this.componentList=[],this.componentList=c,!0)).then(()=>{(0,h.$m)(()=>{this.show=!0})})}),this.gridOptions={margin:2,float:!0,staticGrid:!0,column:24}}ngOnInit(){}identify(e,n){return n.id}static#t=this.\u0275fac=function(n){return new(n||s)(t.rXU(g.nX),t.rXU(x.d),t.rXU(L.L),t.rXU(y.b))};static#e=this.\u0275cmp=t.VBU({type:s,selectors:[["app-layout"]],standalone:!0,features:[t.aNF],decls:8,vars:1,consts:[[1,"box"],[3,"componentList",4,"ngIf"],[3,"componentList"]],template:function(n,o){1&n&&(t.j41(0,"section",0)(1,"header"),t.EFF(2,"header"),t.k0s(),t.j41(3,"section")(4,"aside"),t.nrm(5,"app-page-list"),t.k0s(),t.j41(6,"main"),t.DNE(7,P,1,1,"app-stack",1),t.k0s()()()),2&n&&(t.R7$(7),t.Y8G("ngIf",o.show))},dependencies:[C,d.h,b.I,a.MD,a.bT],styles:[".box[_ngcontent-%COMP%]{width:100vw;height:100vh;display:flex;flex-direction:column}.box[_ngcontent-%COMP%]   header[_ngcontent-%COMP%]{flex-basis:120px;background:#ffcdcd}.box[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]{display:flex;flex-basis:80%;flex-grow:1;width:100%;max-height:calc(100% - 120px)}.box[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   aside[_ngcontent-%COMP%]{flex-basis:200px;position:sticky;background:#c6ffee;overflow:auto}.box[_ngcontent-%COMP%]   section[_ngcontent-%COMP%]   main[_ngcontent-%COMP%]{flex-basis:80%;flex-grow:1;flex-shrink:1;overflow:auto}"]})}return s})()}}]);