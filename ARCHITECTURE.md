# 架构说明 / Architecture

[简体中文](#简体中文) · [English](#english)

最后更新 / Last updated: 2026-10-26

---

## 简体中文

### 总览

```text
GitHub Public Repository
        │
        │ Git integration
        ▼
Cloudflare Pages
        │
        │ serves static HTML / CSS / JS / fonts
        ▼
User Browser
        │
        │ API key in JavaScript memory
        │ direct HTTPS request with Authorization header
        ▼
Official DeepSeek API
        │
        │ real JSON response
        ▼
Browser renders balance + models
```

本站没有：

- 后端服务器。
- Cloudflare Worker。
- API Proxy。
- Serverless Function。
- Pages Functions。
- 数据库、KV、D1、R2。
- Analytics 或错误追踪服务。

### 部署边界

Cloudflare Pages 只分发静态文件。它不会收到用户输入的 API Key，也不会参与对 DeepSeek 的请求。

```text
用户下载静态文件：浏览器 → Cloudflare Pages
用户查询 API：    浏览器 → api.deepseek.com
购买咨询/付款：   浏览器 → t.me / www.paypal.com（用户点击后）
PayPal 品牌图片： 浏览器 → www.paypalobjects.com（仅静态 SVG）
```

不存在：

```text
浏览器 → 本站后端 / Worker → api.deepseek.com
```

### 前端模块

```text
src/
├── App.tsx                 页面状态与 Key 内存生命周期
├── config.ts               仓库、Telegram、PayPal URL 与 100/95 倍率
├── i18n/                   中英双语文案与错误映射
├── providers/
│   ├── deepseek.ts         唯一的官方 API 客户端
│   ├── index.ts            Provider 注册表
│   └── types.ts            仅 balance + models 数据类型
├── pages/
│   ├── Home.tsx            首页、连接表单、隐私说明、GitHub 证明
│   └── DashboardPage.tsx   余额 + 模型 Dashboard
├── components/
│   ├── BalanceCard.tsx     官方 balance_infos 渲染
│   ├── ModelsTable.tsx     官方 /models 渲染
│   ├── ApiKeyInput.tsx     内存输入、显示/隐藏、粘贴、清空
│   ├── ErrorAlert.tsx      本地化错误展示
│   ├── GitHubProof.tsx     首页底部开源证明
│   ├── PurchaseSection.tsx 推广、Telegram、PayPal 表单
│   └── ...
├── lib/
│   ├── errors.ts           不包含 Key 的错误类型
│   ├── security.ts         Key 规范化与旧版 credential 清理
│   ├── storage.ts          仅主题/语言偏好
│   └── format.ts
└── main.tsx
```

### 数据流

1. 用户输入 API Key。
2. 点击 Connect。
3. `src/providers/deepseek.ts` 直接在浏览器中请求：
   - `GET https://api.deepseek.com/models`
   - `GET https://api.deepseek.com/user/balance`
4. Key 只放入 `Authorization: Bearer …` 请求头。
5. 解析真实 JSON 后，将余额和模型展示在页面。
6. 页面刷新时 React 内存清空，用户需要重新输入 Key。
7. Clear Key 清空内存、中止当前请求并返回首页。

### 购买推广与付款边界

- 首页 `PurchaseSection` 展示 Telegram 咨询链接和 PayPal 官方托管表单。
- Telegram 链接指向 `https://t.me/+mErIcVI3_R4zMDE1`，在新标签页打开。
- PayPal 表单直接 POST 到 `https://www.paypal.com/ncp/payment/CMTG9BPF9Z2KG`，在本站不经过任何后端。
- 本站只加载 PayPal 提供的两张静态品牌 SVG，不加载 PayPal 脚本，也不处理支付数据。
- 页面内充值计算器只保存在本地 React state，不持久化、不提交，也不填入 PayPal。
- 95 折规则为 `到账额度 = 充值金额 × 100/95`；例子：支付 USD 95，到账 USD 100。
- PayPal 商品是 `VARIABLE_PRICE`，买家在 PayPal 页面输入自己选择的金额。
- 付款后由商家通过 Telegram 核对金额并发送对应额度的 API Key；本站不接收、不存储、不展示已购 Key。
- 这是人工核账与发放流程，不是 PayPal 自动折扣。商家必须按实际付款金额履约。
- API Key、余额和模型数据不会进入 Telegram 链接或 PayPal 表单。
- 禁止通过前端注入金额或修改 action 绕过 PayPal 定价。

### 只展示官方数据

当前 DeepSeek 公开 API 没有 Usage 历史或 Account 元数据接口，因此：

- 无 Usage 卡片。
- 无 Account 卡片。
- 无历史折线图。
- 无数据推算。
- 无模拟数据。
- 无对应接口请求。

新增数据展示前，必须先确认官方文档中存在对应接口与字段。

### Provider 边界

`ApiProvider` 只暴露一个方法：

```ts
getDashboard(apiKey: string, signal?: AbortSignal): Promise<DashboardData>
```

`DashboardData` 当前仅包含：

```text
provider
fetchedAt
balance
models
```

新增 Provider 时：

1. 实现 `ApiProvider`。
2. 在 `src/providers/index.ts` 注册。
3. 在 `public/_headers` 的 `connect-src` 加入其官方 API 域名。
4. 确认接口支持浏览器 CORS。
5. 不得引入代理或后端。

### CORS 与失败处理

当前两个接口的 CORS 预检通过。若未来失效：

- 不增加 Worker / Proxy。
- 在界面上明确报告 CORS/网络错误。
- 保留纯静态架构。
- 不伪造数据。

超时、401、403、429、5xx、网络失败和 JSON 格式异常都会转为本地化错误提示，不包含 API Key。

### 构建与部署

```text
GitHub push
   ↓
Cloudflare Pages
   ↓
npm install
   ↓
npm run build
   ↓
dist/
   ↓
Static assets on Cloudflare Pages
```

Cloudflare Pages 设置：

```text
Framework preset:        Vite
Production branch:       main
Build command:           npm run build
Build output directory:  dist
Root directory:          /
```

不使用 Wrangler，不上传 Worker。

---

## English

### Overview

```text
GitHub Public Repository
        │
        │ Git integration
        ▼
Cloudflare Pages
        │
        │ serves static HTML / CSS / JS / fonts
        ▼
User Browser
        │
        │ API key in JavaScript memory
        │ direct HTTPS request with Authorization header
        ▼
Official DeepSeek API
        │
        │ real JSON response
        ▼
Browser renders balance + models
```

This site has:

- No backend server.
- No Cloudflare Worker.
- No API proxy.
- No serverless function.
- No Pages Functions.
- No database, KV, D1, or R2.
- No analytics or error-tracking service.

### Deployment boundary

Cloudflare Pages serves static files only. It never receives the entered API key and never participates in DeepSeek requests.

```text
Static downloads: Browser → Cloudflare Pages
API queries:      Browser → api.deepseek.com
Purchase support: Browser → t.me / www.paypal.com (after a click)
PayPal images:    Browser → www.paypalobjects.com (static SVGs only)
```

Not present:

```text
Browser → this site's backend / Worker → api.deepseek.com
```

### Frontend modules

```text
src/
├── App.tsx                 page state and in-memory key lifecycle
├── config.ts               repo, Telegram, PayPal URLs, 100/95 rate
├── i18n/                   bilingual copy and error keys
├── providers/
│   ├── deepseek.ts         the only official API client
│   ├── index.ts            provider registry
│   └── types.ts            balance + models data types only
├── pages/
│   ├── Home.tsx            landing, connect form, privacy, GitHub proof
│   └── DashboardPage.tsx   balance + models dashboard
├── components/
│   ├── BalanceCard.tsx     renders official balance_infos
│   ├── ModelsTable.tsx     renders official /models
│   ├── ApiKeyInput.tsx     memory input, show/hide, paste, clear
│   ├── ErrorAlert.tsx      localized error display
│   ├── GitHubProof.tsx     homepage open-source proof
│   ├── PurchaseSection.tsx promotion, Telegram, PayPal form
│   └── ...
├── lib/
│   ├── errors.ts           error types with no key material
│   ├── security.ts         key normalization + legacy cleanup
│   ├── storage.ts          theme/language preferences only
│   └── format.ts
└── main.tsx
```

### Data flow

1. The user enters an API key.
2. The user clicks Connect.
3. `src/providers/deepseek.ts` makes browser requests directly to:
   - `GET https://api.deepseek.com/models`
   - `GET https://api.deepseek.com/user/balance`
4. The key is placed only in the `Authorization: Bearer …` header.
5. Real JSON is parsed and balance/models are rendered.
6. Reloading the page clears React memory; the key must be entered again.
7. Clear Key clears memory, aborts the active request, and returns home.

### Purchase promotion and payment boundary

- The homepage `PurchaseSection` displays a Telegram support link and PayPal's official hosted form.
- Telegram opens `https://t.me/+mErIcVI3_R4zMDE1` in a new tab.
- The PayPal form posts directly to `https://www.paypal.com/ncp/payment/CMTG9BPF9Z2KG`; no site backend is involved.
- The site loads only two static PayPal brand SVGs from PayPal. It loads no PayPal scripts and handles no payment data.
- The top-up calculator keeps its value in local React state only. It is not persisted, submitted, or inserted into PayPal.
- The 95% rule is `credit = top-up × 100/95`; for example, pay USD 95 and receive USD 100.
- The PayPal item is `VARIABLE_PRICE`; the buyer enters their chosen amount on PayPal.
- After payment, the seller reconciles the amount and sends an API key with the corresponding credit through Telegram. This site does not receive, store, or display purchased keys.
- This is a manual reconciliation and delivery flow, not an automatic PayPal discount. The seller must honour the amount actually paid.
- The API key, balance, and model data are not added to the Telegram link or the PayPal form.
- Never inject an amount or alter the PayPal action from the frontend to bypass PayPal pricing.

### Confirmed data only

The current public DeepSeek API has no usage-history or account-metadata endpoints, so there are:

- No Usage cards.
- No Account cards.
- No historical charts.
- No inferred values.
- No simulated data.
- No request code for unsupported endpoints.

Before adding any new data, confirm the endpoint and fields in the official documentation.

### Provider boundary

`ApiProvider` exposes one method:

```ts
getDashboard(apiKey: string, signal?: AbortSignal): Promise<DashboardData>
```

`DashboardData` currently contains only:

```text
provider
fetchedAt
balance
models
```

To add a provider:

1. Implement `ApiProvider`.
2. Register it in `src/providers/index.ts`.
3. Add the provider's official API origin to `connect-src` in `public/_headers`.
4. Confirm browser CORS support.
5. Never introduce a proxy or backend.

### CORS and failures

Both endpoints currently pass CORS preflight. If that changes:

- Do not add a Worker or proxy.
- Report the CORS/network error in the UI.
- Keep the architecture fully static.
- Never fabricate data.

Timeouts, 401, 403, 429, 5xx, network failures, and malformed JSON become localized error messages without the API key.

### Build and deployment

```text
GitHub push
   ↓
Cloudflare Pages
   ↓
npm install
   ↓
npm run build
   ↓
dist/
   ↓
Static assets on Cloudflare Pages
```

Cloudflare Pages settings:

```text
Framework preset:        Vite
Production branch:       main
Build command:           npm run build
Build output directory:  dist
Root directory:          /
```

No Wrangler and no Worker upload.
