// 在文档加载完成后执行
document.addEventListener('DOMContentLoaded', function() {
  // 获取当前时间并显示在状态栏
  updateStatusBarTime();
  
  // 监听底部导航点击事件
  setupNavigation();
  
  // 监听表单提交事件
  setupForms();
});

// 更新状态栏时间
function updateStatusBarTime() {
  const timeElements = document.querySelectorAll('.status-bar-time');
  if (timeElements.length > 0) {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const timeString = `${hours}:${minutes}`;
    
    timeElements.forEach(el => {
      el.textContent = timeString;
    });
  }
  
  // 每分钟更新一次时间
  setTimeout(updateStatusBarTime, 60000);
}

// 设置导航点击事件
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  
  navItems.forEach(item => {
    item.addEventListener('click', function() {
      // 移除其他项的active类
      navItems.forEach(nav => nav.classList.remove('active'));
      
      // 给当前点击项添加active类
      this.classList.add('active');
      
      // 获取目标页面
      const target = this.getAttribute('data-target');
      if (target) {
        // 如果在iframe环境中，通知父页面切换页面
        if (window.parent !== window) {
          window.parent.postMessage({
            action: 'navigate',
            target: target
          }, '*');
        } else {
          // 如果是直接访问，则直接导航
          window.location.href = target;
        }
      }
    });
  });
  
  // 在主入口页面监听来自iframe的消息
  window.addEventListener('message', function(event) {
    if (event.data && event.data.action === 'navigate') {
      navigateToPage(event.data.target);
    }
  });
}

// 导航到指定页面（在index.html中使用）
function navigateToPage(pageName) {
  const iframes = document.querySelectorAll('.phone-iframe');
  const targetPage = `pages/${pageName}.html`;
  
  iframes.forEach(iframe => {
    if (iframe.src.endsWith(targetPage)) {
      iframe.style.display = 'block';
    } else {
      iframe.style.display = 'none';
    }
  });
  
  // 更新导航栏选中状态
  const navItems = document.querySelectorAll('.nav-item');
  navItems.forEach(item => {
    if (item.getAttribute('data-target') === pageName) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// 设置表单提交事件
function setupForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // 模拟表单提交
      const submitBtn = this.querySelector('[type="submit"]');
      if (submitBtn) {
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = '处理中...';
        
        // 模拟网络请求延迟
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
          
          // 根据表单的action属性决定提交后的行为
          const action = this.getAttribute('data-action');
          handleFormSubmit(this, action);
        }, 1500);
      }
    });
  });
}

// 处理表单提交后的行为
function handleFormSubmit(form, action) {
  switch(action) {
    case 'login':
      // 登录成功后导航到首页
      if (window.parent !== window) {
        window.parent.postMessage({
          action: 'navigate',
          target: 'home'
        }, '*');
      } else {
        window.location.href = 'home.html';
      }
      break;
      
    case 'service-submit':
      // 服务提交成功后显示成功消息
      showMessage('提交成功！我们将尽快处理您的申请。');
      form.reset();
      break;
      
    case 'search':
      // 搜索表单提交
      showMessage('搜索功能正在开发中...');
      break;
      
    default:
      // 默认行为，显示成功消息
      showMessage('操作成功！');
      form.reset();
  }
}

// 显示消息提示
function showMessage(message, type = 'success') {
  // 检查是否已存在消息提示
  let messageEl = document.querySelector('.message-toast');
  
  if (!messageEl) {
    // 创建新的消息提示元素
    messageEl = document.createElement('div');
    messageEl.className = 'message-toast';
    document.body.appendChild(messageEl);
  }
  
  // 设置消息类型和内容
  messageEl.className = `message-toast message-${type}`;
  messageEl.textContent = message;
  messageEl.style.display = 'block';
  
  // 2秒后自动隐藏
  setTimeout(() => {
    messageEl.style.display = 'none';
  }, 2000);
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

// 处理搜索功能
function handleSearch(input) {
  const searchTerm = input.value.trim().toLowerCase();
  showMessage(`正在搜索: ${searchTerm}`);
  
  // 可以在这里添加实际的搜索逻辑
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