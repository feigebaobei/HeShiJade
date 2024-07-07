# 连接云服务器
买 1cpu & 2g
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
npm i -g pm2
git clone https://github.com/feigebaobei/HeShiJade.git
npm i -g yarn
npm i -g pnpm
yarn global add pm2
cd packages/constructor
yarn
pnpm install # 在云服务器上使用pnpm安装依赖。

```shell
# 安装nginx
yum update && yum -y install nginx # 等了好长时间
# 启动nginx
systemctl start nginx
# 在浏览器打开http://<ECS公网IP地址>。若能正常访问，则nginx已经启动。
vim /etc/nginx/conf.d/app.conf
# 写入
# 示例
server {
  listen 80;
  location / {
    root /web/HeShiJade/packages/constructor/dist/constructor;
    try_files $uri $uri/ /index.html;
  }
}
# 重启nginx
nginx -s reload
```

# issue
## client_loop: send disconnect: Broken pipe
```shell
$ sudo vi /etc/ssh/sshd_config
# 设置为
ClientAliveInterval	300
ClientAliveCountMax	3
# 保存
$ sudo systemctl restart sshd
```

## ssh -p 22 root@8.222.185.99 无响应
- 可能是ip不对。
- 可能是被安全组限制。

## bundle initial exceeded maximum budget. Budget 1.00 MB was not met by 642.91 kB with a total of 1...

configuration:
production:
"budgets": [
  {
    "type": "initial",
    "maximumWarning": "2mb",
    "maximumError": "5mb"
  },
  {
    "type": "anyComponentStyle",
    "maximumWarning": "2mb",
    "maximumError": "5mb"
  }
],

# 云虚拟主机 & 轻量服务器 & ecs
|| 云虚拟主机 | 轻量服务器 | ecs|||
|-|-|-|-|-|-|
||完成网站配置等基本操作|||||
||实时数据分析的资源监控服务|||||
||管理数据库|||||
||执行主机的管理操作|||||
||应用于各种建站场景，可以简单、低成本地进行网站托管服务.常用于中小企业、个人站长、网站开发者或者学生|||||
||ftp上传网站|||||
||无法连接终端||可以选择连接终端。（可以安装进程管理工具、nginx）|||
|||ssh登录|ssh登录|||
|||成套配置||||
|||本质是ecs||||
|||个人开发者、学生。|具备一定开发技术能力的个人或企业用户|||
|||||||