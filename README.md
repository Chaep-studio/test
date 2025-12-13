# 云端数据管理系统

一个基于Node.js、Express和MySQL的云端数据管理平台，支持用户注册、登录和数据管理功能。

## 功能特点

- 用户注册与登录（基于JWT认证）
- 数据的创建、查看、编辑和删除
- 数据搜索功能
- 响应式Web界面
- RESTful API设计
- Docker容器化部署

## 技术栈

- 后端：Node.js、Express
- 前端：HTML、CSS、JavaScript、Bootstrap 5
- 数据库：MySQL 8.0
- 认证：JWT (JSON Web Tokens)
- 部署：Docker、Docker Compose、Nginx

## 本地开发环境设置

### 前置要求

- Node.js 18+
- MySQL 8.0
- npm 或 yarn

### 安装步骤

1. 克隆项目
```bash
git clone <repository-url>
cd test
```

2. 安装后端依赖
```bash
npm install
```

3. 安装前端依赖
```bash
cd frontend
npm install
cd ..
```

4. 配置环境变量
```bash
cp .env.example .env
```

编辑 `.env` 文件，配置数据库连接信息：
```
PORT=3000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=myapp
JWT_SECRET=your-secret-key-here
```

5. 启动MySQL数据库

6. 启动后端服务器
```bash
npm start
```
或使用开发模式（需要安装nodemon）：
```bash
npm run dev
```

7. 启动前端服务器
```bash
npm run start:frontend
```
或直接运行：
```bash
start-frontend.bat
```

8. 访问应用
打开浏览器访问 `http://localhost:8080`

### 架构说明

本项目采用前后端分离架构：
- 后端API服务器运行在端口3000
- 前端静态服务器运行在端口8080
- 前端通过API调用与后端通信

## Docker部署

### 使用Docker Compose部署

1. 确保已安装Docker和Docker Compose

2. 配置环境变量（可选）
```bash
cp .env.example .env
```

3. 构建并启动服务
```bash
docker-compose up -d
```

4. 访问应用
- HTTP: `http://localhost`
- HTTPS: `https://localhost`（如果配置了SSL证书）

### 服务说明

- **app**: Node.js应用服务器（端口3000）
- **mysql**: MySQL数据库服务器（端口3306）
- **nginx**: 反向代理服务器（端口80/443）

## API文档

### 用户认证

- `POST /api/users/register` - 用户注册
- `POST /api/users/login` - 用户登录
- `GET /api/users/profile` - 获取当前用户信息（需要认证）
- `PUT /api/users/profile` - 更新用户信息（需要认证）

### 数据管理

- `GET /api/data` - 获取所有数据
- `GET /api/data/:id` - 获取单个数据
- `POST /api/data` - 创建新数据（需要认证）
- `PUT /api/data/:id` - 更新数据（需要认证）
- `DELETE /api/data/:id` - 删除数据（需要认证）
- `GET /api/data/user/my-data` - 获取当前用户的数据（需要认证）
- `GET /api/data/search/:term` - 搜索数据

## 数据库结构

### users表
- id (INT, 主键)
- username (VARCHAR(50), 唯一)
- email (VARCHAR(100), 唯一)
- password (VARCHAR(255))
- created_at (TIMESTAMP)

### sample_data表
- id (INT, 主键)
- title (VARCHAR(255))
- description (TEXT)
- user_id (INT, 外键)
- created_at (TIMESTAMP)

## 默认账户

系统初始化后会创建一个默认管理员账户：
- 用户名：admin
- 密码：admin123

## 安全注意事项

1. 生产环境中请修改默认的JWT密钥
2. 使用强密码策略
3. 启用HTTPS（配置SSL证书）
4. 定期备份数据库
5. 限制数据库访问权限

## 故障排除

### 数据库连接失败
- 检查MySQL服务是否运行
- 验证数据库配置信息
- 确认数据库用户权限

### 应用启动失败
- 检查端口是否被占用
- 查看应用日志
- 验证环境变量配置

## 许可证

MIT License