# 使用官方的Node.js 运行时作为父镜像
FROM node:14

# 设置容器中的工作目录
WORKDIR /usr/src/app

# 复制package.json 和 package-lock.json 到工作目录
COPY package*.json ./

# 安装应用程序依赖项
RUN npm install 

# 捆绑应用程序源
COPY . .

# 公开申请运行的端口
EXPOSE 3000

# 定义运行应用程序的命令
CMD ["npm", "start"]