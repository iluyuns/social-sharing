// Types
export interface ShareOptions {
    url: string;
    text: string;
    via?: string;
}

export interface ShareData {
    title: string;
    text: string;
    url: string;
}

export type Platform = 'ios' | 'android' | 'other';

// X推特分享函数
export function shareToX(options: ShareOptions): void {
    const u = encodeURIComponent(options.url);
    const t = encodeURIComponent(options.text);
    const v = options.via ? encodeURIComponent(options.via) : '';
    const shareUrl = `https://twitter.com/intent/tweet?url=${u}&text=${t}&via=${v}`;
    window.open(shareUrl, "_blank");
}

// 分享到facebook 
export function shareToFacebook(options: ShareOptions): void {
    const u = encodeURIComponent(options.url);
    const t = encodeURIComponent(options.text);
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${u}&t=${t}`;
    window.open(shareUrl, "_blank");
}

// 分享到WhatsApp
export function shareToWhatsApp(options: ShareOptions): void {
    const u = encodeURIComponent(options.url);
    const t = encodeURIComponent(options.text);
    const shareUrl = `https://wa.me/?text=${t}%20${u}`;
    window.open(shareUrl, "_blank");
}

// 分享到Telegram
export function shareToTelegram(options: ShareOptions): void {
    const u = encodeURIComponent(options.url);
    const t = encodeURIComponent(options.text);
    const shareUrl = `https://t.me/share/url?url=${u}&text=${t}`;
    window.open(shareUrl, "_blank");
}

// 分享到Line
export function shareToLine(options: ShareOptions): void {
    const u = encodeURIComponent(options.url);
    const t = encodeURIComponent(options.text);
    const shareUrl = `https://social-plugins.line.me/lineit/share?url=${u}&text=${t}`;
    window.open(shareUrl, "_blank");
}

// 分享到Zalo
export function shareToZalo(options: ShareOptions): void {
    const u = encodeURIComponent(options.url);
    const t = encodeURIComponent(options.text);
    const shareUrl = `https://zalo.me/share?u=${u}&t=${t}`;
    window.open(shareUrl, "_blank");
}

// 分享到Instagram
export function shareToInstagram(options: ShareOptions): void {
    if (navigator.share) {
        navigator.share({
            title: options.text,
            text: options.text,
            url: options.url
        }).catch(console.error);
    } else {
        const u = encodeURIComponent(options.url);
        const t = encodeURIComponent(options.text);
        const shareUrl = `https://instagram.com/share?url=${u}&caption=${t}`;
        window.open(shareUrl, "_blank");
    }
}

// 分享到TikTok
export function shareToTikTok(options: ShareOptions): void {
    if (navigator.share) {
        navigator.share({
            title: options.text,
            text: options.text,
            url: options.url
        }).catch(console.error);
    } else {
        const u = encodeURIComponent(options.url);
        const t = encodeURIComponent(options.text);
        const shareUrl = `https://www.tiktok.com/share?url=${u}&text=${t}`;
        window.open(shareUrl, "_blank");
    }
}

// 检测平台类型
export function detectPlatform(): Platform {
    const ua = navigator.userAgent.toLowerCase();
    if (/iphone|ipad|ipod/.test(ua)) {
        return 'ios';
    } else if (/android/.test(ua)) {
        return 'android';
    }
    return 'other';
}

// 创建原生提示组件
export function createToast(message: string, duration: number = 2000): void {
    const existingToast = document.querySelector('.native-toast');
    if (existingToast) {
        existingToast.remove();
    }

    const toast = document.createElement('div');
    toast.className = 'native-toast';
    toast.textContent = message;
    
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

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.remove();
        style.remove();
    }, duration);
}

// 使用 Web Share API 的通用分享函数
export async function shareContent(shareData: ShareData): Promise<void> {
    const platform = detectPlatform();
    
    if ((platform === 'ios' || platform === 'android') && navigator.share) {
        try {
            const data = {
                title: String(shareData.title || ''),
                text: String(shareData.text || ''),
                url: String(shareData.url || '')
            };

            if (!window.isSecureContext) {
                throw new Error('Web Share API 需要在安全上下文中使用');
            }

            await navigator.share(data);
        } catch (error) {
            console.error('Web Share API 分享失败:', error);
            
            if (platform === 'ios') {
                try {
                    if (window.webkit && window.webkit.messageHandlers && window.webkit.messageHandlers.share) {
                        window.webkit.messageHandlers.share.postMessage({
                            title: shareData.title,
                            text: shareData.text,
                            url: shareData.url
                        });
                        console.warn('iOS 特定分享方法成功');
                        return;
                    }
                } catch (iosError) {
                    console.error('iOS 特定分享方法失败:', iosError);
                }
            }
            
            fallbackShare(shareData);
        }
    } else {
        fallbackShare(shareData);
    }
}

// 降级分享方法
function fallbackShare(shareData: ShareData): void {
    const shareText = `${shareData.title}\n${shareData.text}\n${shareData.url}`;
    
    const textarea = document.createElement('textarea');
    textarea.value = shareText;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    
    try {
        textarea.select();
        textarea.setSelectionRange(0, textarea.value.length);
        
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(shareText).then(() => {
                showCopySuccess();
            }).catch(() => {
                document.execCommand('copy');
                showCopySuccess();
            });
        } else {
            document.execCommand('copy');
            showCopySuccess();
        }
    } catch (err) {
        console.error('复制失败:', err);
        createToast('复制失败，请手动复制链接分享。');
    } finally {
        document.body.removeChild(textarea);
    }
}

// 显示复制成功的提示
function showCopySuccess(): void {
    const platform = detectPlatform();
    if (platform === 'ios' || platform === 'android') {
        createToast('内容已复制到剪贴板，请打开您想分享的应用，长按输入框选择粘贴。');
    } else {
        createToast('内容已复制到剪贴板，请手动粘贴分享。');
    }
}

// Facebook SDK 相关类型
declare global {
    interface Window {
        FB?: {
            ui: (options: any, callback: (response: any) => void) => void;
            init: (options: any) => void;
        };
        webkit?: {
            messageHandlers?: {
                share?: {
                    postMessage: (data: any) => void;
                };
            };
        };
    }
}

// Facebook SDK 分享方法
export function FacebookSDK(options: ShareOptions): void {
    if (typeof window.FB === 'undefined') {
        console.error('Facebook SDK 未加载');
        shareToFacebook(options);
        return;
    }

    window.FB.ui({
        method: 'share',
        href: options.url,
        quote: options.text,
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
export function initFacebookSDK(appId: string): Promise<void> {
    return new Promise((resolve, reject) => {
        if (window.FB) {
            resolve();
            return;
        }

        const script = document.createElement('script');
        script.src = `https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v18.0&appId=${appId}`;
        script.async = true;
        script.defer = true;
        script.crossOrigin = 'anonymous';
        
        script.onload = function() {
            if (window.FB) {
                window.FB.init({
                    appId: appId,
                    cookie: true,
                    xfbml: true,
                    version: 'v18.0'
                });
                resolve();
            }
        };
        
        script.onerror = function() {
            console.error('Facebook SDK 加载失败');
            reject(new Error('Facebook SDK 加载失败'));
        };
        
        document.head.appendChild(script);
    });
} 