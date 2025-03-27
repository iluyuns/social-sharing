# 社交分享功能实现指南

## 支持的平台
以下平台支持通过URL直接分享，无需后端支持：
- X (Twitter)
- Facebook
- WhatsApp
- Telegram
- Line
- Zalo
- Instagram (通过 Web Share API)
- TikTok (通过 Web Share API)

## 使用方法

### 1. 引入脚本
```html
<script src="social-sharing.js"></script>
```

### 2. 添加分享按钮
```html
<button onclick="shareToX('https://example.com', '分享内容', 'yourusername')">分享到X</button>

<!-- facebook 在移动端不能正常工作跳转至app 需要接入开发平台 -->
<button onclick="shareToFacebook('https://example.com', '分享内容')">分享到Facebook</button>

<button onclick="shareToWhatsApp('https://example.com', '分享内容')">分享到WhatsApp</button>
<button onclick="shareToTelegram('https://example.com', '分享内容')">分享到Telegram</button>
<button onclick="shareToLine('https://example.com', '分享内容')">分享到Line</button>
<button onclick="shareToZalo('https://example.com', '分享内容')">分享到Zalo</button>
<button onclick="shareToInstagram('https://example.com', '分享内容')">分享到Instagram</button>
<button onclick="shareToTikTok('https://example.com', '分享内容')">分享到TikTok</button>
<button onclick="shareContent('标题', '分享内容', 'https://example.com')">使用系统分享</button>
```

### 3. 函数说明
所有分享函数都接受两个主要参数：
- `url`: 要分享的网页URL
- `text`: 分享时显示的文本内容

特殊参数：
- `via`: 仅用于X(Twitter)分享，指定分享者的用户名

### 4. Web Share API
对于支持 Web Share API 的设备（主要是移动设备），可以使用 `shareContent` 函数：
```javascript
shareContent('标题', '分享内容', 'https://example.com');
```

## 详细实现指南
- [各平台具体实现方法](platform-implementation.md) - 包含每个平台的详细 HTML 实现代码
- [分享卡片预览实现](social-sharing.md) - 包含如何实现分享链接的预览卡片

## 注意事项
1. 确保分享的URL是完整的，包含 `http://` 或 `https://`
2. 分享文本内容会被自动进行 URL 编码
3. Web Share API 主要在移动设备上工作良好
4. 在桌面浏览器上，会使用降级方案（打开网页版分享页面）

## 示例
完整的示例代码请参考 `index.html` 文件。

## 许可证
MIT License