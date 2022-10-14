### docker安装mongodb:4.x.x
```
docker run -d --restart=always -p 27017:27017 --name blog3mongodb -v /var/mongodb:/data/db -d mongo:4

docker exec -it (容器id) mongo admin

// 在mongo控制台输入
db.createUser({ user: 'root', pwd: '123456', roles: [ { role: "userAdminAnyDatabase", db: "admin" } ] });

```

### 安装node12.13
### 安装pm2
### 安装vue-cli
### 进入"frontEnd/blog3Beta-master"目录并用"npm i"命令下载包 
### 用"npm run build"命令构建前端
### 前端用"localhost:port"的方式访问


### 服务器配置文件是config.js

### 前端配置文件是frontEnd/blog3Beta-master/config.js

### 运行时使用 "node index.js" 或 "pm2 start index.js
