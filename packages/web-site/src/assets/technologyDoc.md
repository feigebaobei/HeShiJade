# 技术文档

## 前言

- 现在做低代码已经晚了，再不做就没机会了。（2023.06.07）
- 卞和三献宝

## 技术栈

- angular / ts
- Angular Material
- crtp
- pnpm
- node 16+
- mongodb

## 概念介绍

|        |                          |     |     |
| ------ | ------------------------ | --- | --- |
| 搭建侧 | 用于创建应用的前端应用   |     |     |
| 渲染侧 | 用于渲染应用的前端应用   |     |     |
| 服务侧 | 支持搭建侧、渲染侧的服务 |     |     |
| 渲染侧 |                          |     |     |
| 渲染侧 |                          |     |     |
| 渲染侧 |                          |     |     |
| 渲染侧 |                          |     |     |
| 渲染侧 |                          |     |     |

## 整体架构

```
    搭建侧              服务侧              渲染侧
      |                 |                   |
      |                 |                   |
    注册、登录
    创建应用
    init应用的数据 --》 保存数据
    创建页面 ------》 保存数据
    创建、编译组件 --》 保存数据
                                        进入特定应用
                         《------------ 请求应用的数据
                         《------------ 请求所有页面
                         《------------ 请求当前页面的组件
                                        渲染所有组件
```



## 项目子包

### constructor 搭建侧

#### overview
```
|-----------------------------------------------------------------------------------------------------|
|                                   appKey/pageKey                                               预览  |
|-----------------------------------------------------------------------------------------------------|
| page / component  | stage                                       | props / behavior / slot / items   |
| p0                | component1                                  | label                             |
| p1                | component2                                  | formItem                          |
| p2                | component3                                  | label                             |
|                   |                                             | formItem                          |
| 组件类型           |                                             |                                    |
| 组件0              |                                            |                                    |
| 组件1              |                                            |                                    |
| 组件2              |                                            |                                    |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|                   |                                             |                                   |
|-----------------------------------------------------------------------------------------------------|
```
舞台区的组件使用stack组件包裹。由它使用动态组件原理处理各种组件。当前总是以块级元素渲染，日后使用可栅格化的组件渲染。
当props改变时更新store中的数据，再调用更新接口

feature flag控制使用新旧功能
配置文件中设置版本号。根据版本号解析。
数据保存在service中。
舞台区从service中取出当前页面的组件的配置数据再渲染。
选中组件
根据组件类型在右侧渲染设置器。
创建组件
从组件种类列表拖到舞台区。
setup组件中根据组件种类取出默认配置数据，间接喂入动态组件。
  拖入舞台区后取出该种组件的配置数据。
  在service中追加该组件的配置信息。
  舞台区渲染当面页面组件。
选中组件
取出设置器
从service中取出该组件的配置数据
为setter设置当前值。
修改组件
修改service中的数据
更新舞台区视图
调用相关接口
删除组件
删除service中的数据，
调用相关接口


#### routes
||||
|-|-|-|
|path|||
|list|||
|setup|url通式 `http://$home:$port/setup?app=$appUlid`||

#### version

4个环境：dev/test/pre/prod依次发布，不可跳跃。
版本号在dev环境设置。

```
/version
get
  取4个环境的version
  取指定环境的version
put
  设置dev环境的version
```

#### 创建应用
#### 创建页面
#### 创建组件
1. 从组件列表拖动舞台区。
2. 在store中创建组件。更新页面的first、last属性。
3. 调用创建组件的接口

props 一对kv就能搞定的
items 子元素
slots 子组件
meta  保存在数据库中，渲染组件时使用
config 配置面板中使用

table支持操作列
1. 使用死数据在舞台区渲染出组件的操作列
2. 确定组件的配置数据
3. 在舞台区渲染出组件
4. 配置组件的配置数据
5. 当改变配置项时更新舞台区的组件渲染效果。
6. 分别操作table组件的items、service中的tree型数据、服务端的数据。
7. 在渲染侧使用死数据渲染出table的操作列。
<!-- 8. 在渲染侧增强tree支持items[x].child<ulid>。 -->
9. 由死数据改为活数据。

#### 编辑应用
#### 编辑页面
#### 编辑组件
包括组件的props/event/plugin/slots。
1. 更新store对应组件的属性
2. 调用编辑组件的接口

