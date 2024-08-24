||完成日期||
|-|-|-|
|舞台区使用拖动布局组件|doing||
|处理嵌套时gridstack布局|todo||
|为可嵌套组件添加子组件中未及时渲染出来|todo||
|布局値最小为2|done||
|在web-site中说明零代码与低代码的边界|done||
|所有可嵌套的组件都使用app-comp-stack|todo||
|app-comp-stack内可删除组件|done||
|modal删除子组件|todo||
|table删除子组件|todo||
|tabs删除子组件|todo||
|modal内无子组件时应该显示提示文案|done||
|完成todo|todo||
|分支|f_grid2||
|要上生产的内容|||
|渲染侧，弹层类组件不能关闭|||
||constructor井布局||
||web-site扩展组件时增加井布局||
||零代码与低代码的边界||

|多种布局方式：井布局、列布局、行布局、块布局|todo||
|解决删除应用后视图中无应用的问题|todo||
|有时无法选中页面|不好复现||
||可能需要增加一个layout配置面板|todo|
|可能会有脏数据。写一个检查脏数据的程序，定时运行。|||
|无页面时提示创建页面|||
|无组件时提示创建组件|||
|组件之间传递数据|以table、pagination、form为例||
|在指定时机，如进入搭建页面时，清洗脏数据。|||
|分包|||
|是否需要把修改service与发请求分开|分开||
|界定低代码与零代码的边界|（事件&配置项）||
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
1. 把当前的开发分支f_xxx推到远端。
2. 合并f_xxx到master
3. 打包web-site.
4. 重启后端服务mock-server
5. 重启后端服务server
6. 打包renderer 或 本地打包后上传
7. 打包constructor 或 本地打包后上传

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





