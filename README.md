# Keylight — 纯静态 API Dashboard

> 一个完全静态、无后端、无 Worker、无代理的 DeepSeek API Dashboard。  
> API Key 默认只存在于浏览器内存中；所有 API 请求由浏览器直接发往 DeepSeek 官方 API。

最终部署链路：

```text
GitHub Repository
        ↓
Cloudflare Pages（只托管静态文件）
        ↓
用户浏览器（API Key 留在内存中）
        ↓
https://api.deepseek.com（官方 API）
```

本项目没有任何服务器端组件。Cloudflare Pages 不接收、不转发、不保存用户 API Key，也不参与 API 请求。

---

## 1. 当前 DeepSeek API 调研结论

调研与 CORS 实测日期：**2026-10-25**。  
依据：

- [DeepSeek API Docs — Your First API Call](https://api-docs.deepseek.com/)
- [DeepSeek API Docs — Lists Models](https://api-docs.deepseek.com/api/list-models)
- [DeepSeek API Docs — Get User Balance](https://api-docs.deepseek.com/api/get-user-balance)
- [DeepSeek API Docs — Error Codes](https://api-docs.deepseek.com/quick_start/error_codes)

### 1.1 当前可用的官方接口

| 数据 | 官方接口 | 本项目状态 |
| --- | --- | --- |
| 模型列表及元数据 | `GET https://api.deepseek.com/models` | 支持，动态读取 |
| 账户余额 | `GET https://api.deepseek.com/user/balance` | 支持，动态读取 |
| Usage / Token 消耗 | 当前公开文档未提供 | 显示 Unavailable |
| Usage 历史折线图 | 当前公开文档未提供 | 不绘制，不伪造 |
| Account / Plan / 创建时间 | 当前公开文档未提供 | 显示 N/A |

鉴权方式：官方文档使用 `Authorization: Bearer <API_KEY>`。

模型列表完全来自 `/models` 的实时响应，没有硬编码模型名。余额完全来自 `/user/balance`，没有估算或汇率换算。

### 1.2 余额响应字段（来自当前官方文档）

```json
{
  "is_available": true,
  "balance_infos": [
    {
      "currency": "USD",
      "total_balance": "12.84",
      "granted_balance": "2.50",
      "topped_up_balance": "10.34"
    }
  ]
}
```

- 支持 `USD` / `CNY`，页面会显示 API 返回的全部币种。
- `is_available` 用于显示账户当前是否可调用 API。
- 不做任何货币换算。

### 1.3 CORS 实测结果

浏览器直连的关键前提是官方 API 支持 CORS。本项目在 **2026-10-25** 对两个实际使用的接口做了预检请求测试：

```bash
curl -i -X OPTIONS https://api.deepseek.com/models \
  -H "Origin: https://example.pages.dev" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: authorization"

curl -i -X OPTIONS https://api.deepseek.com/user/balance \
  -H "Origin: https://example.pages.dev" \
  -H "Access-Control-Request-Method: GET" \
  -H "Access-Control-Request-Headers: authorization"
```

两个接口均返回 `HTTP 200`，并包含：

```text
access-control-allow-origin: https://example.pages.dev
access-control-allow-methods: GET
access-control-allow-headers: authorization
access-control-allow-credentials: true
```

因此当前 DeepSeek 官方 API 可以由浏览器直接跨域调用，本项目可以保持完全静态。

> 官方服务策略可能变化。如果未来 CORS 被关闭，页面会报告 “Browser request blocked or offline”。本项目**不会**为了绕过 CORS 增加 Worker、Serverless Function 或任何代理。

### 1.4 真实错误响应验证

使用无效测试 Key 实际请求 `/models`：

- 浏览器成功读取官方 API 的 `401` 响应。
- 页面显示 “Invalid API key / DeepSeek rejected this key.”
- 网络请求只发往 `https://api.deepseek.com`。
- Key 没有出现在 URL、查询参数、Hash、console 或 localStorage 中。

---

## 2. 功能

- Provider 架构，首版支持 DeepSeek，可扩展新 Provider。
- API Key 输入：
  - `type="password"`；
  - Show / Hide；
  - Paste from clipboard；
  - Clear；
  - 默认只在 React 内存中。
- 可选 “Remember on this device”：
  - 默认关闭；
  - 只有用户主动开启后才写入 `localStorage`；
  - 重新打开页面会预填，但不会自动发起 API 请求。
- Dashboard：
  - 实时余额、赠金、充值余额、可用状态；
  - 动态模型列表、上下文窗口、最大输出、模态与状态；
  - Account 不可用字段明确显示 N/A；
  - Usage 与历史图表不可用状态；
  - Refresh；
  - Clear API key；
  - 自动刷新 Off / 1 min / 5 min / 15 min，默认 Off；
  - Last updated 相对时间；
  - Light / Dark / System 三种主题；
  - 桌面与移动端布局；
  - Skeleton loading、错误提示、空状态。
- 安全：
  - 无 Analytics / Tracking；
  - 无后端接口；
  - 无 `/api/*`；
  - 无 Worker / Wrangler；
  - 无数据库、KV、D1、R2；
  - CSP 限制 `connect-src` 只允许本站与 `https://api.deepseek.com`。

---

## 3. 技术栈

- React 18
- TypeScript（strict）
- Vite 6
- Tailwind CSS 3
- Lucide React
- Recharts 3（仅在 Provider 返回真实历史数据时按需加载）
- 自托管可变字体：Manrope / JetBrains Mono

构建目标是纯静态文件：

```text
dist/
├── index.html
├── assets/
├── _headers
├── favicon.svg
├── robots.txt
└── theme-init.js
```

---

## 4. 数据流与安全边界

### 4.1 允许的请求路径

```text
用户浏览器
   │
   │ GET https://api.deepseek.com/models
   │ Authorization: Bearer <key>
   ▼
DeepSeek 官方 API
```

```text
用户浏览器
   │
   │ GET https://api.deepseek.com/user/balance
   │ Authorization: Bearer <key>
   ▼
DeepSeek 官方 API
```

请求通过 `fetch()` 发起，关键设置：

```ts
fetch('https://api.deepseek.com/models', {
  method: 'GET',
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${apiKey}`,
  },
  cache: 'no-store',
  credentials: 'omit',
  referrerPolicy: 'no-referrer',
})
```

### 4.2 禁止且不存在的数据路径

```text
浏览器 → 本站服务器 → DeepSeek      ❌ 不存在
浏览器 → Cloudflare Worker → DeepSeek ❌ 不存在
浏览器 → API Proxy → DeepSeek       ❌ 不存在
```

本仓库没有：

```text
functions/
server/
backend/
worker/
wrangler.toml
wrangler.json
/api/
/api/dashboard
/api/balance
/api/usage
/api/models
```

所有检查都已确认：项目里唯一的生产 `fetch()` 位于 `src/providers/deepseek.ts`，目标是官方 API 固定路径。

---

## 5. 本地开发

推荐 Node.js 22 LTS。仓库包含 `.nvmrc`。

```bash
npm install
npm run dev
```

本地地址通常为：

```text
http://localhost:5173
```

Vite 仅提供本地开发服务器和 HMR，不充当 API 后端，也未配置 proxy。浏览器仍然直接请求 DeepSeek。

### 构建

```bash
npm run build
```

等价于：

```bash
tsc -b && vite build
```

构建成功后会生成 `dist/`。可在本地预览：

```bash
npm run preview
```

### 类型检查

```bash
npm run typecheck
```

---

## 6. GitHub → Cloudflare Pages 自动部署

### Step 1：推送到 GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

仓库根目录直接就是项目根目录，不存在多套一层无意义的目录。

### Step 2：在 Cloudflare 创建 Pages 项目

```text
Cloudflare Dashboard
  → Workers & Pages
  → Create application
  → Pages
  → Connect to Git
  → GitHub
  → 选择 Repository
```

### Step 3：构建配置

```text
Production branch:        main
Framework preset:         Vite
Build command:            npm run build
Build output directory:   dist
Root directory:           /
```

- 不需要配置 Worker。
- 不需要配置 Pages Functions。
- 不需要配置 API Route。
- 不需要 `wrangler deploy`。
- 不需要手动上传 `dist`。
- 不需要任何 API Key 环境变量。

如果 Cloudflare 构建镜像提示 Node 版本问题，可将 `NODE_VERSION` 设为 `22`（非敏感配置）。`.nvmrc` 已包含 `22`。不要配置 `DEEPSEEK_API_KEY` 之类的环境变量，每个用户都应在页面里输入自己的 Key。

### Step 4：自动发布

首次部署成功后，后续只需：

```bash
git add .
git commit -m "update"
git push
```

Cloudflare Pages 会自动检测 GitHub 提交，执行 `npm install` / `npm run build`，并发布新的 `dist`。

第一版不需要 GitHub Actions；安装、构建和部署均由 Cloudflare Pages 的 Git Integration 完成。

---

## 7. API Key 隐私模型

### 默认行为

- Key 只存在于 React 组件的 JavaScript 内存中。
- 默认不写 `localStorage`。
- 默认不写 `sessionStorage`。
- 不写 Cookie。
- 不进入 URL、Query String、Hash。
- 不进入 `console.log` / `console.error`。
- 不进入错误信息。
- 不发送到本站域名、本站服务器、Worker、KV、D1、R2，也不发送给任何统计或错误追踪服务。
- 只作为 `Authorization` 请求头发送到 DeepSeek 官方 API。

### 可选的本地保存

“Remember on this device” 默认关闭。只有用户勾选并成功连接后，才会保存：

```text
localStorage["keylight.api-key.v1"]
```

这是用户自己浏览器的本地纯文本存储，不会上传到服务器。请只在可信设备上开启。

重新载入页面时会预填该 Key，但**不会自动调用 API**，仍需用户点击 Connect。

### Clear API key

点击 Dashboard 的 “Clear key”，或 Settings 中的 “Clear API key & local data”：

- 清空内存中的当前 Key（React state）；
- 中止正在进行的刷新；
- 删除本项目所有 `keylight.*` 开头的 `localStorage` 项；
- 删除本项目所有 `keylight.*` 开头的 `sessionStorage` 项；
- 重置主题为 System、自动刷新为 Off；
- 不触碰其他站点数据，也不设置 Cookie。

### 主题与偏好

主题与自动刷新偏好会写入 localStorage（非敏感数据），但 `Clear key` 会一并清除它们。

---

## 8. 错误处理

`src/lib/errors.ts` 将 Provider 状态映射为用户可读错误，绝不回显请求头或原始响应体：

| HTTP / 情况 | 页面提示 |
| --- | --- |
| 401 | Invalid API key |
| 402 | Insufficient balance |
| 403 | Permission denied |
| 404 | Endpoint unavailable |
| 429 | Too many requests |
| 5xx | Provider unavailable |
| 超时 | Request timed out |
| 网络 / CORS | Browser request blocked or offline |
| 响应格式异常 | Unexpected API response |

CORS 错误文案会明确说明：

> The browser could not read a response from DeepSeek. This can be caused by a network problem or a CORS policy. This static app has no proxy and cannot bypass browser restrictions.

不会为了 CORS 增加代理，也不会把请求改为本站接口。

---

## 9. 静态安全响应头

`public/_headers` 会被 Vite 复制到 `dist/_headers`，由 Cloudflare Pages 作为静态响应头应用。

包含：

- `Content-Security-Policy`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `Referrer-Policy: no-referrer`
- `Permissions-Policy`
- `Cross-Origin-Opener-Policy`
- `Cross-Origin-Resource-Policy`
- `Strict-Transport-Security`
- 静态资源长期缓存

CSP 关键限制：

```text
script-src 'self';
connect-src 'self' https://api.deepseek.com;
font-src 'self' data:;
img-src 'self' data:;
style-src 'self' 'unsafe-inline';
```

> 添加新的 Provider 时，必须显式把该 Provider 的**官方 API 域名**加入 `connect-src`。永远不要把代理、Worker 或本站 API 加进去。

生产构建已使用带 CSP 的本地静态服务器验证：

- 无 CSP violation；
- 字体正常加载；
- 只有官方 API 与本站静态资源请求；
- 无 JavaScript 异常；
- 真实 401 错误可正确显示。

---

## 10. 安全与网络审计结果

### 代码搜索

已检查项目中的：

```text
console.log
console.error
Authorization
fetch(
axios
localStorage
sessionStorage
document.cookie
/api/
worker
wrangler
```

结果：

- 无 `console.log` / `console.error` / `console.*`。
- 无 `axios`。
- 无 `document.cookie`。
- 无 `/api/` 后端路由。
- 无 `wrangler` 配置或部署步骤。
- 唯一生产 `fetch()` 直连 `https://api.deepseek.com`。
- 唯一会写入 credential 的位置是显式开启 Remember 后的 `localStorage`。
- Key 不进入 URL、Query、Hash、日志、错误消息。
- 无 Analytics、错误追踪、统计 SDK。
- 字体自托管，无 Google Fonts 或其他第三方字体请求。
- 除 DeepSeek 官方 API 外，没有第三方网络请求；不存在追踪类请求。

### 浏览器 Network 审计

使用真实 401 测试与本地生产构建验证，网络请求包括：

```text
http://<local-preview>/
http://<local-preview>/theme-init.js
http://<local-preview>/favicon.svg
https://api.deepseek.com/models        OPTIONS
https://api.deepseek.com/models        GET
```

没有出现：

```text
https://your-domain/api/...
https://your-server/...
https://worker...
?apiKey=...
sk-...
```

### 本地保存实测

| 场景 | localStorage | 请求 |
| --- | --- | --- |
| 默认连接（Remember 关闭） | 无 API Key | 只到官方 API |
| 勾选 Remember 后连接 | 仅保存用户主动确认的 Key | 只到官方 API |
| 刷新页面 | 预填 Key，但不会自动发请求 | 无新增 API 请求 |
| 取消 Remember | 立即移除 Key | 无 |
| Clear key | 清空所有 `keylight.*` 项 | 中止进行中的请求 |

---

## 11. Provider 架构

```text
src/providers/
├── types.ts       # ApiProvider / DashboardData / capabilities
├── deepseek.ts    # DeepSeek 官方 API 实现
└── index.ts       # Provider registry
```

接口：

```ts
interface ApiProvider {
  meta: ProviderMeta
  validateApiKey(apiKey: string, signal?: AbortSignal): Promise<void>
  getDashboard(apiKey: string, signal?: AbortSignal): Promise<DashboardData>
}
```

DeepSeek Provider 通过 `/models` 同时完成认证校验和模型读取；余额请求失败时不会编造余额。

### 添加新 Provider 时

1. 新建 `src/providers/<name>.ts` 并实现 `ApiProvider`。
2. 在 `src/providers/index.ts` 注册。
3. 在 `public/_headers` 的 `connect-src` 加入该 Provider 的官方 API 域名。
4. 仅使用官方公开 API；不得增加代理。
5. 如果官方 API 不支持 CORS，保留不可用状态，明确提示，不加 Worker。

---

## 12. 数据真实性原则

本项目坚持只展示 Provider 真实返回的数据：

- 余额：直接来自 `/user/balance`，不做估算。
- 模型：直接来自 `/models`，不硬编码。
- Account：当前 DeepSeek API 不提供 plan/account ID/created at，显示 N/A。
- Usage：当前 DeepSeek API 不提供用量与历史，显示 Unavailable。
- Usage Chart：无真实历史数据时不绘制；有数据时才按需加载 Recharts。
- Provider 返回异常格式时显示错误，不猜测字段。

---

## 13. 项目结构

```text
.
├── index.html
├── package.json
├── package-lock.json
├── vite.config.ts
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── tailwind.config.ts
├── postcss.config.js
├── .nvmrc
├── .gitignore
├── README.md
├── public/
│   ├── _headers
│   ├── theme-init.js
│   ├── favicon.svg
│   └── robots.txt
└── src/
    ├── App.tsx
    ├── main.tsx
    ├── index.css
    ├── components/
    │   ├── AccountCard.tsx
    │   ├── ApiKeyInput.tsx
    │   ├── BalanceCard.tsx
    │   ├── Brand.tsx
    │   ├── DashboardSkeleton.tsx
    │   ├── ErrorAlert.tsx
    │   ├── Footer.tsx
    │   ├── Header.tsx
    │   ├── ModelsTable.tsx
    │   ├── ProviderGlyph.tsx
    │   ├── ProviderSelector.tsx
    │   ├── Settings.tsx
    │   ├── ThemeToggle.tsx
    │   ├── UsageCard.tsx
    │   ├── UsageChart.tsx
    │   └── UsageHistoryChart.tsx
    ├── hooks/
    │   ├── useNow.ts
    │   └── useTheme.ts
    ├── lib/
    │   ├── cn.ts
    │   ├── errors.ts
    │   ├── format.ts
    │   ├── security.ts
    │   └── storage.ts
    ├── pages/
    │   ├── DashboardPage.tsx
    │   └── Home.tsx
    └── providers/
        ├── deepseek.ts
        ├── index.ts
        └── types.ts
```

---

## 14. 已验证事项

- [x] `npm install` 成功。
- [x] `npm run build` 成功，生成 `dist/`。
- [x] TypeScript strict 编译通过。
- [x] 桌面 1440px、1024px 布局通过。
- [x] 平板 768px 布局通过。
- [x] 移动端 375px / 390px / 414px 无横向溢出。
- [x] Light / Dark / System。
- [x] Skeleton loading。
- [x] 真实 401 错误处理。
- [x] 余额与模型动态渲染。
- [x] Show / Hide / Paste / Clear。
- [x] Remember 默认关闭。
- [x] 用户主动开启后才保存到 localStorage。
- [x] Clear key 清除内存与全部本项目 local/session storage。
- [x] 页面刷新不会自动发送已记住的 Key。
- [x] 无 console 输出。
- [x] 无 Analytics / Cookie / 追踪请求；第三方请求仅限 DeepSeek 官方 API。
- [x] CSP 生产环境验证通过。
- [x] 浏览器只直连官方 API。
- [x] 无 Worker / Wrangler / 后端 / 数据库。

---

## 15. 常见问题

### 为什么没有 Usage 图表？

DeepSeek 当前公开 API 没有提供消费历史接口。为了让页面“看起来完整”而画假曲线，会违反本项目的数据真实性原则。只要未来官方提供真实历史接口，`UsageHistoryChart` 可以直接接收数据。

### 为什么 Account ID 是 N/A？

当前公开 API 不提供 Account ID、Plan、创建时间。项目不会自行生成这些字段。

### 出现 CORS 错误怎么办？

先确认官方 API 当前是否允许浏览器跨域请求。如果不允许，在纯静态无代理架构下无法绕过。请不要新增 Worker Proxy；保持纯静态并如实显示限制。

### 部署后 API 请求会经过 Cloudflare Pages 吗？

不会。Cloudflare Pages 只返回 HTML/CSS/JS 等静态资产。点击 Connect 后，浏览器直接向 `https://api.deepseek.com` 发起请求。

### 需要配置 API Key 环境变量吗？

不需要。每个用户在自己的浏览器中输入自己的 Key。不要把任何真实 Key 写入仓库、`.env` 或 Cloudflare 环境变量。

---

## 16. 安全提交前检查

```bash
git status --short
git grep -nE "sk-[A-Za-z0-9_-]{12,}" || true
git grep -n "console\." || true
git grep -n "wrangler" || true
```

确认 `.env`、`.env.local`、`.env.production` 未被提交。`.gitignore` 已忽略环境文件。

---

## 17. License

本仓库为纯前端示例项目。DeepSeek 名称与相关接口归其权利人所有。Keylight 不是 DeepSeek 官方产品。
