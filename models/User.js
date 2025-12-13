const { query } = require('../config/database');
const bcrypt = require('bcryptjs');

class User {
    // 创建新用户
    static async create(userData) {
        const { username, email, password } = userData;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const sql = `
            INSERT INTO users (username, email, password) 
            VALUES (?, ?, ?)
        `;
        
        try {
            const result = await query(sql, [username, email, hashedPassword]);
            return { id: result.insertId, username, email };
        } catch (error) {
            throw error;
        }
    }

    // 根据ID查找用户
    static async findById(id) {
        const sql = 'SELECT id, username, email, created_at FROM users WHERE id = ?';
        
        try {
            const users = await query(sql, [id]);
            return users[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // 根据用户名查找用户
    static async findByUsername(username) {
        const sql = 'SELECT * FROM users WHERE username = ?';
        
        try {
            const users = await query(sql, [username]);
            return users[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // 根据邮箱查找用户
    static async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = ?';
        
        try {
            const users = await query(sql, [email]);
            return users[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // 验证用户密码
    static async validatePassword(user, password) {
        return await bcrypt.compare(password, user.password);
    }

    // 获取所有用户
    static async getAll() {
        const sql = 'SELECT id, username, email, created_at FROM users ORDER BY created_at DESC';
        
        try {
            return await query(sql);
        } catch (error) {
            throw error;
        }
    }

    // 更新用户信息
    static async update(id, userData) {
        const { username, email } = userData;
        const sql = `
            UPDATE users 
            SET username = ?, email = ? 
            WHERE id = ?
        `;
        
        try {
            await query(sql, [username, email, id]);
            return await this.findById(id);
        } catch (error) {
            throw error;
        }
    }

    // 删除用户
    static async delete(id) {
        const sql = 'DELETE FROM users WHERE id = ?';
        
        try {
            const result = await query(sql, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }
}

module.exports = User;