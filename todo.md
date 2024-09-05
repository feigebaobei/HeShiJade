解决上一次部署时的不足+升级技术栈
||完成日期||
|-|-|-|
|删除app.module.ts中注释的代码及对应的文件|todo||
搭建侧的identify方法体是否正确？  todo
|替换掉subject触发的逻辑|todo||
|防抖阈值改为从配置文件中取|todo||
|解决进入搭建页面时请求2次page列表接口的问题|||
|无页面时提示创建页面|||
|无组件时提示创建组件|||
|分包|为了减小main.xxx.js的体积，增加首页加载速度|doing|
||明确具体操作方式|done|
||lazy laoding|需要把组件改为模块。不适合现有情况。|
||standalone components|doing|
||使用异步加载路由|未看到减小包体积|
||使用独立组件|未看到减小包体积|
||setup中使用组件列表组件|doing|
|打包上传|done||
|升级使用方法|todo||
|分支|f_update||
|要上生产的内容|||
||constructor/renderer/web-site升级angular到17.3.12||

|web-site扩展组件时增加井布局|todo||
|fix  删除最后一个页面后，再创建一个页面，则无法选中这个页面|todo||
|fix  select组件在搭建侧与grid结合使用时出现的区域不够，使用了滚动条|todo||
|多种布局方式：井布局、列布局、行布局、块布局|todo||
|modal组件的打开事件应该事件名+ulid|todo||
|table组件在与items时的操作逻辑子组件|todo||
||table组件在删除items时删除子组件|todo|
|table组件的打开事件应该事件名+ulid|todo||
|解决删除应用后视图中无应用的问题|todo||
|items面板支持删除功能|done||
|把选中组件、选中页面、选中应用等根据subject触发事件的逻辑改为signal或shareEvent|||
|有时无法选中页面|不好复现||
||可能需要增加一个layout配置面板|todo|
|可能会有脏数据。写一个检查脏数据的程序，定时运行。|||
|组件之间传递数据|以table、pagination、form为例||
|在指定时机，如进入搭建页面时，清洗脏数据。|||
|是否需要把修改service与发请求分开|分开||
|界定低代码与零代码的边界|（事件&配置项）|done|
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