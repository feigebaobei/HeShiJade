||完成日期||
|-|-|-|
|icon|todo||
|设置组件列表|done||
|设置配置面板|done||
|搭建侧创建组件|done||
|搭建侧使用配置项|done||
|排查配置项不显示的问题|done||
|渲染侧创建组件|doing||
|渲染侧使用配置项|||
|整理增加组件的过程|doing||
|web-site增加能力边界导航|列出支持哪些setter|done|
|web-site增加能力增强导航|列出如何增加新组件|todo|
|整理当前支持的配置项类型|||
|删除嵌套组件时，未删除干净。|done||
|新创建的页面无法选中|done||

|增加4个组件|||
||checkbox||
||tabs||
||pagination||
|web-site|开辟周边知识储备||
|button的icon属性不生效|||
|所有组件的item是否应该有“增加一行”|||
|本次分支f_comp|||
|上生产内容|||
||增加4个组件||
||web-site|修正拼写|
||constructor|修改props样式|
||constructor|修正无法修改页面名称的问题|
||constructor|增加6个组件的配置面板 button modal form table input select|
||这次调整组件的配置项，可以达到50%。剩下的包括：优化默认值、配置面板的bug、整理适合低代码的配置、||
||mock-server|表单的提交接口|

|可能会有脏数据。写一个检查脏数据的程序，定时运行。|||
|无页面时提示创建页面|||
|无组件时提示创建组件|||
|在指定时机，如进入搭建页面时，清洗脏数据。|||
|分包|||
|舞台区使用拖动布局组件|||
|是否需要把修改service与发请求分开|分开||
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
|丰富配置面板的setter|||
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

# 增加组件的过程
## 搭建侧增加组件
1. 在组件列表中增加组件项
2. 在`constructor/src/helper/props.ts``constructor/src/helper/behavior.ts``constructor/src/helper/items.ts`设置组件的配置项props/behavior/items
3. 在`constructor/src/helper/components.ts`中引入no.2中创建的props/behavior/items设置该组件的默认值
4. 在`constructor/src/app/props/props-box/props-box.component.ts`/`constructor/src/app/behavior/behavior-box/behavior-box.component.ts`中分别引入并处理props、behavior
5. 在`constructor/src/app/components/comp-box/comp-box.component.ts`中为新组件传入数据
6. 初始化组件。在constructor目录下执行`ng g c component/newComp`
7. 注释`constructor/src/app/components/newComp/newComp.component.ts`中的`template``imports`。
8. 在`constructor/src/app/components/components.modules.ts`中引入新组件并声明。
9. 重新启动constructor项目
10. 在新组件中接收数据、处理逻辑、调整事件。
## 渲染侧增加组件
1. 在`renderer`目录下执行`ng g c components/newComp`
2. 注释`renderer/src/app/components/newComp/newComp.components.ts`中的`template``imports`。
3. 在`renderer/src/app/components/components.module.ts`引入新组件并声明
4. 在`renderer/src/app/components/stack/stack.component.ts`中引入新组件并为其传入数据
5. 重新启动renderer项目