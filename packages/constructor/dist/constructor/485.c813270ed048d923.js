"use strict";(self.webpackChunkconstructor=self.webpackChunkconstructor||[]).push([[485],{6485:(V,g,a)=>{a.r(g),a.d(g,{AppListModule:()=>P});var b=a(3857),l=a(6994),p=a(1547),h=a(3357),k=a(1332),C=a(4947),j=a(595),c=a(7291),F=a(3132),f=a(8298),v=a(3425),e=a(9601),_=a(1338);let E=console.log,y=(()=>{class r{constructor(s){this.http=s,this.newEvent=new e.bkB,this.msg=[],this.initVersion=v.xv}createBtClickH(){this.newEvent.emit("str"),E("createBtClickH"),this.msg=[{severity:"info",summary:"Absolute",content:"str",myInfo:"Devui"}]}static#e=this.\u0275fac=function(i){return new(i||r)(e.rXU(_.Qq))};static#t=this.\u0275cmp=e.VBU({type:r,selectors:[["app-dialog"]],inputs:{data:"data"},outputs:{newEvent:"newEvent"},decls:27,vars:11,consts:[["dForm",""],["dTextInput","","autocomplete","off","name","key","placeholder","\u521b\u5efa\u6210\u529f\u540e\u4e0d\u53ef\u4fee\u6539",3,"ngModelChange","ngModel"],["dTextInput","","autocomplete","off","name","name","placeholder","\u5e94\u7528\u540d\u79f0",3,"ngModelChange","ngModel"],["name","theme",3,"ngModelChange","options","filterKey","valueKey","ngModel"],[3,"hasHelp","helpTips"],["dTextarea","","name","members","placeholder","\u6210\u5458\u4e4b\u95f4\u4f7f\u7528\u82f1\u6587\u9017\u53f7\u5206\u5272",3,"ngModelChange","ngModel"],[3,"value"]],template:function(i,t){1&i&&(e.j41(0,"form",0)(1,"d-form-item")(2,"d-form-label"),e.EFF(3,"key"),e.k0s(),e.j41(4,"d-form-control")(5,"input",1),e.mxI("ngModelChange",function(n){return e.DH7(t.data.key,n)||(t.data.key=n),n}),e.k0s()()(),e.j41(6,"d-form-item")(7,"d-form-label"),e.EFF(8,"\u5e94\u7528\u540d\u79f0"),e.k0s(),e.j41(9,"d-form-control")(10,"input",2),e.mxI("ngModelChange",function(n){return e.DH7(t.data.name,n)||(t.data.name=n),n}),e.k0s()()(),e.j41(11,"d-form-item")(12,"d-form-label"),e.EFF(13,"\u4e3b\u9898"),e.k0s(),e.j41(14,"d-form-control")(15,"d-select",3),e.mxI("ngModelChange",function(n){return e.DH7(t.data.theme,n)||(t.data.theme=n),n}),e.k0s()()(),e.j41(16,"d-form-item")(17,"d-form-label"),e.EFF(18,"\u7248\u672c\u53f7"),e.k0s(),e.j41(19,"d-form-control"),e.EFF(20),e.k0s()(),e.j41(21,"d-form-item")(22,"d-form-label",4),e.EFF(23,"\u6210\u5458"),e.k0s(),e.j41(24,"d-form-control")(25,"textarea",5),e.mxI("ngModelChange",function(n){return e.DH7(t.data.members,n)||(t.data.members=n),n}),e.k0s()()()(),e.nrm(26,"d-toast",6)),2&i&&(e.R7$(5),e.R50("ngModel",t.data.key),e.R7$(5),e.R50("ngModel",t.data.name),e.R7$(5),e.Y8G("options",t.data.selectOptions)("filterKey","label")("valueKey","value"),e.R50("ngModel",t.data.theme),e.R7$(5),e.SpI(" ",t.initVersion," "),e.R7$(2),e.Y8G("hasHelp",!0)("helpTips","\u6682\u65f6\u4e0d\u751f\u6548"),e.R7$(3),e.R50("ngModel",t.data.members),e.R7$(),e.Y8G("value",t.msg))},dependencies:[p.N5,p.Me,p.f,p.CW,l.qT,l.me,l.BC,l.cb,l.vS,l.cV,k.wB,C.l,c.d3]})}return r})(),D=console.log,S=(()=>{class r{constructor(){D("app",this.data)}static#e=this.\u0275fac=function(i){return new(i||r)};static#t=this.\u0275cmp=e.VBU({type:r,selectors:[["app-app-config-dialog"]],inputs:{data:"data"},decls:6,vars:3,template:function(i,t){1&i&&(e.j41(0,"p"),e.EFF(1),e.k0s(),e.j41(2,"p"),e.EFF(3),e.k0s(),e.j41(4,"p"),e.EFF(5),e.k0s()),2&i&&(e.R7$(),e.SpI("key: ",t.data.app.key,""),e.R7$(2),e.SpI("name: ",t.data.app.name,""),e.R7$(2),e.SpI("version: ",t.data.app.version,""))}})}return r})();var H=a(1445),O=a(5680);let u=console.log,T=(()=>{class r{constructor(s,i){this.appService=s,this.http=i,this.devVersion=0,this.testVersion=0,this.preVersion=0,this.prodVersion=0,this.newVersion=1,this.layoutDirection=p.Hb.Vertical,this.devObj={version:-1,remarks:""},this.testObj={version:-1,remarks:""},this.preObj={version:-1,remarks:""},this.prodObj={version:-1,remarks:""},this.msg=[],this.loop=(0,v.TI)(this.appService.reqProcess,t=>{let o;switch(t.code){case 0:o=t.data.done.length/t.data.total<1;break;case 3e5:o=!1}})}ngOnInit(){this.appService.getVersion(this.data.appUlid,["dev","test","pre","prod"]).then(s=>{u("syntheticVersion",s),this.devObj.version=s.dev?.version??-1,this.devObj.remarks=s.dev?.remarks??"",this.testObj.version=s.test?.version??-1,this.testObj.remarks=s.test?.remarks??"",this.preObj.version=s.pre?.version??-1,this.preObj.remarks=s.pre?.remarks??"",this.prodObj.version=s.prod?.version??-1,this.prodObj.remarks=s.prod?.remarks??""})}devVersionChangeH(s){u("devVersionChangeH",s,this.devObj.version)}devOkBtClickH(){this.http.post(`${(0,H.Rs)()}/apps/versions`,{appUlid:this.data.appUlid,newVersion:this.newVersion}).subscribe(s=>{u(0===s.code?"\u8bbe\u7f6e\u65b0\u7248\u672c\u6210\u529f":"\u8bbe\u7f6e\u65b0\u7248\u672c\u5931\u8d25")})}devToTestBtClickH(){this.appService.publish({appUlid:this.data.appUlid,fromEnv:"dev",toEnv:"test",newVersion:this.devObj.version,remarks:this.devObj.remarks}).then(s=>{switch(s.code){case 0:this.msg=[{severity:"success",summary:"Summary",content:"\u53d1\u5e03\u6210\u529f\u3002"}],this.appService.updateVersion(this.data.appUlid,"dev",this.devObj.version,this.devObj.remarks),this.appService.updateVersion(this.data.appUlid,"test",this.devObj.version,this.devObj.remarks),this.testObj.version=this.devObj.version,this.testObj.remarks=this.devObj.remarks;break;case 1e5:this.msg=[{severity:"success",summary:"Summary",content:"\u5f00\u59cb\u6267\u884c\u53d1\u5e03\u5de5\u4f5c\u3002"}],this.loop.launch().then(()=>{this.appService.updateVersion(this.data.appUlid,"test",this.devObj.version,this.devObj.remarks),this.testObj.version=this.devObj.version,this.testObj.remarks=this.devObj.remarks});break;default:this.msg=[{severity:"error",summary:"Summary",content:`\u53d1\u5e03\u5931\u8d25\u3002${s.message}`}]}})}testToPreBtClickH(){this.appService.publish({appUlid:this.data.appUlid,fromEnv:"test",toEnv:"pre"}).then(s=>{switch(s.code){case 0:this.msg=[{severity:"success",summary:"Summary",content:"\u53d1\u5e03\u6210\u529f\u3002"}],this.appService.updateVersion(this.data.appUlid,"pre",this.testObj.version,this.testObj.remarks),this.preObj.version=this.testObj.version,this.preObj.remarks=this.testObj.remarks;break;case 1e5:this.msg=[{severity:"success",summary:"Summary",content:"\u5f00\u59cb\u6267\u884c\u53d1\u5e03\u5de5\u4f5c\u3002"}],this.loop.launch().then(()=>{this.appService.updateVersion(this.data.appUlid,"pre",this.testObj.version,this.testObj.remarks),this.preObj.version=this.testObj.version,this.preObj.remarks=this.testObj.remarks});break;default:this.msg=[{severity:"error",summary:"Summary",content:`\u53d1\u5e03\u5931\u8d25\u3002${s.message}`}]}})}preToProdBtClickH(){this.appService.publish({appUlid:this.data.appUlid,fromEnv:"pre",toEnv:"prod"}).then(s=>{switch(s.code){case 0:this.msg=[{severity:"success",summary:"Summary",content:"\u53d1\u5e03\u6210\u529f\u3002"}],this.appService.updateVersion(this.data.appUlid,"prod",this.preObj.version,this.preObj.remarks),this.prodObj.version=this.preObj.version,this.prodObj.remarks=this.preObj.remarks;break;case 1e5:this.msg=[{severity:"success",summary:"Summary",content:"\u5f00\u59cb\u6267\u884c\u53d1\u5e03\u5de5\u4f5c\u3002"}],this.loop.launch().then(()=>{this.appService.updateVersion(this.data.appUlid,"prod",this.preObj.version,this.preObj.remarks),this.prodObj.version=this.preObj.version,this.prodObj.remarks=this.preObj.remarks});break;default:this.msg=[{severity:"error",summary:"Summary",content:`\u53d1\u5e03\u5931\u8d25\u3002${s.message}`}]}})}testToDevClickH(){u("testToDevClickH")}preToDevClickH(){u("preToDevClickH")}prodToDevClickH(){u("prodToDevClickH")}testDeleteBtClickH(){}static#e=this.\u0275fac=function(i){return new(i||r)(e.rXU(O.d),e.rXU(_.Qq))};static#t=this.\u0275cmp=e.VBU({type:r,selectors:[["app-publish-dialog"]],inputs:{data:"data"},decls:49,vars:15,consts:[[1,"box"],[1,"env-box"],["dForm","","ngForm","",3,"layout"],[3,"required","hasHelp","helpTips"],["name","version",1,"input-number",3,"ngModelChange","min","step","ngModel"],["dTextarea","","name","remarks","maxlength","20",3,"ngModelChange","ngModel"],[1,"button-publish",3,"click"],[1,"button-box",3,"click"],[3,"value"]],template:function(i,t){1&i&&(e.j41(0,"div",0)(1,"div",1)(2,"h4"),e.EFF(3,"dev\u73af\u5883"),e.k0s(),e.j41(4,"form",2)(5,"d-form-item")(6,"d-form-label",3),e.EFF(7,"\u7248\u672c\u53f7"),e.k0s(),e.j41(8,"d-form-control")(9,"d-input-number",4),e.mxI("ngModelChange",function(n){return e.DH7(t.devObj.version,n)||(t.devObj.version=n),n}),e.bIt("ngModelChange",function(n){return t.devVersionChangeH(n)}),e.k0s()()(),e.j41(10,"d-form-item")(11,"d-form-label"),e.EFF(12,"\u5907\u6ce8"),e.k0s(),e.j41(13,"d-form-control")(14,"textarea",5),e.mxI("ngModelChange",function(n){return e.DH7(t.devObj.remarks,n)||(t.devObj.remarks=n),n}),e.k0s()()()()(),e.j41(15,"d-button",6),e.bIt("click",function(){return t.devToTestBtClickH()}),e.EFF(16,"\u53d1\u5e03->"),e.k0s(),e.j41(17,"div",1)(18,"h4"),e.EFF(19,"test\u73af\u5883"),e.k0s(),e.j41(20,"p"),e.EFF(21),e.k0s(),e.j41(22,"p"),e.EFF(23),e.k0s(),e.j41(24,"d-button",7),e.bIt("click",function(){return t.testToDevClickH()}),e.EFF(25,"\u56de\u9000\u5230dev\u73af\u5883"),e.k0s()(),e.j41(26,"d-button",6),e.bIt("click",function(){return t.testToPreBtClickH()}),e.EFF(27,"\u53d1\u5e03 >>"),e.k0s(),e.j41(28,"div",1)(29,"h4"),e.EFF(30,"pre\u73af\u5883"),e.k0s(),e.j41(31,"p"),e.EFF(32),e.k0s(),e.j41(33,"p"),e.EFF(34),e.k0s(),e.j41(35,"d-button",7),e.bIt("click",function(){return t.preToDevClickH()}),e.EFF(36,"\u56de\u9000\u5230dev\u73af\u5883"),e.k0s()(),e.j41(37,"d-button",6),e.bIt("click",function(){return t.preToProdBtClickH()}),e.EFF(38,"\u53d1\u5e03->"),e.k0s(),e.j41(39,"div",1)(40,"h4"),e.EFF(41,"prod\u73af\u5883"),e.k0s(),e.j41(42,"p"),e.EFF(43),e.k0s(),e.j41(44,"p"),e.EFF(45),e.k0s(),e.j41(46,"d-button",7),e.bIt("click",function(){return t.prodToDevClickH()}),e.EFF(47,"\u56de\u9000\u5230dev\u73af\u5883"),e.k0s()()(),e.nrm(48,"d-toast",8)),2&i&&(e.R7$(4),e.Y8G("layout",t.layoutDirection),e.R7$(2),e.Y8G("required",!0)("hasHelp",!0)("helpTips","This is the plan name."),e.R7$(3),e.Y8G("min",0)("step",1),e.R50("ngModel",t.devObj.version),e.R7$(5),e.R50("ngModel",t.devObj.remarks),e.R7$(7),e.SpI("",t.testObj.version,"\u7248\u672c"),e.R7$(2),e.JRh(t.testObj.remarks),e.R7$(9),e.SpI("",t.preObj.version,"\u7248\u672c"),e.R7$(2),e.JRh(t.preObj.remarks),e.R7$(9),e.SpI("",t.prodObj.version,"\u7248\u672c"),e.R7$(2),e.JRh(t.prodObj.remarks),e.R7$(3),e.Y8G("value",t.msg))},dependencies:[p.N5,p.Me,p.f,p.CW,l.qT,l.me,l.BC,l.cb,l.tU,l.vS,l.cV,h.Qp,j.n,c.d3],styles:[".box[_ngcontent-%COMP%]{display:grid;grid-template-columns:200px auto 200px auto 200px auto 200px;grid-gap:16px}.box[_ngcontent-%COMP%]   .button-publish[_ngcontent-%COMP%]{align-self:center}"]})}return r})();var B=a(4993),I=a(678),M=a(5738);function R(r,L){if(1&r){const s=e.RV6();e.j41(0,"div",4),e.bIt("click",function(){const t=e.eBV(s).$implicit,o=e.XpG();return e.Njj(o.appItemClickH(t.ulid))}),e.j41(1,"p")(2,"span"),e.EFF(3,"key:"),e.k0s(),e.j41(4,"span"),e.EFF(5),e.k0s()(),e.j41(6,"p")(7,"span"),e.EFF(8,"name:"),e.k0s(),e.j41(9,"span"),e.EFF(10),e.k0s()(),e.j41(11,"p")(12,"span"),e.EFF(13,"theme:"),e.k0s(),e.j41(14,"span"),e.EFF(15),e.k0s()(),e.j41(16,"p")(17,"d-button",0),e.bIt("click",function(t){const o=e.eBV(s).index,n=e.XpG();return e.Njj(n.configBtClickH(t,o))}),e.EFF(18,"\u914d\u7f6e"),e.k0s(),e.j41(19,"d-button",0),e.bIt("click",function(t){const o=e.eBV(s).index,n=e.XpG();return e.Njj(n.gotoPublishBtClickH(t,o))}),e.EFF(20,"\u7248\u672c&\u53d1\u5e03"),e.k0s(),e.j41(21,"d-button",0),e.bIt("click",function(t){const o=e.eBV(s).index,n=e.XpG();return e.Njj(n.appDeleteClickH(t,o))}),e.EFF(22,"\u5220\u9664"),e.k0s()()()}if(2&r){const s=L.$implicit;e.R7$(5),e.JRh(s.key),e.R7$(5),e.JRh(s.name),e.R7$(5),e.JRh(s.theme)}}let m=console.log;const U=[{path:"",component:(()=>{class r{constructor(s,i,t,o,n,d){this.router=s,this.dialogService=i,this.appService=t,this.userService=o,this.pageService=n,this.componentService=d,this.userService.getUser().then(A=>{this.user=A}),this.msg=[],this.appList=[]}ngOnInit(){this.init()}init(){this.appService.getAppList().then(s=>{this.appList=s})}logoutBtClickH(){this.userService.logout().then(()=>{this.router.navigate(["/"])}).catch(s=>{m("\u767b\u51fa\u5931\u8d25")})}userInfoBtClickH(){}gotoHomeInfoBtClickH(){this.router.navigate(["/"])}openModalBtClickH(){let s=this.dialogService.open({id:"dialog-service",width:"346px",maxHeight:"600px",title:"\u521b\u5efa\u65b0\u5e94\u7528",content:y,backdropCloseable:!0,onClose:()=>console.log("on dialog closed"),data:{key:"one",name:"one",members:"123@qq.com,kevin@163.com",theme:"blue",selectOptions:[{value:"blue",label:"\u84dd"},{value:"yellow",label:"\u9ec4"}]},buttons:[{cssClass:"primary",text:"\u521b\u5efa",disabled:!1,handler:i=>{let t=s.modalContentInstance.data,o=t.members.split(",").map(n=>n.trim()).filter(n=>!!n);o=[...new Set(o)],this.userService.getUser().then(n=>{let d=(0,v.b4)(t.key,t.name,t.theme,n.profile.email);this.appList.push(d),this.userService.appendApp(d.ulid),this.appService.createApp(d),this.pageService.createApp(d.ulid)}),s.modalInstance.hide()}},{id:"btn-cancel",cssClass:"common",text:"\u53d6\u6d88",handler:i=>{s.modalInstance.hide()}}]})}appItemClickH(s){this.appService.setCurApp(s),this.router.navigate(["/setup"],{queryParams:{app:s}})}sqlBtClickH(){this.reqAppList()}reqAppList(){this.appService.reqAppList().then(s=>{this.appService.opAppList(s)})}configBtClickH(s,i){s.stopPropagation();let t=this.dialogService.open({id:"app-config-dialog-service",width:"346px",maxHeight:"600px",title:"\u5e94\u7528\u914d\u7f6e",content:S,backdropCloseable:!0,onClose:()=>m("hi close"),data:{app:this.appList[i]},dialogtype:"standard",showAnimate:!0,buttons:[{id:"app-config-dialog-btn-canncel",cssClass:"common",text:"\u5173\u95ed",handler:o=>{t.modalInstance.hide()}}]})}gotoPublishBtClickH(s,i){m("gotoPublishBtClickH",i,this.appList[i],this.appList[i].ulid),s.stopPropagation(),this.dialogService.open({id:"PublishDialogComponent",width:"800px",maxHeight:"600px",title:"\u53d1\u5e03",content:T,backdropCloseable:!0,onClose:()=>m("close"),data:{appUlid:this.appList[i].ulid},dialogtype:"standard",showAnimate:!0,buttons:[]})}homeBtClickH(){this.router.navigate(["/home"])}appDeleteClickH(s,i){s.stopPropagation();let t=this.appList[i];this.appList.splice(i,1),this.appService.reqDeleteApp(t.ulid,["dev","test","pre","prod"]),this.pageService.getPageList(t.ulid,!0).then(o=>{o.forEach(n=>{this.componentService.deleteComponentByPageUlid(n.ulid)})}),this.pageService.deletePageByAppUlid(t.ulid),this.appService.deleteApp(t.ulid),this.userService.deleteApp(t.ulid,this.appList[0]?.ulid||"")}static#e=this.\u0275fac=function(i){return new(i||r)(e.rXU(f.Ix),e.rXU(F.o3),e.rXU(O.d),e.rXU(B.D),e.rXU(I.b),e.rXU(M.b))};static#t=this.\u0275cmp=e.VBU({type:r,selectors:[["app-list"]],decls:16,vars:3,consts:[[3,"click"],[1,"app_section"],["class","app_box",3,"click",4,"ngFor","ngForOf"],[3,"value"],[1,"app_box",3,"click"]],template:function(i,t){1&i&&(e.j41(0,"header")(1,"span"),e.EFF(2),e.k0s(),e.j41(3,"d-button",0),e.bIt("click",function(){return t.logoutBtClickH()}),e.EFF(4,"logout"),e.k0s(),e.j41(5,"d-button",0),e.bIt("click",function(){return t.homeBtClickH()}),e.EFF(6,"home"),e.k0s()(),e.j41(7,"main")(8,"div")(9,"d-button",0),e.bIt("click",function(){return t.openModalBtClickH()}),e.EFF(10,"\u521b\u5efa\u65b0\u5e94\u7528"),e.k0s(),e.j41(11,"d-button",0),e.bIt("click",function(){return t.sqlBtClickH()}),e.EFF(12,"\u67e5\u8be2\u5e94\u7528\u5217\u8868"),e.k0s()(),e.j41(13,"section",1),e.DNE(14,R,23,3,"div",2),e.k0s()(),e.nrm(15,"d-toast",3)),2&i&&(e.R7$(2),e.SpI("\u7528\u6237\u8d26\u53f7\uff1a",null==t.user||null==t.user.profile?null:t.user.profile.email,""),e.R7$(12),e.Y8G("ngForOf",t.appList),e.R7$(),e.Y8G("value",t.msg))},dependencies:[b.Sq,h.Qp,c.d3],styles:[".app_section[_ngcontent-%COMP%]{display:flex}.app_box[_ngcontent-%COMP%]{border:1px solid #333;flex-basis:360px;flex-grow:0;flex-shrink:1;margin:8px 16px;cursor:pointer}"]})}return r})()}];let P=(()=>{class r{static#e=this.\u0275fac=function(i){return new(i||r)};static#t=this.\u0275mod=e.$C({type:r});static#s=this.\u0275inj=e.G2t({imports:[f.iI.forChild(U),b.MD,p.tH,l.YN,h.tm,k.py,C._,j.O,c.MB,F.Q_]})}return r})()}}]);