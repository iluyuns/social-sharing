// X推特分享函数
function shareToX(url, text, via) {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(text);
    let v = "";
    if (via) {
        v = encodeURIComponent(via);
    }
    const shareUrl = `https://twitter.com/intent/tweet?url=${u}&text=${t}&via=${v}`;
    window.open(shareUrl, "_blank");
}

// test
// shareToX("https://example.com", "看看这个很棒的网站！", "yourusername");


// 分享到facebook 
function shareToFacebook(url, text) {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(text);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${u}&t=${t}`;
    window.open(shareUrl, "_blank");
}

// test
// shareToFacebook("https://example.com", "看看这个很棒的网站！");

// 分享到WhatsApp
function shareToWhatsApp(url, text) {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(text);
    const shareUrl = `https://wa.me/?text=${t}%20${u}`;
    window.open(shareUrl, "_blank");
}

// test
// shareToWhatsApp("https://example.com", "看看这个很棒的网站！");

// 分享到Telegram
function shareToTelegram(url, text) {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(text);
    const shareUrl = `https://t.me/share/url?url=${u}&text=${t}`;
    window.open(shareUrl, "_blank");
}

// test
// shareToTelegram("https://example.com", "看看这个很棒的网站！");

// 分享到Line
function shareToLine(url, text) {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(text);
    const shareUrl = `https://social-plugins.line.me/lineit/share?url=${u}&text=${t}`;
    window.open(shareUrl, "_blank");
}

// test
// shareToLine("https://example.com", "看看这个很棒的网站！");

// 分享到Zalo
function shareToZalo(url, text) {
    const u = encodeURIComponent(url);
    const t = encodeURIComponent(text);
    const shareUrl = `https://zalo.me/share?u=${u}&t=${t}`;
    window.open(shareUrl, "_blank");
}

// test
// shareToZalo("https://example.com", "看看这个很棒的网站！");

// 分享到Instagram
function shareToInstagram(url, text) {
    // 使用 Instagram 的 Web Share API
    if (navigator.share) {
        navigator.share({
            title: text,
            text: text,
            url: url
        }).catch(console.error);
    } else {
        // 降级方案：打开 Instagram 分享页面
        const u = encodeURIComponent(url);
        const t = encodeURIComponent(text);
        const shareUrl = `https://instagram.com/share?url=${u}&caption=${t}`;
        window.open(shareUrl, "_blank");
    }
}

// 分享到TikTok
function shareToTikTok(url, text) {
    // 使用 TikTok 的 Web Share API
    if (navigator.share) {
        navigator.share({
            title: text,
            text: text,
            url: url
        }).catch(console.error);
    } else {
        // 降级方案：打开 TikTok 分享页面
        const u = encodeURIComponent(url);
        const t = encodeURIComponent(text);
        const shareUrl = `https://www.tiktok.com/share?url=${u}&text=${t}`;
        window.open(shareUrl, "_blank");
    }
}

// 检测平台类型
function detectPlatform() {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        return 'ios';
    } else if (/android/.test(ua)) {
        return 'android';
    }
    return 'other';
}

// 使用 Web Share API 的通用分享函数
async function shareContent(title, text, url) {
    const platform = detectPlatform();
    
    // 如果是移动设备且支持 Web Share API
    if ((platform === 'ios' || platform === 'android') && navigator.share) {
        try {
            // 确保所有参数都是字符串类型
            const shareData = {
                title: String(title || ''),
                text: String(text || ''),
                url: String(url || '')
            };

            // 检查是否在安全上下文中
            if (!window.isSecureContext) {
                throw new Error('Web Share API 需要在安全上下文中使用');
            }

            // 尝试使用 Web Share API
            await navigator.share(shareData);
        } catch (error) {
            console.error('Web Share API 分享失败:', error);
            
            // 如果是 iOS 设备，尝试使用特定的分享方法
            if (platform === 'ios') {
                try {
                    // 尝试使用 iOS 特定的分享方法
                    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.share) {
                        window.webkit.messageHandlers.share.postMessage({
                            title: title,
                            text: text,
                            url: url
                        });
                        console.warn('iOS 特定分享方法成功');
                        return;
                    }
                } catch (iosError) {
                    console.error('iOS 特定分享方法失败:', iosError);
                }
            }
            
            // 如果所有方法都失败，使用降级方案
            fallbackShare(title, text, url);
        }
    } else {
        fallbackShare(title, text, url);
    }
}

