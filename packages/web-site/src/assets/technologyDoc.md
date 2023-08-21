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

#### routes
||||
|-|-|-|
|login/sign|||
|list|||
|setup|url通式 `http://$home:$port/setup?app=$appUlid`||




### server 服务侧

#### 数据库表

##### users 用户表
|字段key|描述|||
|-|-|-|-|
|account|账号。只能是邮箱。|||
|password|密码|||
|applications|应用的ulid组成数组|||

##### apps 应用全量表
|字段key|描述|||
|-|-|-|-|
|key|应用的key，不可改|||
|ulid|惟一键|||
|name|名称|||
|version|版本|||
|members|成员。最多4个。|||
|theme|主题|||
|owner|拥有者|||
|page|第一个页面的ulid|||

##### pages 页面全量表
|字段key|描述|||
|-|-|-|-|
|key|页面的key，不可改|||
|name|名称|||
|ulid|惟一键|||
|next|下一个页面的ulid|暂未使用||
|prev|上一个页面的ulid|暂未使用||
|child|当前页面的第一个子页面|暂未使用||
|componentUlid|第一个组件的ulid|||
|appUlid|属于哪个应用|||

##### comps 组件全量表
|字段key|描述|||
|-|-|-|-|
|ulid|惟一键|||
|type|组件类型|||
|next|下一个组件的ulid|||
|prev|上一个组件的ulid|||
|props|属性|||
|behaivor|行为|||
|item|条目|||
|slot|内置文本|||
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

#### routes
在一个应用中，动态生成多个路由。
url通式 `http://$home:$port/$appKey/$env/$page?$qs`

##### user
users/login
登录
post
account / password


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
appUlid / pageUlid / componentInfo:{type/ulid/next/prev/props/behaivor/item/slot}

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
||||
|-|-|-|
|0|无错误||
|100000|请求参数错误||
计划每2个数字一组。三组数字分级表示错误。

||12|34|56||
|-|-|-|-|-|
||10 请求参数|01 请求参数出错|||
||20 数据库|01 插入数据时出错|||
|||02 查询时出错|||
|||03 修改时出错|||
|||04 删除时出错|||

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


验证页面的接口都没有问题了，发布dfs包.