#### 删除应用
#### 删除页面
#### 删除组件
#### 树型结构
使用tree的逻辑
1. 请求该页面的全量组件。
2. 再全部挂载到树上。不生成数组。
3. 以appUlid+pageUlid为key。以tree为value，建立对应关系map
4. 在setup.html中根据appUlid+pageUlid取得组件组成的数组，放在当前组件中，用于渲染组件。
5. 增加时，在数组中增加，在tree上增加。
6. 删除时，在数组中删除，在tree上删除。
7. 改变位置时，在数组中改变位置，在tree上改变位置。
8. 在父组件中根据appUlid+pageUlid+componentUlid+slots.key取得组件组成的数组subComponentList，放在当前组件中，用于渲染子组件。
9. 增加时，在subComponentList中增加，在tree上增加。
10. 删除时，在subComponentList中删除，在tree上删除。
11. 改变位置时，在subComponentList中改变位置，在tree上改变位置。
使用三缓存处理组件列表。
reqXxx 请求后端操作数据库
componentService.xxx 操作服务中的树型数据
xxxList 它是当前组件内的子组件列表。操作它改变子组件

tree的逻辑
```

      
              null
                ^
                |
          |------------|
          |            | --> null
 null <-- |    node    | --> null
          |            | ...
          |------------|                             null
               |  ^                                    ^
               V  |                                    |
          |------------|                          |------------|     
          |            | <----------------------- |            | --> null
 null <-- |    node    | -----------------------> |    node    | --> ...
          |            | --> ...                  |            |     
          |------------| <--------------------|   |------------|     
               |  ^                           |        |  ^
               |  |                           |        |  |
                ...                           |         ...
               |  |                           |        |  |
               V  |                           |        V  |
          |------------|                      |   |------------|     
          |            | --> null             |-- |            | --> null
 null <-- |    node    | --> null                 |    node    | --> ...
          |            | ...                      |            |     
          |------------|                          |------------|     
               |                                       |
               V                                       V
              null                                    null


```

### server 服务侧

#### 数据库表

##### users 用户表
|字段key|描述|||
|-|-|-|-|
|account|账号。只能是邮箱。|||
|password|密码|||
|applications|应用的ulid组成数组|||

3个开发用的用户。密码都是123456.
  123@qq.com
  kevin@163.com
  amanda@gmail.com

##### apps 应用全量表
|字段key|描述|||
|-|-|-|-|
|key|应用的key，不可改|后期可以增强为可修改的||
|name|名称|||
|ulid|惟一键|||
|theme|主题|||
|version|版本|||
|owner|拥有者|||
|members|成员。最多4个。|owner在第一个||
|firstPageUlid|第一个页面的ulid|||
|lastPageUlid|最后一个页面的ulid|待开发||
|prevUlid|前一个页面的ulid|||
|nextUlid|后一个页面的ulid|||

##### pages 页面全量表
|字段key|描述|||
|-|-|-|-|
|key|页面的key，不可改|||
|name|名称|||
|ulid|惟一键|||
|prevUlid|上一个页面的ulid|暂未使用||
|nextUlid|下一个页面的ulid|暂未使用||
|childUlid|当前页面的第一个子页面|暂未使用||
|firstComponentUlid|第一个组件的ulid|||
|appUlid|属于哪个应用|||

##### comps 组件全量表
|字段key|描述|||
|-|-|-|-|
|ulid|惟一键|||
|type|组件类型|||
|next|下一个组件的ulid|||
|prev|上一个组件的ulid|||
|props|属性|||
|behavior|行为|||
|items|条目|||
|slots|插槽|||
|appUlid|所属应用的ulid|||
|pageUlid|所属页面的ulid|||

##### appsprod 应用生产表
同 apps 应用全量表

##### pagesprod 页面生产表
同 pages 应用全量表

##### compsprod 组件生产表
同 comps 应用全量表

### renderer 渲染侧

问问后端同学实现权限的事。

#### 运行逻辑
1. 在url设置appKey/env/pageKey
2. 使用appKey+env请求应用数据，再请求页面数据。
3. 渲染页面列表
4. 使用pageUlid+env请求组件数据。
5. 渲染组件列表
6. 处理组件之间的联动
7. 在生命周期方法中执行钩子
```
在layout组件完成页面排版
使用comp/stack完成动态组件
components目录里是所有支持的组件
由源组件在指定事件时触发共享事件+传递相关数据，由目标组件接收共享事件+相关数据，再执行相关逻辑
```

行为源在xx事件时向行为目标传递xx数据。行为目标监听xx事件,接收xx数据后执行相关逻辑。

```
{
  origin // 不需要
  event: EventName,
  target: ULID,
  payload: any,
}
{
  event: {
    type: 'select',
    options: [
      {label: '单击', value: 'click'},
    ],
    value: undefined,
    label: '事件',
  },
  target: {
    type: 'input',
    value: '',
  },
  payload: {
    type: 'textarea',
    value: '',
  },
}
```

