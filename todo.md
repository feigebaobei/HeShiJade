||完成日期||
|-|-|-|
|改变button的类型时未调用接口|||
|上生产|||
|买服务器|||
|部署|||
|删除login里的默认数据|||
|验证注册用户、创建（应用、页面、组件）、发布、浏览|||
|在生产环境验证使用过程，创建一个基本的查询页面。|||
|f_prod|||

|舞台区使用拖动布局组件|||
|整理props面板|||
|是否需要把修改service与发请求分开|分开||
|丰富组件|||
|回退功能|||
|“注销用户”功能|||
|核验idp提供的token|||
|验证saml数据是否有效|||
|sso官网（包括：使用方法）计划使用react 19|||
|lc官网（包括：使用方法）计划使用angular|||
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

# 收获
- 项目增强的过程是迭代的过程。每次迭代都会在现有基础上统筹整体做若干调整。
- promise/数据结构/单一原则为项目做了很多贡献。

# 连接云服务器
买1vcpu&1g
```shell
ssh -p 22 root@8.222.185.99
在控制台创建“安全组”
yum install git -y
git -v
# 若看到版本号，则证明安装成功。
# 安装nvm
git clone https://gitee.com/mirrors/nvm.git ~/.nvm && cd ~/.nvm && git checkout `git describe --abbrev=0 --tags`
# 配置环境变量
echo ". ~/.nvm/nvm.sh" >> /etc/profile
source /etc/profile
# 改变npm源为阿里的，也可以不做。
export NVM_NODEJS_ORG_MIRROR=https://npmmirror.com/mirrors/node
# 查看远端node版本
nvm list-remote
nvm install v20.14.0 # 可安装多个
# nvm use v18.20.0 # 可切换
touch example.js
vim example.js
# 键入以下内容 start
const http = require('http');
const hostname = '0.0.0.0';
const port = 3000;
const server = http.createServer((req, res) => { 
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
}); 
server.listen(port, hostname, () => { 
    console.log(`Server running at http://${hostname}:${port}/`);
});
# 键入以下内容 end
# 保存并退出
node example.js & netstat -tpln # 列入系统已在监听的端口信息。
# 在浏览器中访问 http://<公网ip>:3000
```



client_loop: send disconnect: Broken pipe