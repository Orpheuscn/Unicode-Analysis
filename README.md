# Unicode Analyzer

一个功能强大的Unicode字符分析工具，支持离线使用（PWA），可以查看字符的详细信息并使用SVG字形显示。

## ✨ 特性

- 🔍 **字符分析**：输入任何文本，查看每个字符的Unicode编码、名称等详细信息
- 🎨 **SVG字形显示**：支持使用SVG图形显示字符（包含99,996个字符的SVG文件）
- 📱 **PWA支持**：可以安装到桌面或手机，支持完全离线使用
- 🌓 **深色主题**：现代化的深色界面设计
- 📊 **完整数据**：包含149,944个Unicode字符的详细信息

## 🚀 使用方法

### 在线访问

访问：[GitHub Pages链接]（待部署）

### 本地运行

1. 克隆仓库：
```bash
git clone https://github.com/YOUR_USERNAME/Unicode.git
cd Unicode
```

2. 启动本地服务器：
```bash
python3 -m http.server
```

3. 在浏览器中打开：`http://localhost:8000`

### 安装为PWA

1. 在浏览器中打开网站
2. 点击地址栏右侧的"安装"图标
3. 确认安装后即可离线使用

## 📁 项目结构

```
Unicode/
├── index.html              # 主页面
├── manifest.json           # PWA配置文件
├── service-worker.js       # Service Worker（离线支持）
├── unicode_data.json       # Unicode字符数据（149,944个字符）
├── svg_index.json          # SVG文件索引
├── icon.svg                # 应用图标（SVG）
├── icons/                  # 不同尺寸的PNG图标
│   ├── icon-180.png
│   ├── icon-192.png
│   └── icon-512.png
└── char_svgs/              # SVG字形文件（99,996个文件）
    ├── U+0001.svg
    ├── U+0002.svg
    └── ...
```

## 🛠️ 技术栈

- 纯HTML/CSS/JavaScript（无框架依赖）
- Service Worker（实现离线缓存）
- Web App Manifest（PWA配置）
- Fetch API（动态加载SVG）

## 📝 数据来源

- Unicode数据包含字符编码、名称、类别等信息
- SVG字形文件来自开源字体项目

## 📄 许可证

MIT License

## 🤝 贡献

欢迎提交Issue和Pull Request！

---

Made with ❤️ for Unicode enthusiasts
