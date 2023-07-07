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
|setup|||

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
|ulid|惟一键|||
|name|名称|||
|next|下一个页面的ulid|||
|prev|上一个页面的ulid|||
|component|每一个组件的ulid|||
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
url通式 `http://$home:$post/$appKey/$env/$page[]?$qs`

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

## title

## title

## title

## title

## title
