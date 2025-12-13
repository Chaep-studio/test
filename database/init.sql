-- 初始化数据库脚本

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_username (username),
    INDEX idx_email (email)
);

-- 创建示例数据表
CREATE TABLE IF NOT EXISTS sample_data (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    user_id INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_title (title),
    INDEX idx_created_at (created_at)
);

-- 插入示例管理员用户（密码：admin123）
INSERT IGNORE INTO users (id, username, email, password) 
VALUES (1, 'admin', 'admin@example.com', '$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');

-- 插入一些示例数据
INSERT IGNORE INTO sample_data (id, title, description, user_id) VALUES
(1, '欢迎使用云端数据管理系统', '这是一个示例数据，展示了系统的基本功能', 1),
(2, '数据安全', '所有数据都存储在安全的云端数据库中，采用加密传输', 1),
(3, 'RESTful API', '系统提供完整的RESTful API，支持CRUD操作', 1);