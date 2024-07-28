||完成日期||
|-|-|-|
|增加4个组件|||
||icon||
||checkbox||
||tabs||
||pagination||
|page-list组件中应该可以使用d-input-group|doing|可能重写一次这个组件就好了。|
|改变页面名称时失败了|todo||
|丰富组件的配置面板|||
|button|done||
|modal|todo||
|form|||
|table|||
|input|||
|select|||
|把lixiaodan.com的内容搬到8.222.xxx.xx上。|todo||
|button的icon属性不生效|||
|整理props面板为模块|done||
|props搞些间距，保持同行。|done||
|修正web-site中的拼写错误|done||
|本次分支f_comp|||
|上生产内容|||
|web-site|修正拼写||
|constructor|修改props样式||

|可能会有脏数据。写一个检查脏数据的程序，定时运行。|||
|无页面时提示创建页面|||
|无组件时提示创建组件|||
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
|回退功能|||
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
