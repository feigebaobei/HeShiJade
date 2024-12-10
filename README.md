# 和氏璧
> 低代码项目

## feature
- 支持创建前端应用
- 支持生命周期插件
- 支持用户登录
- 不支持xx

## 技术栈
- angular
- dev-ui
- express(node)
- mongodb
- pnpm@9.15.x
- node@20

## 启动
```shell
# 需要启动sso服务
# 进入sso目录
# npm run dev
# 在多个终端窗口分别执行
npm run ds # 启动后端服务
npm run dc # 启动搭建侧
npm run dr # 启动渲染侧
```

## 依赖
|||||
|-|-|-|-|
|全局依赖|webpack-bundle-analyzer|||
|constructor||||
|renderer||||
|web-site||||
|server||||
|mock-server||||
|components||||


## 项目结构
```
<!-- 主要文件和目录 -->
<root>
|-- packages
    |-- components
    |-- constructor
        |-- src
            |-- app
                |-- service
                |-- setup
                |-- ad.directive.ts
                |-- app-routing.module.ts
                |-- app.component.ts
                |-- app.module.ts
                |-- item-category.diretive.ts
                |-- items.directive.ts
                |-- props.directive.ts
            |-- assets
            |-- helper
            |-- types
            |-- index.html
            |-- main.ts
            |-- styles.sass
        |-- angular.json
        |-- package.json
        |-- tsconfig.json
    |-- mock-server
    |-- renderer
    |-- serverc
    |-- web-site
|-- packages.json
|-- .npmrc
```

## 上生产过程
1. 本地打包renderer
2. 本地打包constructor
3. 把当前的开发分支f_xxx推到远端。
4. 在github上合并f_xxx到master
5. 在服务端拉取master分支
6. 重启后端服务mock-server
7. 重启后端服务server
8. 在服务端打包web-site.
