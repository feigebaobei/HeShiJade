||完成日期||
|-|-|-|
|user使用firstApplicationUlid.不使用lastApplicationUlid|done||
|page使用firstComponentUlid.不使用lastComponentUlid|done||
|在新创建的应用中一口气操作下去会出现问题|doing||
||创建应用后未及时显示出来|doing|
|整理createStepRecorder的key|||
|2min后删除error状态的记录数据。考虑是否这样做。|||
|server中的日志兼容error|||
|doc中写
      this._curComponent = this._find(compUlid)
      this.curComponent$.next(this._curComponent) 二级缓存|||
|整理发布应用的4种处理方式到doc|||
|f_delete|||

|舞台区使用拖动布局组件|||
|上生产|||
|是否需要把修改service与发请求分开|||
|丰富组件|||
|回退功能|||
|改变button的类型时未调用接口|||
|“注销用户”功能|||
|核验idp提供的token|||
|验证saml数据是否有效|||
|sso官网（包括：使用方法）计划使用react 19|||
|lc官网（包括：使用方法）计划使用angular|||
||||

props 一对kv就能搞定的
items 子元素
slots 子组件
meta  保存在数据库中，渲染组件时使用
config 配置面板中使用


做收敛。
组件做通用。若干组件收敛为一个组件。
若干用法中，指定一种用法。
api只暴露几个用户关心的、使用简单的api.


table支持操作列
1. 使用死数据在舞台区渲染出组件的操作列
2. 确定组件的配置数据
3. 在舞台区渲染出组件
4. 配置组件的配置数据
5. 当改变配置项时更新舞台区的组件渲染效果。
6. 分别操作table组件的items、service中的tree型数据、服务端的数据。
7. 在渲染侧使用死数据渲染出table的操作列。
8. 在渲染侧增强tree支持items[x].child<ulid>。
9. 由死数据改为活数据。

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
为以后支持应用可拖动排序，应该保留firstApplicationUlid

# 树型结构
## 优点
- 结构整齐
## 缺点
- 为维持结构，需要较多操作
有没有树型结构数据库
