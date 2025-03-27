# 各平台分享实现方法

## 1. X (Twitter)
```html
<!-- 方法1：使用分享按钮 -->
<button onclick="shareToX('https://example.com', '分享内容', 'yourusername')">分享到X</button>

<!-- 方法2：直接链接 -->
<a href="https://twitter.com/intent/tweet?url=https://example.com&text=分享内容&via=yourusername" target="_blank">
    分享到X
</a>
```

## 2. Facebook
```html
<!-- 方法1：使用分享按钮 -->
<button onclick="shareToFacebook('https://example.com', '分享内容')">分享到Facebook</button>

<!-- 方法2：直接链接 -->
<a href="https://www.facebook.com/sharer/sharer.php?u=https://example.com&quote=分享内容" target="_blank">
    分享到Facebook
</a>

<!-- 方法3：Facebook SDK -->
<div id="fb-root"></div>
<script async defer crossorigin="anonymous" src="https://connect.facebook.net/zh_CN/sdk.js#xfbml=1&version=v18.0&appId=你的APP_ID" nonce="随机字符串"></script>
<div class="fb-share-button" data-href="https://example.com" data-layout="button_count"></div>
```

## 3. WhatsApp
```html
<!-- 方法1：使用分享按钮 -->
<button onclick="shareToWhatsApp('https://example.com', '分享内容')">分享到WhatsApp</button>

<!-- 方法2：直接链接 -->
<a href="https://wa.me/?text=分享内容%20https://example.com" target="_blank">
    分享到WhatsApp
</a>
```

## 4. Telegram
```html
<!-- 方法1：使用分享按钮 -->
<button onclick="shareToTelegram('https://example.com', '分享内容')">分享到Telegram</button>

<!-- 方法2：直接链接 -->
<a href="https://t.me/share/url?url=https://example.com&text=分享内容" target="_blank">
    分享到Telegram
</a>
```

## 5. LINE
```html
<!-- 方法1：使用分享按钮 -->
<button onclick="shareToLine('https://example.com', '分享内容')">分享到LINE</button>

<!-- 方法2：直接链接 -->
<a href="https://social-plugins.line.me/lineit/share?url=https://example.com&text=分享内容" target="_blank">
    分享到LINE
</a>
```

## 6. Zalo
```html
<!-- 方法1：使用分享按钮 -->
<button onclick="shareToZalo('https://example.com', '分享内容')">分享到Zalo</button>

<!-- 方法2：直接链接 -->
<a href="https://zalo.me/share?u=https://example.com&t=分享内容" target="_blank">
    分享到Zalo
</a>
```

## 7. Instagram
```html
<!-- 方法1：使用分享按钮 -->
<button onclick="shareToInstagram('https://example.com', '分享内容')">分享到Instagram</button>

<!-- 方法2：直接链接 -->
<a href="https://instagram.com/share?url=https://example.com&caption=分享内容" target="_blank">
    分享到Instagram
</a>
```

## 8. TikTok
```html
<!-- 方法1：使用分享按钮 -->
<button onclick="shareToTikTok('https://example.com', '分享内容')">分享到TikTok</button>

<!-- 方法2：直接链接 -->
<a href="https://www.tiktok.com/share?url=https://example.com&text=分享内容" target="_blank">
    分享到TikTok
</a>
```

## 9. 系统分享（Web Share API）
```html
<!-- 方法1：使用分享按钮 -->
<button onclick="shareContent('标题', '分享内容', 'https://example.com')">使用系统分享</button>

<!-- 方法2：原生 Web Share API -->
<button onclick="navigator.share({
    title: '标题',
    text: '分享内容',
    url: 'https://example.com'
})">原生系统分享</button>
```

## 注意事项

1. URL 编码：
   - 所有分享链接中的参数都需要进行 URL 编码
   - 可以使用 `encodeURIComponent()` 函数进行编码
   - 空格通常编码为 `%20`

2. 移动端适配：
   - 在移动设备上，建议使用 Web Share API
   - 对于不支持 Web Share API 的设备，使用直接链接方式
   - 确保链接在新窗口打开（使用 `target="_blank"`）

3. 样式建议：
```css
/* 分享按钮基础样式 */
.share-button {
    display: inline-block;
    padding: 8px 16px;
    margin: 5px;
    border-radius: 4px;
    text-decoration: none;
    color: white;
    cursor: pointer;
    border: none;
}

/* 各平台按钮颜色 */
.twitter-button { background-color: #1DA1F2; }
.facebook-button { background-color: #4267B2; }
.whatsapp-button { background-color: #25D366; }
.telegram-button { background-color: #0088cc; }
.line-button { background-color: #00B900; }
.zalo-button { background-color: #0068FF; }
.instagram-button { background-color: #E4405F; }
.tiktok-button { background-color: #000000; }
```

4. 完整示例：
```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>社交分享示例</title>
    <style>
        .share-container {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
            padding: 20px;
        }
        .share-button {
            display: inline-block;
            padding: 8px 16px;
            border-radius: 4px;
            text-decoration: none;
            color: white;
            cursor: pointer;
            border: none;
        }
        /* 各平台按钮样式 */
        .twitter-button { background-color: #1DA1F2; }
        .facebook-button { background-color: #4267B2; }
        .whatsapp-button { background-color: #25D366; }
        .telegram-button { background-color: #0088cc; }
        .line-button { background-color: #00B900; }
        .zalo-button { background-color: #0068FF; }
        .instagram-button { background-color: #E4405F; }
        .tiktok-button { background-color: #000000; }
    </style>
</head>
<body>
    <div class="share-container">
        <button class="share-button twitter-button" onclick="shareToX('https://example.com', '分享内容', 'yourusername')">分享到X</button>
        <button class="share-button facebook-button" onclick="shareToFacebook('https://example.com', '分享内容')">分享到Facebook</button>
        <button class="share-button whatsapp-button" onclick="shareToWhatsApp('https://example.com', '分享内容')">分享到WhatsApp</button>
        <button class="share-button telegram-button" onclick="shareToTelegram('https://example.com', '分享内容')">分享到Telegram</button>
        <button class="share-button line-button" onclick="shareToLine('https://example.com', '分享内容')">分享到LINE</button>
        <button class="share-button zalo-button" onclick="shareToZalo('https://example.com', '分享内容')">分享到Zalo</button>
        <button class="share-button instagram-button" onclick="shareToInstagram('https://example.com', '分享内容')">分享到Instagram</button>
        <button class="share-button tiktok-button" onclick="shareToTikTok('https://example.com', '分享内容')">分享到TikTok</button>
        <button class="share-button" onclick="shareContent('标题', '分享内容', 'https://example.com')">使用系统分享</button>
    </div>

    <script src="social-sharing.js"></script>
</body>
</html>
``` 