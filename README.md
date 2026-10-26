# Keylight — 纯前端 DeepSeek API Dashboard

[简体中文](#简体中文) · [English](#english)

**公开仓库 / Public repository:** <https://github.com/longlonglink/keylight-api-dashboard>

---

## 简体中文

### 项目概览

Keylight 是一个中英双语的纯静态 DeepSeek API 仪表盘。用户输入自己的 API Key 后，浏览器直接访问 DeepSeek 官方 API，只展示官方文档确认提供的余额与模型数据。

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
- 首页 API Key 购买推广区，包含 Telegram 咨询入口和 PayPal 官方付款表单（均在新标签页打开）。

### API Key 购买推广区与人民币额度

首页在主要连接区域下方、页脚上方提供推广购买区：

- Telegram：<https://t.me/+mErIcVI3_R4zMDE1>
- PayPal 付款表单：`https://www.paypal.com/ncp/payment/CMTG9BPF9Z2KG`
- PayPal 表单保留原始 CSS 类名 `.pp-CMTG9BPF9Z2KG`、原始图片地址和 `POST` 目标地址。
- 新标签页链接使用 `target="_blank"` 与 `rel="noopener noreferrer"`。
- PayPal 只提供静态品牌 SVG 图片，没有在本站加载 PayPal 脚本、追踪 SDK 或付款代理。

充值流程与计算：

```text
1. 在 PayPal 输入美元充值金额并付款
2. 付款后加入 Telegram 群核实
3. 核实完成后，商家私聊发送对应额度的 API Key
```

```text
预计 API 余额（CNY） = 充值金额（USD） × 参考汇率 × 100 / 95
```

- 95 折不变，倍率仍为 `100/95`。
- 当前参考汇率为 `1 USD = 6.68 CNY`（2026-10-26），配置在 `src/config.ts` 的 `PROMO_USD_CNY_RATE`。
- 示例：充值 USD 95.00，按参考汇率预计到账 CNY 668.00。
- 页面计算器仅做本地估算，不修改、不提交 PayPal 金额；最终汇率、取整和到账额度以 Telegram 核实为准。
- 公开 PayPal 商品当前是 `VARIABLE_PRICE`，买家在 PayPal 页面自行填写 USD 金额。
- 本站不接收、不存储、不展示付款后通过 Telegram 私下发放的 API Key。
- 站点文案由 `PROMO_DISCOUNT_ENABLED`、`PROMO_USD_CNY_RATE` 和 `PROMO_CREDIT_MULTIPLIER` 控制。

**维护者注意：** 本项目不是 DeepSeek 官方商店，也未声称是授权合作伙伴。请在推广区保留非官方声明，不要添加官方背书、虚构原价、销量或评价。

### API Key 与隐私

- Key 只保存在当前页面的 React 内存中。
- 刷新页面后必须重新输入。
- 不写入 `localStorage`、`sessionStorage` 或 Cookie。
- 不进入 URL、查询参数、Hash、console 或错误信息。
- 不发送到本站域名、维护者服务器、Worker、数据库、KV 或统计服务。
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
- `og:image` 使用本仓库的 `raw.githubusercontent.com` 绝对地址，确保社交抓取器获得完整图片；fork 后必须同步修改。
- 当前 canonical 使用站点根路径 `/`，会解析到实际部署域名。绑定正式自定义域名后，可改为绝对 canonical，并按实际域名补充 `sitemap.xml`。
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
│   ├── PurchaseSection.tsx
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

### 透明度文档

- [PRIVACY.md](PRIVACY.md) — 隐私声明与数据流
- [SECURITY.md](SECURITY.md) — 如何审计源码、网络请求与报告安全问题
- [ARCHITECTURE.md](ARCHITECTURE.md) — 架构图与边界

### 检查结果

- `npm install` 通过。
- `npm run build` 通过，生成 `dist/`。
- TypeScript strict 通过。
- 真实 401 响应能正确显示，不泄露 Key。
- 网络请求只发往本站静态资源和 `https://api.deepseek.com`。
- 无 Usage、Account、历史图表或伪造数据。
- 无本地 Key 持久化。
- 桌面 1440 / 1024、平板 768、移动 375 / 390 / 414 宽度通过。
- Light / Dark / System 与中英切换正常。
- GitHub 仓库为 Public，项目中没有真实 Key。

---

## English

### Overview

Keylight is a bilingual, fully static DeepSeek API dashboard. After users enter their own API key, the browser calls DeepSeek's official API directly and displays only the data confirmed by the current public documentation: balance and models.

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
- A homepage API key purchase section with a Telegram support link and the official PayPal hosted form (both open in a new tab).

### API key purchase section and CNY credit

The homepage includes a purchase section below the main connection area and above the footer:

- Telegram: <https://t.me/+mErIcVI3_R4zMDE1>
- PayPal form: `https://www.paypal.com/ncp/payment/CMTG9BPF9Z2KG`
- The PayPal form keeps the original `.pp-CMTG9BPF9Z2KG` CSS class, image URLs, and `POST` target.
- New-tab links use `target="_blank"` and `rel="noopener noreferrer"`.
- PayPal is used only for static brand SVG images. No PayPal script, tracking SDK, or payment proxy runs on this site.

Payment and calculation flow:

```text
1. Enter a USD top-up amount on PayPal and pay
2. Join the Telegram group after payment for verification
3. After verification, the seller sends the API key by Telegram DM
```

```text
Estimated API balance (CNY) = top-up (USD) × reference rate × 100 / 95
```

- The 95% ratio is unchanged at `100/95`.
- The current reference rate is `1 USD = 6.68 CNY` (2026-10-26), configured as `PROMO_USD_CNY_RATE` in `src/config.ts`.
- Example: a USD 95.00 top-up is estimated at CNY 668.00.
- The calculator is a local estimate only. It does not alter or submit a PayPal amount. The final rate, rounding, and credit are confirmed on Telegram.
- The public PayPal item is currently a `VARIABLE_PRICE` checkout, so the buyer enters their chosen USD amount on PayPal.
- This site does not receive, store, or display API keys sent privately through Telegram after payment.
- The copy/rate is controlled by `PROMO_DISCOUNT_ENABLED`, `PROMO_USD_CNY_RATE`, and `PROMO_CREDIT_MULTIPLIER` in `src/config.ts`.

**Maintainer note:** this project is not a DeepSeek official store and does not claim to be an authorized partner. Keep the non-affiliation statement and never invent an original price, sales volume, or reviews.

### API key and privacy

- The key lives only in React memory on the current page.
- Reloading the page requires re-entering the key.
- It is never written to `localStorage`, `sessionStorage`, or cookies.
- It never enters the URL, query string, hash, console, or error messages.
- It is never sent to this site's domain, a maintainer server, Worker, database, KV store, or analytics service.
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
- `og:image` uses an absolute `raw.githubusercontent.com` URL from this repository so social crawlers receive a complete image; update it if you fork the project.
- The canonical URL is currently root-relative (`/`) and resolves to the deployment origin. After assigning a custom production domain, switch to an absolute canonical and add `sitemap.xml` for that domain.
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

### Transparency documents

- [PRIVACY.md](PRIVACY.md)
- [SECURITY.md](SECURITY.md)
- [ARCHITECTURE.md](ARCHITECTURE.md)

### Verified

- `npm install` passes.
- `npm run build` passes and writes `dist/`.
- TypeScript strict checking passes.
- Real 401 responses render safely without exposing the key.
- Network requests target this static site's assets, `https://api.deepseek.com`, and the two PayPal logo SVGs on `https://www.paypalobjects.com`. There are no analytics or other tracking requests.
- The Telegram and PayPal URLs are correct, open in a new tab, and the PayPal form retains its original action, class, and image resources.
- No Usage, Account, historical chart, or fabricated data exists.
- No local key persistence exists.
- Desktop 1440 / 1024, tablet 768, and mobile 375 / 390 / 414 widths pass.
- Light / Dark / System and Chinese/English switching work.
- The GitHub repository is public and contains no real API key.
- The 95% top-up offer is active: buyer pays a USD amount, CNY credit is estimated using the configured reference rate × 100/95, and the final API key is delivered manually through Telegram after verification.
- The flow is PayPal payment → Telegram group verification → private API key delivery; no “or pay with” divider is shown.
- The variable PayPal checkout and manual key delivery are documented; no frontend code changes or bypasses the PayPal amount.
