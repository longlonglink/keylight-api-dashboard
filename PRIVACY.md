# 隐私声明 / Privacy Policy

[简体中文](#简体中文) · [English](#english)

最后更新 / Last updated: 2026-10-26

---

## 简体中文

### 1. 没有本站后端

KeyLight 是部署在 Cloudflare Pages 上的纯静态站点，没有后端 API、Cloudflare Worker、Serverless Function、API Proxy、数据库、KV、D1 或 R2。

Cloudflare Pages 只负责向浏览器提供 HTML、CSS、JavaScript、字体和图标等静态文件，不处理 DeepSeek API 查询。

### 2. API Key 如何处理

- 用户输入的 API Key 只保存在当前页面的 JavaScript 内存中。
- 默认不写入 `localStorage`。
- 不写入 `sessionStorage`。
- 不写入 Cookie。
- 不写入 URL、查询参数或 Hash。
- 不输出到 `console`、日志或错误信息。
- 不发送到本站域名、维护者服务器、Worker、数据库、KV 或任何统计/错误追踪服务。
- 刷新页面或关闭标签页后，内存中的 Key 即丢失，用户必须重新输入。

浏览器发起 API 请求时，Key 只放在发往 DeepSeek 官方 API 的 `Authorization` 请求头中：

```http
GET https://api.deepseek.com/user/balance
Authorization: Bearer <USER_API_KEY>
```

DeepSeek 作为服务商必然能够看到为鉴权而发送的 Key。本项目只能保证 Key 不经过本站服务器。

### 3. 旧版本存储清理

较早的 KeyLight 版本曾提供可选的“记住 Key”功能。当前版本不包含该功能，并且会在启动时主动删除旧版本可能留下的 `keylight.api-key*` / `keylight.remembered-key*` 存储项。

当前版本没有任何写入 API Key 到浏览器持久化存储的代码。

### 4. 浏览器中唯一保留的本地偏好

主题（`keylight.theme.v1`）和语言（`keylight.language.v1`）偏好会写入用户自己的 `localStorage`。它们不是敏感数据，也不包含 API Key、余额或任何 API 响应。自动刷新开关和刷新间隔只存在当前页面内存中，刷新或关闭页面后恢复为 OFF / 30 秒。

### 5. 获取并展示的数据

本应用只请求当前 DeepSeek 公开文档确认存在的两个只读接口：

- `GET https://api.deepseek.com/models`
- `GET https://api.deepseek.com/user/balance`

返回的余额和模型数据只用于当前页面渲染，保存在当前页面的 React state 中，不会被本站上传或持久化。

本项目不请求、不展示也不推断：

- Usage 历史或 Token 消耗统计。
- 账户 ID、套餐、等级、注册时间。
- 历史余额变化。
- 任何模拟或估算数据。

### 6. 第一方追踪与第三方广告

- 本站不集成本站自己的 Analytics、错误上报、热图或其他第一方追踪。
- 字体自托管，不请求 Google Fonts 等第三方字体服务。
- 页面在 `<head>` 中加载 Google AdSense（发布商 ID `ca-pub-2541823251578668`）以展示广告。Google 可能设置或读取 Cookie，收集 IP 地址、设备/浏览器信息、近似位置和广告互动数据，并按 Google 的政策与用户同意情况展示个性化或非个性化广告。
- 本站无法控制 Google 的 Cookie 或数据处理；适用 Google 自己的隐私政策。EEA、英国、瑞士等地区的广告同意/CMP 必须在 Google AdSense 后台配置，本静态项目不包含自定义 CMP。
- 本站自己的代码不设置 Cookie；但 Google AdSense 可能设置或读取 Cookie。
- 本站主动发往 DeepSeek 的请求只包含 Authorization 头和 API 路径，不包含页面正文。本站不会主动把 API Key、余额或模型数据加入广告请求。
- Google AdSense 是运行在页面中的第三方脚本，可能访问页面 DOM。如果你不接受第三方广告脚本访问页面内容，请不要使用本站。
- 用户点击 Telegram 或 Discord 后会主动离开本站；点击广告也会离开本站，适用相应平台的隐私政策。

### 7. 社区与外部链接

- 本站不处理付款，不提供结账页、付款表单或站内支付。
- API Access 9 折信息仅作宣传；详情和任何交易在本站之外的 Telegram 或 Discord 社区进行。
- 用户点击 Telegram 会打开 `https://t.me/+mErIcVI3_R4zMDE1`，点击 Discord 会打开 `https://discord.gg/UEZGQTTDj`。
- API Key、余额和模型数据不会被加入 Telegram、Discord 链接，也不会发送到任何社区。
- 本站不接收、不保存、不展示社区内发送的 API Key。
- 本站无法控制 Telegram、Discord 或社区交易的隐私、价格、履约或退款实践；请自行核对。

### 8. 网络请求边界

允许的网络请求：

```text
浏览器 → Cloudflare Pages（静态资源）
浏览器 → https://api.deepseek.com（官方 API）
浏览器 → Google AdSense / Google 广告域名（广告脚本与广告内容）
用户点击后 → https://t.me / https://discord.gg（外部社区页面）
用户点击广告后 → Google 广告页面
```

不存在：

```text
浏览器 → 本站后端 / Worker / Proxy → DeepSeek
浏览器 → 本站后端 → 支付服务
```

### 9. 安全边界

纯静态前端无法防止以下风险：

- 用户设备或浏览器本身已被恶意软件控制。
- 恶意浏览器扩展读取页面内容。
- 用户自行泄露 API Key。
- DeepSeek 服务端、网络链路或浏览器实现中的漏洞。
- Google AdSense 等第三方脚本访问页面 DOM、设置 Cookie 或按其政策处理数据。

本项目通过最小化数据、CSP、限制第三方脚本和无本地 Key 持久化来降低风险，但不承诺绝对安全；Google AdSense 是页面上唯一的第三方广告脚本。

### 10. 仓库与审计

完整源码：

<https://github.com/longlonglink/keylight-api-dashboard>

你可以直接检查 `src/providers/deepseek.ts`、`src/lib/security.ts`、`src/i18n/translations.ts` 与浏览器 Network 面板，验证上述声明。

---

## English

### 1. No backend for this site

KeyLight is a fully static site hosted on Cloudflare Pages. It has no backend API, Cloudflare Worker, serverless function, API proxy, database, KV, D1, or R2.

Cloudflare Pages only serves static HTML, CSS, JavaScript, fonts, and icons. It does not process any DeepSeek API query.

### 2. How the API key is handled

- An entered API key is held only in JavaScript memory on the current page.
- It is never written to `localStorage`.
- It is never written to `sessionStorage`.
- It is never written to a cookie.
- It is never placed in the URL, query string, or hash.
- It is never emitted to `console`, logs, or error messages.
- It is never sent to this site's domain, a maintainer server, Worker, database, KV store, or any analytics/error-tracking service.
- Reloading the page or closing the tab discards the in-memory key; the user must enter it again.

When the browser makes an API request, the key is placed only in the `Authorization` header sent to DeepSeek's official API:

```http
GET https://api.deepseek.com/user/balance
Authorization: Bearer <USER_API_KEY>
```

DeepSeek necessarily sees the key as part of authentication. This project guarantees only that the key does not pass through any server belonging to this site.

### 3. Cleanup of legacy storage

Earlier KeyLight versions once offered an optional remember-key feature. The current version has no such feature and proactively removes any `keylight.api-key*` / `keylight.remembered-key*` entries that an older version may have left behind.

The current version contains no code that persists an API key in browser storage.

### 4. The only local preferences

Theme (`keylight.theme.v1`) and language (`keylight.language.v1`) preferences are stored in the user's own `localStorage`. They are not sensitive and contain no API key, balance, or API response. Auto-refresh state and interval live only in page memory and reset to OFF / 30 seconds after a reload.

### 5. Data that is requested and displayed

The app calls only two read-only endpoints confirmed by the current public DeepSeek documentation:

- `GET https://api.deepseek.com/models`
- `GET https://api.deepseek.com/user/balance`

Returned balance and model data is used only for rendering the current page and is held in that page's React state. It is not uploaded to or persisted by this site.

The project does not request, display, or infer:

- Usage history or token-consumption totals.
- Account ID, plan, tier, or creation time.
- Historical balance changes.
- Any simulated or estimated data.

### 6. First-party tracking and third-party ads

- The site does not run its own analytics, error reporting, heatmaps, or other first-party tracking.
- Fonts are self-hosted; no Google Fonts or other third-party font requests.
- The page loads Google AdSense (publisher ID `ca-pub-2541823251578668`) from the `<head>` to display ads. Google may set or read cookies and collect IP address, device/browser information, approximate location, and ad-interaction data, and may serve personalized or non-personalized ads under Google's policies and the user's consent choices.
- This site does not control Google's cookies or data processing; Google's own privacy policy applies. Ad consent/CMP for the EEA, UK, and Switzerland must be configured in the AdSense account; this static project does not include a custom CMP.
- This site's own code sets no cookies, but Google AdSense may set or read cookies.
- Requests the site sends to DeepSeek contain only the Authorization header and API path, with no page body. The site does not intentionally add the API key, balance, or model data to ad requests.
- Google AdSense is a third-party script running in the page and may access the page DOM. If you do not accept third-party ad scripts accessing page content, do not use this site.
- Clicking Telegram or Discord intentionally leaves this site. Clicking an ad also leaves this site; the relevant platform's privacy policy applies.

### 7. Community and external links

- This site does not process payments and provides no checkout, payment form, or on-site payment.
- The 10% API Access offer is promotional. Details and any transaction are handled outside this site through Telegram or Discord.
- Telegram opens `https://t.me/+mErIcVI3_R4zMDE1`; Discord opens `https://discord.gg/UEZGQTTDj`.
- The API key, balance, and model data are not appended to Telegram or Discord links and are not sent to either community.
- This site does not receive, store, or display API keys sent inside a community.
- This site does not control the privacy, pricing, fulfillment, or refund practices of Telegram, Discord, or community transactions. Verify details independently.

### 8. Network boundary

Allowed:

```text
Browser → Cloudflare Pages (static assets)
Browser → https://api.deepseek.com (official API)
Browser → Google AdSense / Google advertising domains (ad script and ad content)
After a click → https://t.me / https://discord.gg (external community pages)
After an ad click → Google advertising pages
```

Not present:

```text
Browser → this site's backend / Worker / proxy → DeepSeek
Browser → this site's backend → payment service
```

### 9. Security limitations

A static frontend cannot protect against:

- A compromised device or browser.
- Malicious browser extensions reading page content.
- A user disclosing their API key.
- Vulnerabilities in DeepSeek's servers, the network path, or browser implementations.
- Third-party scripts such as Google AdSense accessing the page DOM, setting cookies, or processing data under their own policies.

This project reduces risk through data minimization, CSP, limited third-party scripts, and no persistent key storage. It does not promise absolute security; Google AdSense is the only third-party advertising script on the page.

### 10. Repository and audit

Full source code:

<https://github.com/longlonglink/keylight-api-dashboard>

Inspect `src/providers/deepseek.ts`, `src/lib/security.ts`, `src/i18n/translations.ts`, and the browser Network panel to verify the statements above.
