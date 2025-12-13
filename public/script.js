// 全局变量
let currentUser = null;
let authToken = null;

// DOM元素
const homeContent = document.getElementById('home-content');
const dataContent = document.getElementById('data-content');
const myDataContent = document.getElementById('my-data-content');
const authButtons = document.getElementById('auth-buttons');
const userInfo = document.getElementById('user-info');
const usernameDisplay = document.getElementById('username-display');

// 导航链接
const homeLink = document.getElementById('home-link');
const dataLink = document.getElementById('data-link');
const myDataLink = document.getElementById('my-data-link');

// 模态框
const loginModal = new bootstrap.Modal(document.getElementById('loginModal'));
const registerModal = new bootstrap.Modal(document.getElementById('registerModal'));
const addDataModal = new bootstrap.Modal(document.getElementById('addDataModal'));

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 检查本地存储中的认证信息
    const savedToken = localStorage.getItem('authToken');
    const savedUser = localStorage.getItem('currentUser');
    
    if (savedToken && savedUser) {
        authToken = savedToken;
        currentUser = JSON.parse(savedUser);
        updateUIForAuthenticatedUser();
    }

    // 设置事件监听器
    setupEventListeners();
});

// 设置事件监听器
function setupEventListeners() {
    // 导航链接
    homeLink.addEventListener('click', () => showSection('home'));
    dataLink.addEventListener('click', () => showSection('data'));
    myDataLink.addEventListener('click', () => showSection('my-data'));

    // 登录表单
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // 注册表单
    document.getElementById('register-form').addEventListener('submit', handleRegister);
    
    // 数据表单
    document.getElementById('data-form').addEventListener('submit', handleDataSubmit);
    
    // 搜索按钮
    document.getElementById('search-btn').addEventListener('click', handleSearch);
    
    // 退出按钮
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
    
    // 添加数据按钮
    document.getElementById('add-data-btn').addEventListener('click', resetDataForm);
}

// 显示不同的内容区域
function showSection(section) {
    // 隐藏所有内容区域
    homeContent.classList.add('d-none');
    dataContent.classList.add('d-none');
    myDataContent.classList.add('d-none');
    
    // 移除所有导航链接的active类
    homeLink.classList.remove('active');
    dataLink.classList.remove('active');
    myDataLink.classList.remove('active');
    
    // 显示选中的内容区域
    switch(section) {
        case 'home':
            homeContent.classList.remove('d-none');
            homeLink.classList.add('active');
            break;
        case 'data':
            dataContent.classList.remove('d-none');
            dataLink.classList.add('active');
            loadData();
            break;
        case 'my-data':
            if (!currentUser) {
                showToast('请先登录', 'error');
                showSection('home');
                return;
            }
            myDataContent.classList.remove('d-none');
            myDataLink.classList.add('active');
            loadMyData();
            break;
    }
}

// 处理用户登录
async function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    const errorDiv = document.getElementById('login-error');
    
    try {
        const response = await fetch('/api/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // 保存认证信息
            authToken = data.token;
            currentUser = data.user;
            
            localStorage.setItem('authToken', authToken);
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            // 更新UI
            updateUIForAuthenticatedUser();
            
            // 关闭模态框
            loginModal.hide();
            
            // 清空表单
            document.getElementById('login-form').reset();
            
            showToast('登录成功', 'success');
        } else {
            errorDiv.textContent = data.message;
            errorDiv.classList.remove('d-none');
        }
    } catch (error) {
        console.error('登录错误:', error);
        errorDiv.textContent = '登录失败，请稍后重试';
        errorDiv.classList.remove('d-none');
    }
}

// 处理用户注册
async function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('register-username').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    const errorDiv = document.getElementById('register-error');
    
    // 验证密码
    if (password !== confirmPassword) {
        errorDiv.textContent = '两次输入的密码不一致';
        errorDiv.classList.remove('d-none');
        return;
    }
    
    try {
        const response = await fetch('/api/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // 关闭注册模态框，打开登录模态框
            registerModal.hide();
            document.getElementById('register-form').reset();
            
            showToast('注册成功，请登录', 'success');
            
            // 延迟打开登录模态框
            setTimeout(() => {
                loginModal.show();
            }, 500);
        } else {
            errorDiv.textContent = data.message;
            errorDiv.classList.remove('d-none');
        }
    } catch (error) {
        console.error('注册错误:', error);
        errorDiv.textContent = '注册失败，请稍后重试';
        errorDiv.classList.remove('d-none');
    }
}

