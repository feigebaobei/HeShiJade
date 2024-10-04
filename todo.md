||||
|-|-|-|
|设计插件的结构。考虑支持生命周期的方法、增强功能的方法。|done||
|位移时请求一次接口|todo||
|取消行为配置项的显隐逻辑|||
|搭建侧选择插件|||
|考虑支持生命周期的方法|done||
||考虑支持生命周期的方法|done|
|修改app的数据结构 pluginsKey|doing||
||web-site 修改app的数据结构 pluginsKey|done||
||服务侧设置、修改插件||
||服务侧搜索插件|doing|
||搭建侧请求选择插件|doing|
||搭建侧创建应用时初始化项中增加插件||
||渲染侧请求插件插件|||
|插件增加hooks.loadPost / profile.description|done||
|解决setup页面请求2次app/page接口的问题|todo||
|web-site 插件的规范文档|done||
|分支|f_plugin||
|要上生产的内容|||
||web-site 后端接口的数据结构||
||server支持上传文件。安装了multer依赖。||
||服务侧存插件||
||服务侧取插件||
||web-site 插件的逻辑|done|
||渲染侧消费插件|done|

|创建碎片平台|||
|官网增加助手函数子导航|待定||
|整理升级的要求|||
|web-site扩展组件时增加井布局|todo||
|fix  删除最后一个页面后，再创建一个页面，则无法选中这个页面|todo||
|fix  select组件在搭建侧与grid结合使用时出现的区域不够，使用了滚动条|todo||
|多种布局方式：井布局、列布局、行布局、块布局|todo||
|table组件在与items时的操作逻辑子组件|todo||
|setup页面删除componentByPage或componentList|||
|搭建页面的标题与按钮应该在同一行|todo||
||table组件在删除items时删除子组件|todo|
|table组件的打开事件应该事件名+ulid|todo||
|解决删除应用后视图中无应用的问题|todo||
|把选中组件、选中页面、选中应用等根据subject触发事件的逻辑改为signal或shareEvent|||
|有时无法选中页面|不好复现||
||可能需要增加一个layout配置面板|todo|
|可能会有脏数据。写一个检查脏数据的程序，定时运行。|||
|组件之间传递数据|以table、pagination、form为例||
|在指定时机，如进入搭建页面时，清洗脏数据。|||
|是否需要把修改service与发请求分开|分开||
|丰富组件|||
||accordion||
||breadcrumb||
||cascader||
||datapicker||
||inputNumber||
||radio||
||slider||
||textarea||
||toggle||
||drawer||
||avatar||
||badge||
||card||
||imagePreview||
||progress||
||rate||
||tag||
|应用把非dev环境的版本回退到dev环境|||
|生命周期|||
|丰富配置面板的setter|||
||number||
|“注销用户”功能|||
|核验idp提供的token|||
|验证saml数据是否有效|||
|sso官网（包括：使用方法）计划使用react 19|||
|lc官网（包括：使用方法）计划使用angular 18|||
||||



做收敛。
组件做通用。若干组件收敛为一个组件。
若干用法中，指定一种用法。
api只暴露几个用户关心的、使用简单的api.


## 兼容脏数据
1. 为数据设置版本号
2. 根据版本号使用对应的解释器，返回严格正确的数据结构。
3. 当遇到脏数据时，调用后端接口，接口处理相应数据为干净数据。

# 由流式触发变为promise+service缓存
subject&promise不同
| subject | promise |
|-|-|
|流式监听|手动触发|
|可多次|只一次|

# 动态变化的过程
# 规范的开发过程
需求阶段
    明确现状
    明确期望值
    评估变动量
开发阶段
    整理清基于现状的变动逻辑
    从最低层开始实现
自测阶段
    列出此变动的所有相关操作点

# 每6个月升级一次技术栈

当切换用户时应不保存以前用户的数据


yargs
just


# 零代码，低代码，富代码 之间的边界
||零代码|低代码|富代码|
|-|-|-|-|
|职责范围|各种配置|定义使用配置的代码。包括：方法、hooks、业务逻辑|完整的项目代码|
|||||
|||||

# devui
api众多。其中好多不通用的。

# 上生产过程
1. 本地打包renderer
2. 本地打包constructor
3. 把当前的开发分支f_xxx推到远端。
4. 在github上合并f_xxx到master
5. 在服务端拉取master分支
6. 重启后端服务mock-server
7. 重启后端服务server
8. 在服务端打包web-site.

# 强制更新子组件
// 父组件
import { Component } from '@angular/core';
 
@Component({
  selector: 'app-parent',
  template: `<app-child [refreshKey]="refreshKey"></app-child>`
})
export class ParentComponent {
  refreshKey = 0;
 
  refreshChild() {
    this.refreshKey++;
  }
}
// 子组件
import { Component, Input, OnChanges } from '@angular/core';
 
@Component({
  selector: 'app-child',
  template: `<div>Child content</div>`
})
export class ChildComponent implements OnChanges {
  @Input() refreshKey: number;
 
  ngOnChanges(changes: SimpleChanges) {
    if (changes.refreshKey && !changes.refreshKey.firstChange) {
      // 这里可以添加你想要执行的刷新逻辑
      console.log('Child refreshed');
    }
  }
}
# 强制更新当前组件
import { Component, ChangeDetectorRef } from '@angular/core';
 
