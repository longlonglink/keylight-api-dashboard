# KeyLight — 纯前端 DeepSeek API Dashboard

[简体中文](#简体中文) · [English](#english)

**公开仓库 / Public repository:** <https://github.com/longlonglink/keylight-api-dashboard>

---

## 简体中文

### 项目概览

KeyLight 是一个中英双语的纯静态 DeepSeek API 仪表盘。用户输入自己的 API Key 后，浏览器直接访问 DeepSeek 官方 API，只展示官方文档确认提供的余额与模型数据。

```text
公开 GitHub 仓库
        ↓
Cloudflare Pages 静态托管
        ↓
用户浏览器
        ↓
DeepSeek 官方 API
        ↓
浏览器展示真实数据
```

- 无后端。
- 无 Cloudflare Worker。
- 无 API Proxy。
- 无数据库、KV、D1、R2。
- 无 Analytics、追踪 SDK 或错误上报服务。
- 无 Wrangler 部署步骤。
- API Key 默认只保存在当前页面的 JavaScript 内存中。
- API 请求只从用户浏览器直接发往 `https://api.deepseek.com`。

### 当前实际支持的官方数据

开发前已重新核对 [DeepSeek 官方 API 文档](https://api-docs.deepseek.com/)（2026-10-25）：

| 展示内容 | 官方接口 | 本项目管理方式 |
| --- | --- | --- |
| 账户余额 | `GET /user/balance` | 直接展示 `is_available` 与 `balance_infos` |
| 模型列表 | `GET /models` | 动态展示 API 返回的模型及元数据 |

界面中的 DeepSeek 鲸鱼标志取自 DeepSeek 官方 API 文档的 Logo 资源，仅用于标识 API 服务商。DeepSeek 名称和标志归其权利人所有，本项目与 DeepSeek 无隶属关系。

鉴权：

```http
Authorization: Bearer <USER_API_KEY>
```

本项目**不包含**以下功能，因为当前官方公开 API 没有相应接口：

- Usage / Token 消耗历史。
- 余额历史图表。
- Account ID、账户状态、套餐、等级、注册时间。
- 根据余额推算消费。
- 任何模拟、随机或示例用户数据。

因此 Dashboard 中没有 Usage 卡片、Account 卡片或折线图，也没有对应请求代码。

### CORS 实测

两个实际使用的接口在 2026-10-26 均通过浏览器 CORS 预检：

```text
OPTIONS https://api.deepseek.com/models
OPTIONS https://api.deepseek.com/user/balance
```

两者均返回 `HTTP 200`，并包含：

```text
access-control-allow-origin: <request origin>
access-control-allow-methods: GET
access-control-allow-headers: authorization
access-control-allow-credentials: true
```

如果 DeepSeek 未来停止支持 CORS，本项目会明确显示“浏览器请求被阻止或网络离线”，**不会添加代理或 Worker** 绕过限制。

### 功能

- 中 / 英界面切换，所有主要文案、错误信息与隐私说明均来自统一语言资源文件。
- DeepSeek Provider（当前唯一 Provider）。
- API Key 输入、显示 / 隐藏、剪贴板粘贴、清空。
- Connect、Refresh、Clear Key。
- 加载 Skeleton、真实错误提示、空状态。
- 最近一次成功查询时间。
- 余额按 API 返回的币种分别展示，不换算、不合并。
- 模型表格由 `/models` 实时生成，不硬编码模型列表。
- Light / Dark / System 主题。
- 响应式桌面和移动端布局。
- 首页最底部提供 GitHub 开源自证链接，指向本仓库完整源码。
- 首页社区推广区宣传 API Access 9 折，并提供 Telegram 与 Discord 咨询入口；本站不提供结账、支付表单或站内付款。

### API Key 与隐私

- Key 只保存在当前页面的 React 内存中。
- 刷新页面后必须重新输入。
- 不写入 `localStorage`、`sessionStorage` 或 Cookie。
- 不进入 URL、查询参数、Hash、console 或错误信息。
- 不发送到本站域名、维护者服务器、Worker、数据库、KV 或统计服务。
- 不会拼进 Telegram 或 Discord 链接；社区按钮是静态链接，不携带 API Key。
- 浏览器只将 Key 放入 `Authorization` 请求头，直接发往 DeepSeek 官方 API。
- 旧版本可能留下的 Key 存储项会在启动时主动清理；当前版本从不写入 Key。
- `Clear Key` 会清空内存中的 Key、中止当前请求，并返回首页。

主题和语言偏好是唯一写入 localStorage 的内容，它们不是敏感数据。详见 [PRIVACY.md](PRIVACY.md)。

### GitHub 开源自证

首页 Footer 最底部固定显示：

```text
开源透明，自行审查
完整源码公开，可自行审查 API 请求与数据处理。
[ 在 GitHub 查看完整源码 ↗ ]
```

链接来自统一配置：

```ts
// src/config.ts
export const GITHUB_REPO_URL = 'https://github.com/longlonglink/keylight-api-dashboard'
```

链接使用 `target="_blank"` 与 `rel="noopener noreferrer"`，中英文切换时同步更新。

**维护者注意：** 如果 fork 或迁移仓库，必须在部署前修改 `src/config.ts` 中的 `GITHUB_REPO_URL`，并实际打开链接确认其指向公开的完整源码仓库。不要发布占位链接。

### 技术栈

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 3
- Lucide React
- 自托管 Manrope / JetBrains Mono 字体

没有图表库，因为当前官方 API 没有历史数据可画。

### SEO / GEO

- `index.html` 包含完整标题、双语描述、keywords、robots、canonical、Open Graph、Twitter Card、manifest 和 theme-color。
- 静态 JSON-LD 同时声明 `WebApplication` 与 `FAQPage`；JSON-LD 使用 CSP SHA-256 hash 放行，不开启 `unsafe-inline` 脚本。
- 首页有中英双语的简短 FAQ（默认折叠），内容与结构化数据一致。
- `public/llms.txt` 和 `public/llms-full.txt` 为生成式搜索/AI 工具提供简洁、可引用的事实摘要，不包含用户数据。
- `public/robots.txt` 允许搜索引擎和常见 AI crawler；`public/site.webmanifest`、`public/og.png` 和 PNG 图标用于可发现性与社交分享。
- `public/sitemap.xml` 列出生产 URL。canonical、Open Graph URL/图片、JSON-LD、robots 和 sitemap 统一使用 `https://keylight-api-dashboard.pages.dev/`；如果 Cloudflare Pages 使用不同项目名或自定义域名，必须同步修改 `index.html`、`public/sitemap.xml`、`public/robots.txt`、`public/llms*.txt` 和 `src/config.ts` 中的 `SITE_URL`。
- 修改内联 JSON-LD 后必须重新计算 CSP hash，否则会被 `public/_headers` 拦截。

### 本地运行

要求 Node.js 22（见 `.nvmrc`）。

```bash
npm install
npm run dev
```

生产构建：

```bash
npm run build
npm run preview
```

构建输出位于 `dist/`。

### Cloudflare Pages 部署

```text
Framework preset:        Vite
Production branch:       main
Build command:           npm run build
Build output directory:  dist
Root directory:          /
```

流程：

```text
GitHub
  → Cloudflare Pages
  → npm install
  → npm run build
  → 部署 dist/
```

不需要 Wrangler、Worker、后端、API Route 或 API Key 环境变量。

### 主要文件

```text
src/
├── components/
│   ├── ApiKeyInput.tsx
│   ├── BalanceCard.tsx
│   ├── ErrorAlert.tsx
│   ├── GitHubProof.tsx
│   ├── ModelsTable.tsx
│   ├── CommunitySection.tsx
│   ├── DiscordGlyph.tsx
│   └── ...
├── i18n/
│   ├── I18nProvider.tsx
│   ├── errors.ts
│   └── translations.ts
├── providers/
│   ├── deepseek.ts
│   ├── index.ts
│   └── types.ts
├── pages/
│   ├── Home.tsx
│   └── DashboardPage.tsx
├── App.tsx
├── config.ts
└── main.tsx
```

### 社区与 API Access

需要 API Access？

目前 API Access 以 9 折优惠宣传，即常规价格的 90%。具体详情与任何交易不在本站进行，请通过社区咨询：

- Telegram：<https://t.me/+mErIcVI3_R4zMDE1>
- Discord：<https://discord.gg/UEZGQTTDj>

本站不提供结账、付款表单或站内支付，也不收集付款信息。不要把 API Key 发送到 Telegram、Discord 或任何社区；本站不会要求你这样做。

本项目不是 DeepSeek 官方商店，也未声称是 DeepSeek 授权合作伙伴。

### 透明度文档

- [PRIVACY.md](PRIVACY.md) — 隐私声明与数据流
- [SECURITY.md](SECURITY.md) — 如何审计源码、网络请求与报告安全问题
- [ARCHITECTURE.md](ARCHITECTURE.md) — 架构图与边界
- [TERMS.md](TERMS.md) — 网站与社区使用条款

### 检查结果

- `npm install` 通过。
- `npm run build` 通过，生成 `dist/`。
- TypeScript strict 通过。
- 真实 401 响应能正确显示，不泄露 Key。
- 网络请求只发往本站静态资源和 `https://api.deepseek.com`；Telegram / Discord 仅在用户点击后打开。
- 无 Usage、Account、历史图表或伪造数据。
- 无本地 Key 持久化。
- 桌面 1440 / 1024、平板 768、移动 375 / 390 / 414 宽度通过。
- Light / Dark / System 与中英切换正常。
- GitHub 仓库为 Public，项目中没有真实 Key。
- 页面无付款按钮、付款表单、结账链接或支付品牌图片。
- 9 折 API Access 宣传与 Telegram / Discord 入口正常。
- `sitemap.xml`、`robots.txt`、canonical 与 JSON-LD 已包含在构建产物中。

---

## English

### Overview

KeyLight is a bilingual, fully static DeepSeek API dashboard. After users enter their own API key, the browser calls DeepSeek's official API directly and displays only the data confirmed by the current public documentation: balance and models.

```text
Public GitHub repository
        ↓
Cloudflare Pages static hosting
        ↓
User browser
        ↓
Official DeepSeek API
        ↓
Real data rendered in the browser
```

- No backend.
- No Cloudflare Worker.
- No API proxy.
- No database, KV, D1, or R2.
- No analytics, tracking SDK, or error reporting service.
- No Wrangler deployment.
- The API key stays only in JavaScript memory for the current page by default.
- API requests go directly from the browser to `https://api.deepseek.com`.

### Confirmed official data

The [official DeepSeek API documentation](https://api-docs.deepseek.com/) was checked on 2026-10-25:

| Displayed data | Official endpoint | Handling |
| --- | --- | --- |
| Account balance | `GET /user/balance` | Renders `is_available` and `balance_infos` |
| Model catalogue | `GET /models` | Renders the returned models and metadata dynamically |

The DeepSeek whale mark in the UI comes from the official DeepSeek API documentation logo asset and is used only to identify the API provider. The DeepSeek name and logo belong to their respective owner; this project is not affiliated with DeepSeek.

Authentication:

```http
Authorization: Bearer <USER_API_KEY>
```

The following are intentionally absent because the current public API does not expose them:

- Usage / token-consumption history.
- Balance history charts.
- Account ID, account status, plan, tier, or creation time.
- Spending inferred from balance changes.
- Any simulated, random, estimated, or sample user data.

That is why there are no Usage cards, Account cards, or charts, and no request code for those endpoints.

### CORS verification

On 2026-10-26 both endpoints used by this app passed browser CORS preflight:

```text
OPTIONS https://api.deepseek.com/models
OPTIONS https://api.deepseek.com/user/balance
```

Both returned `HTTP 200` with:

```text
access-control-allow-origin: <request origin>
access-control-allow-methods: GET
access-control-allow-headers: authorization
access-control-allow-credentials: true
```

If DeepSeek disables browser CORS in the future, the app reports it clearly and **will not add a proxy or Worker** to bypass the restriction.

### Features

- Chinese / English UI switching. Major copy, errors, and privacy text come from one translation resource.
- DeepSeek provider (the only provider currently implemented).
- API key input, show/hide, paste, and clear.
- Connect, Refresh, and Clear Key.
- Loading skeletons, real error messages, and empty states.
- Timestamp of the last successful query.
- Balance rendered per currency returned by the API, with no conversion or cross-currency aggregation.
- Models generated live from `/models`, never hardcoded.
- Light / Dark / System themes.
- Responsive desktop and mobile layouts.
- A prominent GitHub open-source proof link at the very bottom of the homepage.
- A homepage community notice advertising API Access at 10% off, with Telegram and Discord links. The website has no checkout, payment form, or on-site payment.

### API key and privacy

- The key lives only in React memory on the current page.
- Reloading the page requires re-entering the key.
- It is never written to `localStorage`, `sessionStorage`, or cookies.
- It never enters the URL, query string, hash, console, or error messages.
- It is never sent to this site's domain, a maintainer server, Worker, database, KV store, or analytics service.
- It is never appended to Telegram or Discord links; community buttons are static links.
- The browser sends it only in the `Authorization` header directly to the official DeepSeek API.
- Key values left by older versions are proactively removed on startup; the current version never writes keys.
- Clear Key wipes the in-memory key, aborts the active request, and returns to the homepage.

Theme and language preferences are the only values stored in localStorage. They are not sensitive. See [PRIVACY.md](PRIVACY.md).

### GitHub open-source proof

The bottom of the homepage Footer always displays the localized equivalent of:

```text
Open Source & Transparency
Full source is public. Inspect the API calls and data handling.
[ View Source on GitHub ↗ ]
```

The URL is maintained in one place:

```ts
// src/config.ts
export const GITHUB_REPO_URL = 'https://github.com/longlonglink/keylight-api-dashboard'
```

The link uses `target="_blank"` and `rel="noopener noreferrer"` and switches language with the rest of the page.

**Maintainer warning:** if you fork or move the repository, update `GITHUB_REPO_URL` in `src/config.ts` before deploying and verify that the link opens the real public source repository. Do not deploy a placeholder URL.

### Stack

- React 18
- TypeScript
- Vite 6
- Tailwind CSS 3
- Lucide React
- Self-hosted Manrope / JetBrains Mono fonts

No chart library is included because the current public API has no historical data to chart.

### SEO / GEO

- `index.html` includes complete title, bilingual description, keywords, robots, canonical, Open Graph, Twitter Card, manifest, and theme-color metadata.
- Static JSON-LD declares both `WebApplication` and `FAQPage`. The inline JSON-LD is allowed through a CSP SHA-256 hash, without enabling `unsafe-inline` scripts.
- The homepage includes a short bilingual FAQ (collapsed by default) whose answers match the structured data.
- `public/llms.txt` and `public/llms-full.txt` provide concise, citable facts for generative search and AI tools and contain no user data.
- `public/robots.txt` allows search engines and common AI crawlers. `public/site.webmanifest`, `public/og.png`, and PNG icons support discovery and sharing.
- `public/sitemap.xml` lists the production URL. Canonical, Open Graph URL/image, JSON-LD, robots and sitemap use `https://keylight-api-dashboard.pages.dev/`; update `index.html`, `public/sitemap.xml`, `public/robots.txt`, `public/llms*.txt`, and `SITE_URL` in `src/config.ts` together if Cloudflare Pages uses a different project name or custom domain.
- After editing the inline JSON-LD, recompute the CSP hash or `public/_headers` will block it.

### Local development

Node.js 22 is recommended (see `.nvmrc`).

```bash
npm install
npm run dev
```

Production build and preview:

```bash
npm run build
npm run preview
```

The build output is `dist/`.

### Cloudflare Pages

```text
Framework preset:        Vite
Production branch:       main
Build command:           npm run build
Build output directory:  dist
Root directory:          /
```

Deployment flow:

```text
GitHub
  → Cloudflare Pages
  → npm install
  → npm run build
  → deploy dist/
```

No Wrangler, Worker, backend, API route, or API key environment variable is required.

### Community & API Access

Need API access?

API access is currently available at 10% off (90% of the standard price). Details and any transaction happen outside this website. Contact the community:

- Telegram: <https://t.me/+mErIcVI3_R4zMDE1>
- Discord: <https://discord.gg/UEZGQTTDj>

This website has no checkout, payment form, or on-site payment and collects no payment information. Never send your API key to Telegram, Discord, or any community; the site never asks you to.

This project is not a DeepSeek official store and does not claim to be an authorized DeepSeek partner.

### Transparency documents

- [PRIVACY.md](PRIVACY.md)
- [SECURITY.md](SECURITY.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)
- [TERMS.md](TERMS.md)

### Verified

- `npm install` passes.
- `npm run build` passes and writes `dist/`.
- TypeScript strict checking passes.
- Real 401 responses render safely without exposing the key.
- Network requests target this static site's assets and `https://api.deepseek.com`; Telegram / Discord open only after a click. There are no analytics or other tracking requests.
- No Usage, Account, historical chart, or fabricated data exists.
- No local key persistence exists.
- Desktop 1440 / 1024, tablet 768, and mobile 375 / 390 / 414 widths pass.
- Light / Dark / System and Chinese/English switching work.
- The GitHub repository is public and contains no real API key.
- The page has no payment button, payment form, checkout link, or payment brand image.
- The 10% API Access notice and Telegram / Discord links work.
- `sitemap.xml`, `robots.txt`, canonical, and JSON-LD are included.
