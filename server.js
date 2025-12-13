const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { testConnection, initDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
// 允许的域名列表，添加你的前端服务器域名
        const allowedOrigins = [
            'http://localhost:8080',  // 本地前端开发服务器
            'https://vibegood.zeabur.app',  // 你的前端服务器域名
            'http://vibegood.zeabur.app',   // 你的前端服务器域名（HTTP版本）
            'https://vibegood.zeabur.com',  // 备用域名
            'http://vibegood.zeabur.com'    // 备用域名（HTTP版本）
        ];
        
        app.use(cors({
            origin: function (origin, callback) {
                // 允许没有origin的请求（如移动应用或Postman）
                if (!origin) return callback(null, true);
                
                if (allowedOrigins.indexOf(origin) !== -1) {
                    callback(null, true);
                } else {
                    callback(new Error('不被CORS策略允许'));
                }
            },
            credentials: true
        }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 导入路由
const userRoutes = require('./routes/users');
const dataRoutes = require('./routes/data');

// 使用路由
app.use('/api/users', userRoutes);
app.use('/api/data', dataRoutes);

// API根路径
app.get('/api', (req, res) => {
    res.json({ 
        message: '云端数据管理系统API',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            data: '/api/data'
        }
    });
});

// 错误处理中间件
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: '服务器内部错误' });
});

// 404处理
app.use((req, res) => {
    res.status(404).json({ message: '路由不存在' });
});

// 启动服务器
app.listen(PORT, async () => {
    console.log(`服务器运行在端口 ${PORT}`);
    console.log(`访问地址: http://localhost:${PORT}`);
    
    // 测试数据库连接并初始化
    try {
        await testConnection();
        await initDatabase();
    } catch (error) {
        console.error('数据库初始化失败:', error);
    }
});