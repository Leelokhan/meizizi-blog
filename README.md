# 美滋滋的个人博客

我的个人博客：绘画作品展示、AI 短文、Live2D 看板娘、音乐播放器，全部在一个静态页面里，不用数据库，不用后端。

在线演示：把仓库推到 GitHub Pages / Cloudflare Pages 后，把你的地址填在这里。

[![Deploy to Cloudflare Pages](https://deploy.cloudflare.com/button.svg)](https://deploy.cloudflare.com/?url=https://github.com/Leelokhan/meizizi-blog)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Leelokhan/meizizi-blog)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/Leelokhan/meizizi-blog)

## 里面有什么

- **绘画作品**：10 幅作品，随机排版、滚动随机飘入、悬停放大
- **文章**：6 篇 AI 相关短文，点开弹窗看全文
- **轮播大图**：顶部 7 张二次元大图，可自动/手动切换
- **Live2D 看板娘**：16 个碧蓝航线模型，点“换一个”切换，透明底、可拖动
- **音乐播放器**：网易云专辑，播放/切歌/循环/随机
- **背景视频**：初音短片循环（本地 `bg.mp4`，加载失败自动回退远程地址）
- **我的站点**：底部链接区，6 个自己的小站
- **内容编辑器**：打开 `editor/` 就能可视化改作品、文章、轮播图、链接、看板娘，不用改代码

## 目录结构

```
├── index.html          # 博客首页（全部内容都在顶部 CONFIG 数据块里）
├── bg.mp4              # 背景视频（720p 循环短片）
├── images/             # 10 张作品图
├── live2d/models/      # 16 个 Live2D 模型
├── editor/
│   └── index.html      # 可视化内容编辑器
└── .github/workflows/  # GitHub Pages 自动部署
```

## 一键部署

点上面三个按钮任意一个，按提示登录、选仓库、部署，不用填任何配置就能上线。三个都是免费额度，静态站够用：

| 平台 | 要点 |
| --- | --- |
| Cloudflare Pages | 点按钮 → 授权 GitHub → Create，自动部署；送 `*.pages.dev` 域名，可绑自己的域名 |
| Vercel | 点按钮 → 授权 GitHub → Deploy；送 `*.vercel.app` 域名 |
| Netlify | 点按钮 → 授权 GitHub → Deploy；送 `*.netlify.app` 域名 |
| GitHub Pages | 推到 GitHub 后自动部署（仓库已带 workflow），地址是 `https://<你的用户名>.github.io/meizizi-blog/`；想用根域名可以把仓库名改成 `<你的用户名>.github.io` |

## 任意服务器 / 虚拟主机

纯静态文件，不挑服务器：把整个仓库的文件拷到网站根目录（比如 HelioHost 的 `/httpdocs/`、Nginx / Apache 的站点目录）就能打开。不需要 Node.js、PHP、数据库。

## 自己改内容

两种办法：

1. **可视化编辑器**：打开 `你的域名/editor/`，打开就自动读取当前线上首页来改，改完点“导出 index.html”，把导出的文件传到网站根目录覆盖 `index.html`。
2. **直接改代码**：打开 `index.html`，只改顶部 `CONFIG` 数据块里的作品、文章、轮播图、链接、看板娘模型和专辑 ID。

新图片放到 `images/` 里，新模型放到 `live2d/models/` 里，路径写相对路径就行。

## 说明

- Live2D 模型来自《碧蓝航线》，仅作个人博客装饰使用。
- 音乐播放器通过网易云公开接口取歌单，专辑 ID 在 `CONFIG` 里可换。
- 顶部轮播大图来自网络图床，加载失败会自动跳到下一张。
