const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { authenticateToken, generateToken } = require('../middleware/auth');

// 用户注册
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // 验证输入
        if (!username || !email || !password) {
            return res.status(400).json({ message: '用户名、邮箱和密码不能为空' });
        }

        // 检查用户是否已存在
        const existingUser = await User.findByUsername(username) || await User.findByEmail(email);
        if (existingUser) {
            return res.status(409).json({ message: '用户名或邮箱已存在' });
        }

        // 创建新用户
        const newUser = await User.create({ username, email, password });
        
        res.status(201).json({
            message: '用户注册成功',
            user: {
                id: newUser.id,
                username: newUser.username,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('注册错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 用户登录
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // 验证输入
        if (!username || !password) {
            return res.status(400).json({ message: '用户名和密码不能为空' });
        }

        // 查找用户
        const user = await User.findByUsername(username);
        if (!user) {
            return res.status(401).json({ message: '用户名或密码错误' });
        }

        // 验证密码
        const isValidPassword = await User.validatePassword(user, password);
        if (!isValidPassword) {
            return res.status(401).json({ message: '用户名或密码错误' });
        }

        // 生成JWT令牌
        const token = generateToken(user);

        res.json({
            message: '登录成功',
            token,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            }
        });
    } catch (error) {
        console.error('登录错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 获取当前用户信息
router.get('/profile', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (!user) {
            return res.status(404).json({ message: '用户不存在' });
        }

        res.json({ user });
    } catch (error) {
        console.error('获取用户信息错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 更新用户信息
router.put('/profile', authenticateToken, async (req, res) => {
    try {
        const { username, email } = req.body;
        
        // 验证输入
        if (!username || !email) {
            return res.status(400).json({ message: '用户名和邮箱不能为空' });
        }

        // 检查用户名和邮箱是否已被其他用户使用
        const existingUser = await User.findByUsername(username);
        if (existingUser && existingUser.id !== req.user.id) {
            return res.status(409).json({ message: '用户名已被使用' });
        }

        const existingEmail = await User.findByEmail(email);
        if (existingEmail && existingEmail.id !== req.user.id) {
            return res.status(409).json({ message: '邮箱已被使用' });
        }

        // 更新用户信息
        const updatedUser = await User.update(req.user.id, { username, email });

        res.json({
            message: '用户信息更新成功',
            user: updatedUser
        });
    } catch (error) {
        console.error('更新用户信息错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 获取所有用户（管理员功能）
router.get('/', authenticateToken, async (req, res) => {
    try {
        const users = await User.getAll();
        res.json({ users });
    } catch (error) {
        console.error('获取用户列表错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

module.exports = router;