// 处理用户退出
function handleLogout() {
    // 清除本地存储
    localStorage.removeItem('authToken');
    localStorage.removeItem('currentUser');
    
    // 清除全局变量
    authToken = null;
    currentUser = null;
    
    // 更新UI
    updateUIForUnauthenticatedUser();
    
    // 显示首页
    showSection('home');
    
    showToast('已退出登录', 'success');
}

// 更新已认证用户的UI
function updateUIForAuthenticatedUser() {
    authButtons.classList.add('d-none');
    userInfo.classList.remove('d-none');
    usernameDisplay.textContent = currentUser.username;
    myDataLink.classList.remove('d-none');
}

// 更新未认证用户的UI
function updateUIForUnauthenticatedUser() {
    authButtons.classList.remove('d-none');
    userInfo.classList.add('d-none');
    myDataLink.classList.add('d-none');
}

// 加载数据列表
async function loadData() {
    try {
        const response = await fetch('/api/data');
        const data = await response.json();
        
        if (response.ok) {
            renderDataTable(data.data);
        } else {
            showToast('加载数据失败', 'error');
        }
    } catch (error) {
        console.error('加载数据错误:', error);
        showToast('加载数据失败', 'error');
    }
}

// 加载当前用户的数据
async function loadMyData() {
    try {
        const response = await fetch('/api/data/user/my-data', {
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        const data = await response.json();
        
        if (response.ok) {
            renderMyDataTable(data.data);
        } else {
            showToast('加载我的数据失败', 'error');
        }
    } catch (error) {
        console.error('加载我的数据错误:', error);
        showToast('加载我的数据失败', 'error');
    }
}

// 渲染数据表格
function renderDataTable(data) {
    const tableBody = document.getElementById('data-table-body');
    const noDataMessage = document.getElementById('no-data-message');
    
    if (data.length === 0) {
        tableBody.innerHTML = '';
        noDataMessage.classList.remove('d-none');
        return;
    }
    
    noDataMessage.classList.add('d-none');
    
    tableBody.innerHTML = data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.description || '-'}</td>
            <td>${item.username || '-'}</td>
            <td>${new Date(item.created_at).toLocaleString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-info" onclick="viewData(${item.id})">查看</button>
                    ${currentUser && item.user_id === currentUser.id ? `
                        <button class="btn btn-sm btn-warning" onclick="editData(${item.id})">编辑</button>
                        <button class="btn btn-sm btn-danger" onclick="deleteData(${item.id})">删除</button>
                    ` : ''}
                </div>
            </td>
        </tr>
    `).join('');
}

// 渲染我的数据表格
function renderMyDataTable(data) {
    const tableBody = document.getElementById('my-data-table-body');
    
    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="5" class="text-center py-4">
                    <p class="text-muted mb-0">暂无数据，点击"添加数据"创建您的第一条数据</p>
                </td>
            </tr>
        `;
        return;
    }
    
    tableBody.innerHTML = data.map(item => `
        <tr>
            <td>${item.id}</td>
            <td>${item.title}</td>
            <td>${item.description || '-'}</td>
            <td>${new Date(item.created_at).toLocaleString()}</td>
            <td>
                <div class="action-buttons">
                    <button class="btn btn-sm btn-info" onclick="viewData(${item.id})">查看</button>
                    <button class="btn btn-sm btn-warning" onclick="editData(${item.id})">编辑</button>
                    <button class="btn btn-sm btn-danger" onclick="deleteData(${item.id})">删除</button>
                </div>
            </td>
        </tr>
    `).join('');
}

// 查看数据详情
async function viewData(id) {
    try {
        const response = await fetch(`/api/data/${id}`);
        const data = await response.json();
        
        if (response.ok) {
            const item = data.data;
            alert(`数据详情：\n\n标题：${item.title}\n描述：${item.description || '无'}\n创建者：${item.username || '未知'}\n创建时间：${new Date(item.created_at).toLocaleString()}`);
        } else {
            showToast('获取数据详情失败', 'error');
        }
    } catch (error) {
        console.error('获取数据详情错误:', error);
        showToast('获取数据详情失败', 'error');
    }
}

// 编辑数据
async function editData(id) {
    try {
        const response = await fetch(`/api/data/${id}`);
        const data = await response.json();
        
        if (response.ok) {
            const item = data.data;
            
            // 填充表单
            document.getElementById('data-id').value = item.id;
            document.getElementById('data-title').value = item.title;
            document.getElementById('data-description').value = item.description || '';
            
            // 更新模态框标题
            document.getElementById('data-modal-title').textContent = '编辑数据';
            
            // 显示模态框
            addDataModal.show();
        } else {
            showToast('获取数据失败', 'error');
        }
    } catch (error) {
        console.error('获取数据错误:', error);
        showToast('获取数据失败', 'error');
    }
}

// 删除数据
async function deleteData(id) {
    if (!confirm('确定要删除这条数据吗？')) {
        return;
    }
    
    try {
        const response = await fetch(`/api/data/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${authToken}`
            }
        });
        
        if (response.ok) {
            showToast('数据删除成功', 'success');
            
            // 重新加载数据
            if (!myDataContent.classList.contains('d-none')) {
                loadMyData();
            } else {
                loadData();
            }
        } else {
            const data = await response.json();
            showToast(data.message || '删除数据失败', 'error');
        }
    } catch (error) {
        console.error('删除数据错误:', error);
        showToast('删除数据失败', 'error');
    }
}

