# 社交媒体分享卡片预览实现指南

## 通用 Meta 标签

以下是一些通用的 meta 标签，建议添加到 `<head>` 标签中：

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="你的网站描述">
```

## 各平台卡片预览实现

### 1. Facebook (Open Graph)

Facebook 使用 Open Graph 协议来显示链接预览。需要添加以下 meta 标签：

```html
<meta property="og:title" content="页面标题">
<meta property="og:description" content="页面描述">
<meta property="og:image" content="预览图片URL">
<meta property="og:url" content="当前页面URL">
<meta property="og:type" content="website">
```

### 2. Twitter/X (Twitter Cards)

Twitter 使用 Twitter Cards 来显示链接预览。支持两种类型：
- summary：小卡片
- summary_large_image：大卡片

```html
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:site" content="@你的Twitter用户名">
<meta name="twitter:title" content="页面标题">
<meta name="twitter:description" content="页面描述">
<meta name="twitter:image" content="预览图片URL">
```

### 3. LinkedIn

LinkedIn 也使用 Open Graph 协议，但建议额外添加以下标签：

```html
<meta property="linkedin:card" content="summary_large_image">
<meta property="linkedin:title" content="页面标题">
<meta property="linkedin:description" content="页面描述">
<meta property="linkedin:image" content="预览图片URL">
```

### 4. WhatsApp

WhatsApp 使用 Open Graph 协议，但建议图片尺寸至少为 300x200 像素。

### 5. Telegram

Telegram 使用 Open Graph 协议，但建议额外添加：

```html
<meta property="telegram:channel" content="@你的Telegram频道">
```

### 6. LINE

LINE 使用 Open Graph 协议，但建议图片尺寸至少为 1200x630 像素。

### 7. Zalo

Zalo 使用 Open Graph 协议，但建议图片尺寸至少为 1200x630 像素。

## 注意事项

1. 图片要求：
   - 建议使用 HTTPS 链接
   - 图片尺寸建议至少 1200x630 像素
   - 图片格式支持 JPG、PNG、GIF
   - 图片大小建议不超过 5MB

2. 标题和描述：
   - 标题建议 50-60 个字符
   - 描述建议 150-160 个字符

3. 测试工具：
   - Facebook: https://developers.facebook.com/tools/debug/
   - Twitter: https://cards-dev.twitter.com/validator
   - LinkedIn: https://www.linkedin.com/post-inspector/
   - WhatsApp: 直接在 WhatsApp 中测试

4. 缓存问题：
   - 各平台都会缓存链接预览
   - 如果更新了预览内容，可能需要使用平台的调试工具清除缓存

## 完整示例

```html
<head>
    <!-- 基础 Meta 标签 -->
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="你的网站描述">

    <!-- Open Graph (Facebook, WhatsApp, Telegram, LINE, Zalo) -->
    <meta property="og:title" content="页面标题">
    <meta property="og:description" content="页面描述">
    <meta property="og:image" content="https://example.com/image.jpg">
    <meta property="og:url" content="https://example.com">
    <meta property="og:type" content="website">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@你的Twitter用户名">
    <meta name="twitter:title" content="页面标题">
    <meta name="twitter:description" content="页面描述">
    <meta name="twitter:image" content="https://example.com/image.jpg">

    <!-- LinkedIn -->
    <meta property="linkedin:card" content="summary_large_image">
    <meta property="linkedin:title" content="页面标题">
    <meta property="linkedin:description" content="页面描述">
    <meta property="linkedin:image" content="https://example.com/image.jpg">
</head>
``` 