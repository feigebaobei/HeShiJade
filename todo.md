||完成日期||
|-|-|-|
|切换页面时从接口取得，改为从service中取|doing|使用缓存promise对象的方法解决|
|搭建侧也把component整理为模块|||
|配置项中增强可切换功能|||
|解决删除组件控制前后组件错误的问题|
|更新pageservice/componentservice中的url为serviceUrl|||
|定时刷新token|
|把service中的请求方法改为同时只能触发一个|
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


p7
01HVXRGXSC7WSQ85846WE201BT


