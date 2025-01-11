||||
|-|-|-|
|分支|f_layout||
|tab内非最后一个子组件无法选中|todo||
|web-site增加事件中枢的逻辑|todo||
|refactor: item中不再执行child.改为在slots中指定key处理子组件的ulid.|done||
|refactor:服务端：删除组件，需要支持控制是否删除子组件|done||
|修改table的field字段，检查是否正常修改items、slots、视图|||
|tabs不再处理脏数据|done||
|tabs不能正常运行了|done||
|tabs修改id|done||
||服务端：支持修改子组件的数据|不应该开发此接口，应用在component的put方式中增加功能。|
|检查所有调用 reqDeleteComponent 的地方|done + doing||
|测试删除items时的逻辑|doing||
|改为一个接口|||
|xx页面无组件。未选中组件。|||
|// todo rename reqUpdateComponent|||
|在table中创建多个子组件后，分别删除子组件，是否正确运行。数据正确。|done||
||当删除中间的子组件时， |done|
|有时无法选中页面|||
|// todo 这里的Ulid好像不需要|||
|init的button不应该有items|done||
|改变table组件的子元素时同列应该更新|||
|table的子元素应该在slots中处理。items中不再处理childUlid了|todo||
|要上生产的内容|||
||feat:搭建页面增加返回按钮||
||feat:支持块布局||
||feat:table组件在删除items时删除子组件||
||fix:解决在tabs组件的items中创建组件时未处理组件链式关系的问题。||
||perf:优化item的删除icon应该在内部||
||perf:使用事件中枢处理items面板与组件的联动逻辑||
||perf:items中不再支持childUlid,改为slots中处理子组件的ulid.||
||perf:items不挂载子组件的ulid。子组件的ulid都在slots中。||
||perf:列表页面应该优化样式||
||perf:明确前端控制删除子组件列表。后端不负责组件关系。后端使用前端给的数据执行删除。||
||feat事件中枢在service中统一触发。注册事件在面板中。回调在组件中。||
||perf:table的子组件挂载到slots字段||
||feat:刷新应用列表时显示提示||
||||
||||
||||

|服务端定期删除脏数据|||
|丰富组件|||
||弹性布局组件||
||网络布局组件||
||页面组件||
|不应该使用默认的选中组件，因有可能用户不选中组件直接为指定组件操作。如为table组件添加子组件|||
|排版组件|||
|增加meta面板。是否渲染，宽度、高度、x坐标、y坐标|||
|创建碎片平台|||
|官网增加助手函数子导航|待定||
|整理升级的要求|||
|table组件在与items时的操作逻辑子组件|todo||
|setup页面删除componentByPage或componentList|||
|table组件的打开事件应该事件名+ulid|todo||
||可能需要增加一个layout配置面板|todo|
|可能会有脏数据。写一个检查脏数据的程序，定时运行。|||
||先写一个遇到脏数据报警的程序||
|在指定时机，如进入搭建页面时，清洗脏数据。|||
|丰富组件|||
||inputNumber||
||radio||
||card||
||imagePreview||
||accordion||
||breadcrumb||
||cascader||
||datepicker||
||slider||
||textarea||
||toggle||
||drawer||
||avatar||
||badge||
||progress||
||rate||
||tag||
|应用把非dev环境的版本回退到dev环境|||
|丰富配置面板的setter|||
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



三个参数
utils/plugins/thirdParams
utils: {
  getComonentInstance,
  req,
}
||utils|plugins||
|-|-|-|-|
||内置工具|外部引入的插件||
|异步加载|不需要请求|需要请求||
||总是存在|若不需要可以不设置，就不存在||
|||||

||utils|classes||
|-|-|-|-|
|工作范围|无明确作用域|非常通用||
|形式|函数|类||
|||不可循环使用||
|||在当前angular项目中单例存在||

||page生命周期方法|说明||
|-|-|-|-|
||preLoad|请求当前页面的组件前或从缓存中取出当前页面的组件前||
||postLoad|请求当前页面的组件后或从缓存中取出当前页面的组件后||

||component生命周期方法|说明||
|-|-|-|-|
|||非常通用||


因为export导出的是变量
因为export default导出的是变量

export 1
var a = 1
// 这句相当于 export 1
export a // 所以不合法

我感觉export导出的是对象

you must update your .npmrc
save-workspace-protocol=true
or
pnpm publish.
有人说是npm的bug

事件中枢很好用，但是不方便理清逻辑。应少用。
事件名应该有规范。
  组件类型_组件的ulid_组件内的字段_动作
统一在service中调用。作为事件的总阀门处理。
先用别的，后来才使用事件中枢。
兼顾语义性与惟一性