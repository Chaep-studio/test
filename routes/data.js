const express = require('express');
const router = express.Router();
const Data = require('../models/Data');
const { authenticateToken } = require('../middleware/auth');

// 获取所有数据
router.get('/', async (req, res) => {
    try {
        const data = await Data.getAll();
        res.json({ data });
    } catch (error) {
        console.error('获取数据错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 根据ID获取单个数据
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const data = await Data.findById(id);
        
        if (!data) {
            return res.status(404).json({ message: '数据不存在' });
        }

        res.json({ data });
    } catch (error) {
        console.error('获取数据详情错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 创建新数据（需要认证）
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, description } = req.body;
        
        // 验证输入
        if (!title) {
            return res.status(400).json({ message: '标题不能为空' });
        }

        // 创建数据
        const newData = await Data.create({
            title,
            description,
            user_id: req.user.id
        });

        res.status(201).json({
            message: '数据创建成功',
            data: newData
        });
    } catch (error) {
        console.error('创建数据错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 更新数据（需要认证）
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        const { title, description } = req.body;

        // 验证输入
        if (!title) {
            return res.status(400).json({ message: '标题不能为空' });
        }

        // 首先获取原始数据以验证权限
        const originalData = await Data.findById(id);
        if (!originalData) {
            return res.status(404).json({ message: '数据不存在' });
        }

        // 检查用户是否有权限更新此数据
        if (originalData.user_id !== req.user.id) {
            return res.status(403).json({ message: '没有权限修改此数据' });
        }

        // 更新数据
        const updatedData = await Data.update(id, { title, description });

        res.json({
            message: '数据更新成功',
            data: updatedData
        });
    } catch (error) {
        console.error('更新数据错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 删除数据（需要认证）
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;

        // 首先获取数据以验证权限
        const data = await Data.findById(id);
        if (!data) {
            return res.status(404).json({ message: '数据不存在' });
        }

        // 检查用户是否有权限删除此数据
        if (data.user_id !== req.user.id) {
            return res.status(403).json({ message: '没有权限删除此数据' });
        }

        // 删除数据
        const deleted = await Data.delete(id);
        
        if (deleted) {
            res.json({ message: '数据删除成功' });
        } else {
            res.status(500).json({ message: '删除数据失败' });
        }
    } catch (error) {
        console.error('删除数据错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 获取当前用户的数据
router.get('/user/my-data', authenticateToken, async (req, res) => {
    try {
        const data = await Data.getByUserId(req.user.id);
        res.json({ data });
    } catch (error) {
        console.error('获取用户数据错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

// 搜索数据
router.get('/search/:term', async (req, res) => {
    try {
        const { term } = req.params;
        
        if (!term || term.trim() === '') {
            return res.status(400).json({ message: '搜索词不能为空' });
        }

        const data = await Data.search(term.trim());
        res.json({ data });
    } catch (error) {
        console.error('搜索数据错误:', error);
        res.status(500).json({ message: '服务器内部错误' });
    }
});

module.exports = router;