#### routes
在一个应用中，动态生成多个路由。
url通式 `http://$home:$port/$appKey/$env/$page?$qs`

##### user

users/sign
注册
post
account / password

users/logout
登出
post
带cookie

##### app
apps
查询当前用户下的所有应用
get
cookie

apps
创建应用
post
key / name / ulid / members

apps
修改应用
put

apps
删除应用
delete


##### page

pages
查询指定应用下的所有页面
get
appUlid

pages
创建页面
post
appUlid / name / key / ulid

pages
修改该页面
put
name / ulid

pages
删除该页面
delete
ulid

##### comp

components
查询指定应用下的指定页面下的所有组件
get
appUlid / pageUlid

components
在指定应用下的指定页面下创建组件
post
appUlid / pageUlid / componentInfo:{type/ulid/next/prev/props/behavior/item/slot}

components
修改指定应用下的指定页面下的指定组件
put
appUlid / pageUlid / componentUlid / componentInfo

components
删除指定组件
delete
ulid

components/reorder
重新排序组件
put
ulid / prev / next

### components 组件

### mock-server 第三方服务

### web-site 官网

## 流程图
### 注册
1. 前端提交account / password。
2. 后端散列password后写入数据库。给前端回馈code：0.
3. 前端进入应用列表页面。
   
### 登录
1. 前端提交account / password。
2. 后端散列p后比对。若一致则登录成功，否则提示失败原因，回馈前端code:非0。
3. 若成功则保存用户信息在session.user中。回馈前端code:0.
4. 以后从session.user中取当前用户信息。
5. 进入应用列表页面。否则提示失败原因。

`saveUninitialized: true`才能正常set-cookie.

```
npm i express-session
```
```js
// app.js
let session = require('express-sesssion')
app.use(session({
  secret: 'xx',
  resave: false,
  saveUninitialized: false
}))
```

### 创建应用

### title
### title
### title
### title
### title
### title

## 错误码值
详见errerCode.js文件

||||
|-|-|-|
|0|无错误||
|100000|请求参数错误||
计划每2个数字一组。三组数字分级表示错误。

## 数据结构
### 树型结构
#### 优点
- 结构整齐
#### 缺点
- 为维持结构，需要较多操作
有没有树型结构数据库

## 二级缓存
在搭建侧，常用app/page/component这三个服务。其内部使用一个变量属性缓存当前数据，一个变量缓存响应式数据。

||||
|-|-|-|
|xxx$|Subject对象|响应式|
|xxx|any对象|非响应式|

## 统一使用promise
例如：getAppList
若已经存在，则使用`Promise.resolve`返回。
否则，使用请求接口后返回。

## 发布应用
### 4种解决方法

|||||
|-|-|-|-|
|标记法|在众多应用中标明哪个应用是当前激活状态的应用。|||
|最后开口法|做完数据迁移后再最后开口。|||
|记数法|把一个大任务分为若干小任务，每个小任务计作一个步骤。每完成一个小任务，则步骤加一。|一般用于多个步骤、查询进度。||
|待做法|当做到一定阶段时做好记录和时间，然后按指定时间轮循。|一般用于清空缓存。||

## title
## title

## todo
- jwt vs. session
- express + ts

### express-session set-cookie无效 
  saveUninitialized:true可解决

  1.前后端必须要同等域名下，application才能存入cookie（如果是ng做转发应该就不存在这种必要条件吧）
2.前后端不同域下进行请求，application不能存入cookie，但是不应该后面的接口进行请求
浏览器同源策略


#### 后端 
corsOptions = {
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      allowdHeaders: ['Content-Type', 'Authorization'],
      exposedHeaders: ['Content-Type', 'X-Content-Range']
    }
#### 前端
withCredentials: true


### 验证logout.cookie是否清除。
### 应用列表
### curd app
### 如何参与开源项目
https://xbeibeix.com/video/BV1GU4y1N7eC


# todo

整理需求
  明确要做什么
  整理思路，确定实现方案
  写文档。接入api
  严格调用api


form组件
  item
    与舞台区联动
    删除
整理类型：成组的类型，配置类型&渲染类型
创建一个页面：form+table+modal
编辑组件
断网缓存
lc不做出码。出码由脚手架做。
lc不做入码。

# mock平台
# 端口
lc官网使用80端口。sso使用5020端口。服务侧使用5000端口。搭建侧使用4200。渲染则使用4210。测试端口3000

# 收获
- 项目增强的过程是迭代的过程。每次迭代都会在现有基础上统筹整体做若干调整。
- promise/数据结构/单一原则为项目做了很多贡献。

