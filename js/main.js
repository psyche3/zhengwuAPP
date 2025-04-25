// 已实现的页面列表
const implementedPages = ['home', 'myaffairs', 'message', 'mine', 'services'];

// 页面加载时初始化
document.addEventListener('DOMContentLoaded', function() {
    // 更新状态栏时间
    updateStatusBarTime();
    setInterval(updateStatusBarTime, 60000); // 每分钟更新一次
    
    // 设置底部导航
    setupNavigation();
    
    // 设置服务项点击事件
    setupServiceItems();
    
    // 设置待办项点击事件
    setupTodoItems();
    
    // 设置欢迎卡片点击事件
    setupWelcomeCard();
    
    // 设置新闻条目点击事件
    setupNewsItems();
    
    // 搜索框回车事件
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch(this);
            }
        });
    }
});

// 更新状态栏时间
function updateStatusBarTime() {
    const timeElement = document.querySelector('.status-bar-time');
    if (timeElement) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        timeElement.textContent = `${hours}:${minutes}`;
    }
}

// 设置底部导航
function setupNavigation() {
    const navItems = document.querySelectorAll('.bottom-nav .nav-item');
    const currentPage = getCurrentPage();
    
    navItems.forEach(item => {
        const targetPage = item.getAttribute('data-target');
        
        // 设置当前页面的导航项为激活状态
        if (targetPage === currentPage) {
            item.classList.add('active');
        } else {
            item.classList.remove('active');
        }
        
        // 添加点击事件
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            
            // 如果点击当前页面的导航项，不进行跳转
            if (target === currentPage) {
                return;
            }
            
            // 检查页面是否已实现
            if (implementedPages.includes(target)) {
                navigateTo(target);
            } else {
                showMessage('该功能正在开发中，敬请期待！', 'info');
            }
        });
    });
}

// 设置服务项点击事件
function setupServiceItems() {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (implementedPages.includes(target)) {
                navigateTo(target);
            } else {
                showMessage('该功能正在开发中，敬请期待！', 'info');
            }
        });
    });
}

// 设置待办项点击事件
function setupTodoItems() {
    const todoItems = document.querySelectorAll('.todo-item');
    todoItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (implementedPages.includes(target)) {
                navigateTo(target);
            } else {
                showMessage('该功能正在开发中，敬请期待！', 'info');
            }
        });
    });
}

// 设置欢迎卡片点击事件
function setupWelcomeCard() {
    const welcomeCard = document.querySelector('.welcome-card');
    if (welcomeCard) {
        welcomeCard.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (implementedPages.includes(target)) {
                navigateTo(target);
            } else {
                showMessage('该功能正在开发中，敬请期待！', 'info');
            }
        });
    }
}

// 设置新闻条目点击事件
function setupNewsItems() {
    const newsItems = document.querySelectorAll('.news-item');
    newsItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            if (implementedPages.includes(target)) {
                navigateTo(target);
            } else {
                showMessage('该功能正在开发中，敬请期待！', 'info');
            }
        });
    });
}

// 获取当前页面名称
function getCurrentPage() {
    const path = window.location.pathname;
    const pageName = path.split('/').pop().replace('.html', '');
    return pageName || 'home';
}

// 页面导航
function navigateTo(pageName) {
    if (!implementedPages.includes(pageName)) {
        showMessage('该页面正在开发中，敬请期待！', 'info');
        return;
    }
    
    try {
        window.location.href = `${pageName}.html`;
    } catch (error) {
        console.error('导航错误:', error);
        showMessage('页面跳转发生错误，请稍后再试', 'error');
    }
}

// 处理搜索
function handleSearch(input) {
    const searchText = input.value.trim();
    if (searchText) {
        showMessage(`搜索: ${searchText}，搜索功能正在开发中`, 'info');
        input.value = '';
    }
}

// 显示消息提示
function showMessage(message, type = 'info') {
    // 先移除可能存在的消息
    const existingMessage = document.querySelector('.message-toast');
    if (existingMessage) {
        document.body.removeChild(existingMessage);
    }
    
    // 创建新消息
    const toast = document.createElement('div');
    toast.className = `message-toast message-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // 显示消息
    setTimeout(() => {
        toast.style.display = 'block';
        toast.style.opacity = '1';
    }, 10);
    
    // 自动隐藏
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => {
            if (toast.parentNode) {
                document.body.removeChild(toast);
            }
        }, 300);
    }, 3000);
}

// 标签页切换功能
function switchTab(element, tabName) {
    // 移除所有标签的active类
    const tabs = element.parentElement.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));
    
    // 添加active类到当前点击的标签
    element.classList.add('active');
    
    // 隐藏所有内容区域
    const tabContents = document.querySelectorAll('.tab-content');
    tabContents.forEach(content => {
        content.style.display = 'none';
    });
    
    // 显示对应的内容区域
    const targetContent = document.getElementById(`${tabName}-content`);
    if (targetContent) {
        targetContent.style.display = 'block';
    }
}

// 验证码倒计时功能
function startCountdown(button) {
    let seconds = 60;
    const originalText = button.textContent;
    button.disabled = true;
    
    function updateButton() {
        if (seconds > 0) {
            button.textContent = `重新获取(${seconds}s)`;
            seconds--;
            setTimeout(updateButton, 1000);
        } else {
            button.textContent = originalText;
            button.disabled = false;
        }
    }
    
    updateButton();
} 