@Component({
  selector: 'app-my-component',
  template: `
    <p>{{ currentTime }}</p>
  `
})
export class MyComponent {
  currentTime: Date = new Date();
 
  constructor(private cdRef: ChangeDetectorRef) {
    setInterval(() => {
      this.currentTime = new Date();
      this.cdRef.detectChanges(); // 强制当前组件进行变更检测
    }, 1000);
  }
}

subject在取消订阅`subject.unsubscribe()`后不能再接收数据，否则会报错ObjectUnsubscribedErrorImpl

数据三级缓存
  后端数据库
  tree
  service中map
  特定组件

# 升级的要求
- node 18.19.1+
- ts 5.2+
- zone.js 0.14+
执行`ng update @angular/core@17 @angular/cli@17`

# 缩小包体积
- tree shaking
  - 从最小的范围引入。
- lazy laoding
  1. 使用loadChildren加载模块
  2. 在app.module.ts中不引入相关模块
- module analyzer
  1. 安装 webpack-bundler-analyzer
- standalone components
  - 以standalone方式开发组件
  - 在routing文件中懒加载

# lazy load
{
  path: '', 
  loadChildren: () => import("./components/login/login.module").then(m => m.LoginModule)
}
{
  path: 'login',
  loadComponent: () => import('./pages/login-page/login-page.component').then( m => m.LoginPageComponent)
},
# 分析包体积
npm i -g webpack-bundle-analyzer
ng build --stats-json
cd dist/constructor
webpack-bundle-analyzer stats.json
在浏览器中打开localhost:8888

# How to Reduce the Bundle Size?
There are several strategies to optimize your bundle size:

Lazy-load modules and components that are not required on the initial load
Use the new @defer syntax in component templates. (Remember that it impacts SEO)
Utilize TypeScript’s dynamic import expressions to lazy-load code on demand. This pattern is commonly used with dialog boxes.
Replace external libraries with your own light-weight implementations. 
Remove or relocate styles from global styles (styles.scss) to the components
Use standalone components or the SCAM architecture (for Angular versions below 14.0.0) to take advantage of tree-shaking and remove unused components from your bundle.
Remove all dead code from your application, including unused services, directives, pipes, modules, and so on. Additionally, remove unused dependencies and libraries from your bundle.

concatenate 连接、连接的
content 目录
Realize 了解，意识到

stat size webpack从入口文件打包递归到所有模块体积
parsed size 解析与代码压缩优化后输出到dist目录的体积（dist目录内压缩后的js文件）
putting 安置，投置
declarations 声明

# budget的类型
bundle 特定包的大小
initial 全部初始化脚本的体积之和的大小。与首页打开速度相关。很重要。
allScript 所有js的大小
all 整个应用的大小
anyComponentStyle 任意组件的样式大小
anyScript 任一js的大小
any 任意文件的大小

# 减小包体积的具体操作
异步加载路由
  (可以把根模块与路由对应的子模块拆开。不能能子模块内的模块拆开。)
关键组件改为standalone components
删除根模块（app.module.ts）中原来声明的组件、引入的通用模块（改为在子模板、子组件中按需引入）、引入的pipe
按需引入devui

# 优化的本质
性能与功能之间达到平衡。
# 优化到什么为止
1. init内只有必要的包。如commonModule/formsModule/xxx
2. lazy loading路由
3. 分情况异步加载组件

4. 更看重解决具体问题的能力，而不是包装能力。
5. 对专业的兴趣和热情
6. 有找到清晰目标的能力
7. 系统性思维


# 动态引入组件
export class HomeContainerComponent implements OnInit {
  constructor(
      private vcref: ViewContainerRef,
      private cfr: ComponentFactoryResolver
  ){}
  
  ngOnInit(){
    this.loadGreetComponent()
  }
​
  async loadGreetComponent(){
      this.vcref.clear();
      // 使用 import() 懒加载组件
      const { HomeComponent } = await import('./home.component');
      let createdComponent = this.vcref.createComponent(
        this.cfr.resolveComponentFactory(HomeComponent)
      );  
  }
}


getComponentInstance('01J85BMRDJ3NYS52FX3NDEKPDZ').setProps({visible: true})


plugin表
  profile
    key
    authorEmail
    authorName
  hooks
    loadPost
    pageInstancePost
    componentInstancePost
  fnx
  
fn.toString()
eval(str)

存插件 
取插件
都是json。都不能使用fn.只能使用string。
      client    server     client
      fn->str
                save
                          str->fn

插件的文档结构  已经确定
上传文件
上传文本


getComponentInstance('01J90EYZ28TAH60BS34AV8Z499').openDialog();
let clog = console.log;
clog('plugins', plugins);
plugins.key.fnx()
要求严格自测插件代码。
为插件方法绑定this.平台插件若干助手方法.

|-----------|
|           |
|           |
|           |
|           |
|-----------|

key
authorEmail
authorName
选择生命周期方法
自定义方法输入框

上传一个文件。



  <div class="col-md-5">
    <d-select
      [enableLazyLoad]="true"
      (loadMore)="loadMore($event)"
      [loadingTemplateRef]="loadingTemplateRef"
      [placeholder]="'Small Input'"
      [options]="options1"
    ></d-select>



    