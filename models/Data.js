const { query } = require('../config/database');

class Data {
    // 创建新数据
    static async create(dataData) {
        const { title, description, user_id } = dataData;
        
        const sql = `
            INSERT INTO sample_data (title, description, user_id) 
            VALUES (?, ?, ?)
        `;
        
        try {
            const result = await query(sql, [title, description, user_id]);
            return { id: result.insertId, title, description, user_id };
        } catch (error) {
            throw error;
        }
    }

    // 根据ID获取数据
    static async findById(id) {
        const sql = `
            SELECT d.*, u.username 
            FROM sample_data d 
            LEFT JOIN users u ON d.user_id = u.id 
            WHERE d.id = ?
        `;
        
        try {
            const data = await query(sql, [id]);
            return data[0] || null;
        } catch (error) {
            throw error;
        }
    }

    // 获取所有数据
    static async getAll() {
        const sql = `
            SELECT d.*, u.username 
            FROM sample_data d 
            LEFT JOIN users u ON d.user_id = u.id 
            ORDER BY d.created_at DESC
        `;
        
        try {
            return await query(sql);
        } catch (error) {
            throw error;
        }
    }

    // 根据用户ID获取数据
    static async getByUserId(userId) {
        const sql = `
            SELECT d.*, u.username 
            FROM sample_data d 
            LEFT JOIN users u ON d.user_id = u.id 
            WHERE d.user_id = ? 
            ORDER BY d.created_at DESC
        `;
        
        try {
            return await query(sql, [userId]);
        } catch (error) {
            throw error;
        }
    }

    // 更新数据
    static async update(id, dataData) {
        const { title, description } = dataData;
        const sql = `
            UPDATE sample_data 
            SET title = ?, description = ? 
            WHERE id = ?
        `;
        
        try {
            await query(sql, [title, description, id]);
            return await this.findById(id);
        } catch (error) {
            throw error;
        }
    }

    // 删除数据
    static async delete(id) {
        const sql = 'DELETE FROM sample_data WHERE id = ?';
        
        try {
            const result = await query(sql, [id]);
            return result.affectedRows > 0;
        } catch (error) {
            throw error;
        }
    }

    // 搜索数据
    static async search(searchTerm) {
        const sql = `
            SELECT d.*, u.username 
            FROM sample_data d 
            LEFT JOIN users u ON d.user_id = u.id 
            WHERE d.title LIKE ? OR d.description LIKE ? 
            ORDER BY d.created_at DESC
        `;
        
        try {
            const likeTerm = `%${searchTerm}%`;
            return await query(sql, [likeTerm, likeTerm]);
        } catch (error) {
            throw error;
        }
    }
}

module.exports = Data;