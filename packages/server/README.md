# 接口api说明

## 概览
后端项目使用express。接口文件写在routes目录中。
主要有8个接口文件:
- indexRouter 用于测试的接口
- usersRouter 用于应用相关的接口
- appsRouter
- pagesRouter
- componentsRouter
- devRouter     开发者硬删除指定数据
- progressRouter
- pluginsRotuer
所有接口都支持options/get/post/put/delete方式请求。根据实际需要，不一定有回馈。

## indexRouter
用于测试的接口

## usersRouter
|path|method|params|data|返回值|说明|
|-|-|-|-|-|-|
|/users|||||-|
|/users/login|'post'||{ulid}||根据ulid从用户表中取出用户数据，再在session中缓存用户信息。|
|/users/sign|'post'||{account, password}||注册用户。向sso请求注册，存到用户表中。|
|/users/logout|'delete'||||登出。删除cookie，删除session中的相应数据。|
|/users/saml|'post'||{ulid}||验证ulid是否正确。更新cookie/session.|

## appsRouter
|path|method|params|data|返回值|说明|
|-|-|-|-|-|-|
|/apps|'get'|{}|||请求当前登录用户内的应用组成的列表|
|/apps|'post'||{key应用的惟一键,name应用的名称,ulid应用的ulid,prevUlid前一个应用的ulid,collaborator该应用的协作者}||创建一个应用|
|/apps|'put'||{appUlid应用的ulid,updateObj要更新的数据组成的对象}||更新应用的指定数据|
|/apps|'delete'|{envs,appUlid}|||删除当前用户的指定环境的指定应用ulid的应用|
|/apps/detail|{env,appKey}||||返回指定环境中的指定应用的数据|
|/apps/versions|'get'|{env}|||返回指定应用在4个环境中的版本号|
|/apps/versions|'put'||{appUlid,newVersion}||设置dev环境的指定应用的版本号|
|/apps/publish|'post'||{appUlid,newVersion,fromEnv,toEnv}||把应用从指定环境发布到指定环境|

## pagesRouter
|path|method|params|data|返回值|说明|
|-|-|-|-|-|-|
|/pages|'get'|{appUlid,env}|||返回指定应用在指定环境中的页面信息组成的数组|
|/pages|'post'||{key,name,ulid,appUlid}||创建页面|
|/pages|'put'||{ulid,type,key,value}||修改页面的数据|
|/pages|'delete'|{ulid}|||删除dev环境的指定页面|
|/pages/behavior|'post'||{ulid,behavior}||增加页面的行为|
|/pages/behavior|'delete'|{ulid,index}|||删除dev环境的指定页面|

## componentsRouter
|path|method|params|data|返回值|说明|
|-|-|-|-|-|-|
|/components|'get'|{pageUlid,env}|||查询指定环境的指定页面的组件|
|/components|'post'||{ulid,type,props,behavior,items,slots,mount,appUlid,pageUlid,gridLayout}||创建组件|
|/components|'put'||{ulid,type,}||更新组件|
|/components|'delete'|{ulid,childrenUlid}|||删除组件及其子组件|
|/components|'post'||{prev,ulid,type,props,behavior,item,slot,appUlid,pageUlid}||创建组件|
|/components/behavior|'post'||{ulid,value}||组件增加行为|
|/components/behavior|'delete'||{ulid,index}||删除指定组件的指定下标的行为|
|/components/items|'post'||{ulid,value}||组件增加item|
|/components/items|'put'||{ulid,index,key,value}||修改组件的item|
|/components/items|'delete'||{ulid,index}||删除组件的item|
|/components/slots|'put'||{ulid,oldSlotKey,newSlotKey}||修改组件的slot|
|/components/slots|'delete'||{ulid,slotKey}||修改组件的slot|

## devRouter
|path|method|params|data|返回值|说明|
|-|-|-|-|-|-|
|||||||

## progressRouter
|path|method|params|data|返回值|说明|
|-|-|-|-|-|-|
|||||||

## pluginsRotuer
|path|method|params|data|返回值|说明|
|-|-|-|-|-|-|
|/plugins|'get'|{key?}|||返回插件的内容|
|/plugins|'post'|{pluginFile}|||增加插件|
|/plugins/key|'get'|{key,pageSize?pageNumber?}|||查询相似key的插件key组成的数组|
|||||||
