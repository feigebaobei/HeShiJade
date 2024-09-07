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
- pnpm

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