// 创建原生提示组件
function createToast(message, duration = 2000) {
    // 移除已存在的提示
    const existingToast = document.querySelector('.native-toast');
    if (existingToast) {
        existingToast.remove();
    }

    // 创建提示元素
    const toast = document.createElement('div');
    toast.className = 'native-toast';
    toast.textContent = message;
    
    // 添加样式
    toast.style.cssText = `
        position: fixed;
        bottom: 20%;
        left: 50%;
        transform: translateX(-50%);
        background-color: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 14px;
        z-index: 9999;
        max-width: 80%;
        text-align: center;
        animation: fadeInOut ${duration}ms ease-in-out;
    `;

    // 添加动画样式
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInOut {
            0% { opacity: 0; transform: translate(-50%, 20px); }
            15% { opacity: 1; transform: translate(-50%, 0); }
            85% { opacity: 1; transform: translate(-50%, 0); }
            100% { opacity: 0; transform: translate(-50%, -20px); }
        }
    `;
    document.head.appendChild(style);

    // 添加到页面
    document.body.appendChild(toast);

    // 自动移除
    setTimeout(() => {
        toast.remove();
        style.remove();
    }, duration);
}

// 初始化 VConsole
function initVConsole() {
    return new Promise((resolve, reject) => {
        // 检查是否已经加载
        if (window.VConsole) {
            createVConsole();
            resolve();
            return;
        }

        // 动态加载 VConsole
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/vconsole@latest/dist/vconsole.min.js';
        script.async = true;
        script.onload = function() {
            createVConsole();
            resolve();
        };
        script.onerror = function() {
            console.error('VConsole 加载失败');
            reject(new Error('VConsole 加载失败'));
        };
        document.head.appendChild(script);
    });
}

// 创建 VConsole 实例
function createVConsole() {
    try {
        const vConsole = new window.VConsole({
            theme: 'dark',  // 设置主题，可选 'light' | 'dark'
            onReady: function() {
                console.log('VConsole 已就绪');
            }
        });
        
        // 根据环境决定是否显示 VConsole
        const isDev = window.location.hostname === 'localhost' || 
                     window.location.hostname === '127.0.0.1' ||
                     window.location.hostname.includes('dev') ||
                     window.location.hostname.includes('test');
        
        if (!isDev) {
            vConsole.hide();
        }
    } catch (error) {
        console.error('VConsole 初始化失败:', error);
    }
}

// 初始化 VConsole
initVConsole().catch(error => {
    console.error('VConsole 初始化失败:', error);
});

// 修改 fallbackShare 函数中的错误处理
function fallbackShare(title, text, url) {
    const shareText = `${title}\n${text}\n${url}`;
    
    // 创建一个临时的 textarea 元素
    const textarea = document.createElement('textarea');
    textarea.value = shareText;
    textarea.style.position = 'fixed';  // 防止页面滚动
    textarea.style.opacity = '0';       // 隐藏元素
    document.body.appendChild(textarea);
    
    try {
        // 选择文本
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        
        // 尝试使用新的 Clipboard API
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(shareText).then(() => {
                showCopySuccess();
            }).catch(() => {
                // 如果 Clipboard API 失败，回退到 document.execCommand
                document.execCommand('copy');
                showCopySuccess();
            });
        } else {
            // 使用传统的 document.execCommand 方法
            document.execCommand('copy');
            showCopySuccess();
        }
    } catch (err) {
        console.error('复制失败:', err);
        createToast('复制失败，请手动复制链接分享。');
    } finally {
        // 清理临时元素
        document.body.removeChild(textarea);
    }
}

// 显示复制成功的提示
function showCopySuccess() {
    const platform = detectPlatform();
    if (platform === 'ios') {
        createToast('内容已复制到剪贴板，请打开您想分享的应用，长按输入框选择粘贴。');
    } else if (platform === 'android') {
        createToast('内容已复制到剪贴板，请打开您想分享的应用，长按输入框选择粘贴。');
    } else {
        createToast('内容已复制到剪贴板，请手动粘贴分享。');
    }
}

// Facebook SDK 分享方法
function FacebookSDK(url, text) {
    // 检查是否已加载 Facebook SDK
    if (typeof FB === 'undefined') {
        console.error('Facebook SDK 未加载');
        // 降级到普通分享方法
        shareToFacebook(url, text);
        return;
    }

    // 使用 Facebook SDK 分享
    FB.ui({
        method: 'share',
        href: url,
        quote: text,
        hashtag: '#分享',
        mobile_iframe: true
    }, function(response) {
        if (response && response.post_id) {
            console.log('分享成功，帖子ID:', response.post_id);
            createToast('分享成功！');
        } else {
            console.log('分享取消或失败');
        }
    });
}

// 初始化 Facebook SDK
function initFacebookSDK(appId) {
    return new Promise((resolve, reject) => {
        // 检查是否已经加载
        if (window.FB) {
            resolve();
            return;
        }

        // 动态加载 Facebook SDK
        const script = document.createElement('script');
        script.src = `https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v18.0&appId=${appId}`;
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        
        script.onload = function() {
            // 初始化 Facebook SDK
            FB.init({
                appId: appId,
                cookie: true,
                xfbml: true,
                version: 'v18.0'
            });
            resolve();
        };
        
        script.onerror = function() {
            console.error('Facebook SDK 加载失败');
            reject(new Error('Facebook SDK 加载失败'));
        };
        
        document.head.appendChild(script);
    });
}

// 使用示例：
// 1. 初始化 SDK
// initFacebookSDK('你的APP_ID').then(() => {
//     console.log('Facebook SDK 初始化成功');
// }).catch(error => {
//     console.error('Facebook SDK 初始化失败:', error);
// });

// 2. 使用 SDK 分享
// FacebookSDK('https://example.com', '看看这个很棒的网站！');