// 处理数据表单提交
async function handleDataSubmit(event) {
    event.preventDefault();
    
    const id = document.getElementById('data-id').value;
    const title = document.getElementById('data-title').value;
    const description = document.getElementById('data-description').value;
    const errorDiv = document.getElementById('data-error');
    
    const isEdit = id !== '';
    const url = isEdit ? `/api/data/${id}` : '/api/data';
    const method = isEdit ? 'PUT' : 'POST';
    
    try {
        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify({ title, description })
        });
        
        const data = await response.json();
        
        if (response.ok) {
            // 关闭模态框
            addDataModal.hide();
            
            // 清空表单
            resetDataForm();
            
            // 显示成功消息
            showToast(isEdit ? '数据更新成功' : '数据添加成功', 'success');
            
            // 重新加载数据
            if (!myDataContent.classList.contains('d-none')) {
                loadMyData();
            } else {
                loadData();
            }
        } else {
            errorDiv.textContent = data.message;
            errorDiv.classList.remove('d-none');
        }
    } catch (error) {
        console.error('保存数据错误:', error);
        errorDiv.textContent = '保存数据失败，请稍后重试';
        errorDiv.classList.remove('d-none');
    }
}

// 重置数据表单
function resetDataForm() {
    document.getElementById('data-form').reset();
    document.getElementById('data-id').value = '';
    document.getElementById('data-modal-title').textContent = '添加数据';
    document.getElementById('data-error').classList.add('d-none');
}

// 处理搜索
async function handleSearch() {
    const searchTerm = document.getElementById('search-input').value.trim();
    
    if (!searchTerm) {
        loadData();
        return;
    }
    
    try {
        const response = await fetch(`/api/data/search/${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        
        if (response.ok) {
            renderDataTable(data.data);
        } else {
            showToast('搜索失败', 'error');
        }
    } catch (error) {
        console.error('搜索错误:', error);
        showToast('搜索失败', 'error');
    }
}

// 显示提示消息
function showToast(message, type = 'success') {
    const toastContainer = document.getElementById('toast-container');
    const toastId = 'toast-' + Date.now();
    
    const toastHTML = `
        <div id="${toastId}" class="toast toast-${type}" role="alert">
            <div class="toast-header">
                <strong class="me-auto">${type === 'success' ? '成功' : '错误'}</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHTML);
    
    const toastElement = document.getElementById(toastId);
    const toast = new bootstrap.Toast(toastElement);
    
    toast.show();
    
    // 自动移除toast元素
    toastElement.addEventListener('hidden.bs.toast', () => {
        toastElement.remove();
    });
}