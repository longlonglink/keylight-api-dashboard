# 隐私声明 / Privacy Policy

[简体中文](#简体中文) · [English](#english)

最后更新 / Last updated: 2026-10-26

---

## 简体中文

### 1. 没有本站后端

Keylight 是部署在 Cloudflare Pages 上的纯静态站点，没有后端 API、Cloudflare Worker、Serverless Function、API Proxy、数据库、KV、D1 或 R2。

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

较早的 Keylight 版本曾提供可选的“记住 Key”功能。当前版本不包含该功能，并且会在启动时主动删除旧版本可能留下的 `keylight.api-key*` / `keylight.remembered-key*` 存储项。

当前版本没有任何写入 API Key 到浏览器持久化存储的代码。

### 4. 浏览器中唯一保留的本地偏好

主题（`keylight.theme.v1`）和语言（`keylight.language.v1`）偏好会写入用户自己的 `localStorage`。它们不是敏感数据，也不包含 API Key、余额或任何 API 响应。

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

### 6. 无追踪

- 不集成 Google Analytics、Sentry、PostHog、Mixpanel、Microsoft Clarity、Hotjar 等。
- 不设置追踪 Cookie。
- 字体自托管，不请求 Google Fonts 等第三方字体服务。
- 首页购买区会加载两张来自 `https://www.paypalobjects.com` 的静态 PayPal 品牌 SVG 图片。本站不会加载 PayPal 脚本或追踪 SDK。
- 本站代码不设置 Cookie；这些第三方图片请求由 PayPal 的服务器处理，适用 PayPal 自己的隐私政策。
- 用户点击 Telegram 或 PayPal 后会主动离开本站；Telegram 和 PayPal 各自的隐私政策适用。

### 7. 支付与外部链接

- 首页的 PayPal 按钮是一个普通 HTML 表单，直接提交到 `https://www.paypal.com/ncp/payment/CMTG9BPF9Z2KG` 并在新标签页打开。
- 本站不接收、不处理、不存储银行卡号或 PayPal 登录信息。
- API Key、余额和模型数据不会被加入 Telegram 链接或 PayPal 表单。
- 用户点击 Telegram 按钮会打开外部邀请链接 `https://t.me/+mErIcVI3_R4zMDE1`。
- 充值计算器中的金额只保存在当前页面的本地 state，不写入存储、不发送到本站服务器，也不会自动填入 PayPal。
- 当前 PayPal 公开页面是可自定义金额的 `VARIABLE_PRICE` 商品；买家需要在 PayPal 页面自行输入 USD 充值金额。
- 人民币额度按 `USD 金额 × 参考汇率 × 100/95` 估算；参考汇率是 `src/config.ts` 中的静态配置值，不会请求第三方汇率服务。
- 本站无法控制第三方页面的价格、履约或隐私实践。最终扣款以 PayPal 结算页为准，最终汇率与额度以 Telegram 核实为准。
- 付款后用户加入 Telegram 群核实；核实完成后，商家私聊发送对应 API Key。
- 本站不接收、不保存、不展示通过 Telegram 私聊发放的已购 API Key。

### 8. 网络请求边界

允许的网络请求：

```text
浏览器 → Cloudflare Pages（静态资源）
浏览器 → https://api.deepseek.com（官方 API）
浏览器 → https://www.paypalobjects.com（PayPal 静态品牌图片）
用户点击后 → https://t.me / https://www.paypal.com（外部页面）
```

不存在：

```text
浏览器 → 本站后端 / Worker / Proxy → DeepSeek
浏览器 → 本站后端 → PayPal
```

### 9. 安全边界

纯静态前端无法防止以下风险：

- 用户设备或浏览器本身已被恶意软件控制。
- 恶意浏览器扩展读取页面内容。
- 用户自行泄露 API Key。
- DeepSeek 服务端、网络链路或浏览器实现中的漏洞。

本项目通过最小化数据、CSP、无第三方脚本和无本地 Key 持久化来降低风险，但不承诺绝对安全。

### 10. 仓库与审计

完整源码：

<https://github.com/longlonglink/keylight-api-dashboard>

你可以直接检查 `src/providers/deepseek.ts`、`src/lib/security.ts`、`src/i18n/translations.ts` 与浏览器 Network 面板，验证上述声明。

---

## English

### 1. No backend for this site

Keylight is a fully static site hosted on Cloudflare Pages. It has no backend API, Cloudflare Worker, serverless function, API proxy, database, KV, D1, or R2.

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

Earlier Keylight versions once offered an optional remember-key feature. The current version has no such feature and proactively removes any `keylight.api-key*` / `keylight.remembered-key*` entries that an older version may have left behind.

The current version contains no code that persists an API key in browser storage.

### 4. The only local preferences

Theme (`keylight.theme.v1`) and language (`keylight.language.v1`) preferences are stored in the user's own `localStorage`. They are not sensitive and contain no API key, balance, or API response.

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

### 6. No tracking

- No Google Analytics, Sentry, PostHog, Mixpanel, Microsoft Clarity, Hotjar, or similar services.
- No tracking cookies.
- Fonts are self-hosted; no Google Fonts or other third-party font requests.
- The homepage purchase section loads two static PayPal brand SVGs from `https://www.paypalobjects.com`. The site does not load PayPal scripts or tracking SDKs.
- This site's code sets no cookies; those third-party image requests are handled by PayPal's servers under PayPal's own privacy policy.
- Clicking Telegram or PayPal intentionally leaves this site. The privacy policies of Telegram and PayPal apply.

### 7. Payments and external links

- The PayPal button is a plain HTML form that posts directly to `https://www.paypal.com/ncp/payment/CMTG9BPF9Z2KG` and opens in a new tab.
- This site never receives, processes, or stores card details or PayPal login information.
- The API key, balance, and model data are not appended to the Telegram link or the PayPal form.
- The Telegram button opens the external invite link `https://t.me/+mErIcVI3_R4zMDE1`.
- The top-up amount in the calculator is kept only in local page state. It is not persisted, sent to this site's server, or automatically entered into PayPal.
- The public PayPal item is currently a `VARIABLE_PRICE` checkout, so the buyer enters their chosen USD amount on PayPal.
- CNY credit is estimated as `USD amount × reference rate × 100/95`. The reference rate is a static value in `src/config.ts`; the site does not call a third-party exchange-rate service.
- This site does not control third-party pricing, fulfillment, or privacy practices. The final charge is shown on PayPal; the final rate and credit are confirmed on Telegram.
- After payment, the buyer joins the Telegram group for verification; the seller then sends the API key by private message.
- This site does not receive, store, or display API keys delivered privately through Telegram after purchase.

### 8. Network boundary

Allowed:

```text
Browser → Cloudflare Pages (static assets)
Browser → https://api.deepseek.com (official API)
Browser → https://www.paypalobjects.com (static PayPal brand images)
After a click → https://t.me / https://www.paypal.com (external pages)
```

Not present:

```text
Browser → this site's backend / Worker / proxy → DeepSeek
Browser → this site's backend → PayPal
```

### 9. Security limitations

A static frontend cannot protect against:

- A compromised device or browser.
- Malicious browser extensions reading page content.
- A user disclosing their API key.
- Vulnerabilities in DeepSeek's servers, the network path, or browser implementations.

This project reduces risk through data minimization, CSP, no third-party scripts, and no persistent key storage. It does not promise absolute security.

### 10. Repository and audit

Full source code:

<https://github.com/longlonglink/keylight-api-dashboard>

Inspect `src/providers/deepseek.ts`, `src/lib/security.ts`, `src/i18n/translations.ts`, and the browser Network panel to verify the statements above.
