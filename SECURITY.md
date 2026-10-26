# 安全说明 / Security

[简体中文](#简体中文) · [English](#english)

最后更新 / Last updated: 2026-10-26

---

## 简体中文

### 安全模型

Keylight 是纯静态前端：

- 没有本站后端、Worker、API Proxy、数据库或服务器函数。
- API Key 只存在于当前页面内存。
- API 请求由浏览器直接发往 `https://api.deepseek.com`。
- 仓库和部署产物中不包含任何真实 API Key。
- 仅使用两个当前公开文档确认的只读接口：`/models` 与 `/user/balance`。

本项目不承诺绝对安全。它只能降低与本站相关的数据收集和代理泄露风险，无法控制用户设备、浏览器扩展、网络环境或 DeepSeek 服务端的安全性。

### 自行审计源码

公开仓库：

<https://github.com/longlonglink/keylight-api-dashboard>

重点检查：

| 文件 | 检查内容 |
| --- | --- |
| `src/providers/deepseek.ts` | 唯一的 API `fetch`，目标 URL、Authorization 头、超时与解析逻辑 |
| `src/lib/security.ts` | Key 规范化与旧版 credential 存储清理 |
| `src/lib/storage.ts` | 仅保存主题和语言偏好，不含 Key |
| `src/i18n/translations.ts` | 双语错误信息和隐私文案 |
| `src/App.tsx` | Key 生命周期、Clear Key、页面状态 |
| `public/_headers` | CSP 与安全响应头 |

可以搜索：

```bash
grep -RIn "fetch(" src
grep -RIn "localStorage\|sessionStorage" src public
grep -RIn "Authorization" src
```

预期结果：

- `fetch(` 只出现在官方 API Provider 中。
- `localStorage` 只用于主题和语言偏好。
- `Authorization` 只出现在官方 API 请求头中。

### 检查网络请求

1. 打开页面，按 F12。
2. 打开 Network 面板。
3. 输入测试 Key 并点击 Connect。
4. 检查请求目标。

允许出现的主机：

```text
当前站点域名（静态 JS、CSS、字体、图标）
api.deepseek.com
```

不应出现：

```text
本站的 /api/*
维护者服务器
Cloudflare Worker
带 Key 的查询参数（?apiKey=…）
```

Key 只能出现在浏览器开发者工具的请求头中，不应出现在 URL、预览或 Responses 里。

### CSP 与第三方资源

`public/_headers` 在生产环境设置：

- `Content-Security-Policy`
- `script-src 'self'`
- `connect-src 'self' https://api.deepseek.com`
- `img-src 'self' data: https://www.paypalobjects.com`
- `form-action 'self' https://www.paypal.com`
- `font-src 'self' data:`
- `frame-ancestors 'none'`
- `X-Frame-Options: DENY`
- `Referrer-Policy: no-referrer`

首页只加载 PayPal 提供的两张静态品牌 SVG，不加载 PayPal 脚本。PayPal 付款通过一个普通 HTML 表单直接提交到 `https://www.paypal.com`，不存在本站代理、付款 API 或付款数据存储。

添加新的 Provider 时，必须审慎地把对应官方 API 域名加入 `connect-src`。不得添加代理域名。

### 支付、95 折与 Key 发放

- 本站不处理付款。用户点击 PayPal 后进入 PayPal 托管的结账页。
- 公开 PayPal 商品类型为 `VARIABLE_PRICE`，充值金额由买家在 PayPal 页面自行填写（USD）。
- 页面计算器只按本地公式 `CNY 额度 = USD 金额 × 静态参考汇率 × 100/95` 估算，不会把金额注入 PayPal，也不修改付款 action。
- 参考汇率来自 `src/config.ts`，不会在运行时请求第三方汇率服务；最终汇率与取整由商家在 Telegram 核实。
- 付款后，用户加入 Telegram 群核实；核实完成后，商家私聊发送对应额度的 API Key。本站不接收、不保存、不展示已购 Key。
- 这是人工履约流程，不是由 PayPal 自动计算的折扣或自动汇率换算。商家必须按实际付款金额履约，不得虚报额度。
- API Key、余额和模型数据不会写入 Telegram 链接或 PayPal 表单。
- 严禁通过前端注入金额或修改 PayPal action 绕过付款配置。
- 本站无法保证第三方商品、履约、退款或付款页面安全；用户应在付款前通过 Telegram 和 PayPal 页面核对金额、汇率与发放方式。

### 报告安全问题

- 对于**不包含密钥或敏感数据**的问题，可在 GitHub Issues 中报告：
  <https://github.com/longlonglink/keylight-api-dashboard/issues>
- 如果仓库启用了 GitHub 的 Private vulnerability reporting，请优先通过仓库 Security 页面私密报告。
- 不要在公开 Issue 中粘贴真实 API Key、余额、个人信息或完整敏感响应。
- 如果怀疑 Key 已泄露，应立即在 DeepSeek 平台撤销并重新生成 Key；仅清除本页面内存不足以撤销服务端的 Key。

### 明确不承诺的事项

- 不承诺此项目不存在任何缺陷。
- 不承诺 DeepSeek API 永远可用或永远支持 CORS。
- 不承诺浏览器、扩展或用户设备安全。
- 不承诺项目能防止已经泄露到外部的 API Key 被滥用。

---

## English

### Security model

Keylight is a static frontend:

- No site backend, Worker, API proxy, database, or server function.
- The API key exists only in current-page memory.
- API requests go directly from the browser to `https://api.deepseek.com`.
- No real API key is present in the repository or build output.
- Only two documented read-only endpoints are used: `/models` and `/user/balance`.

This project does not promise absolute security. It reduces risks specifically related to site-side collection and proxy exposure, but does not control the user's device, browser extensions, network, or DeepSeek's servers.

### Audit the source yourself

Public repository:

<https://github.com/longlonglink/keylight-api-dashboard>

Review:

| File | What to check |
| --- | --- |
| `src/providers/deepseek.ts` | The only API `fetch`, its URL, Authorization header, timeout, and parsing |
| `src/lib/security.ts` | Key normalization and legacy credential cleanup |
| `src/lib/storage.ts` | Only theme and language preferences; no key |
| `src/i18n/translations.ts` | Bilingual error and privacy copy |
| `src/App.tsx` | Key lifecycle, Clear Key, page states |
| `public/_headers` | CSP and security headers |

Useful searches:

```bash
grep -RIn "fetch(" src
grep -RIn "localStorage\|sessionStorage" src public
grep -RIn "Authorization" src
```

Expected:

- `fetch(` appears only in the official API provider.
- `localStorage` is used only for theme and language preferences.
- `Authorization` appears only in official API request headers.

### Verify network requests

1. Open the site and press F12.
2. Open the Network panel.
3. Enter a test key and click Connect.
4. Inspect request destinations.

Permitted hosts:

```text
The current site's domain (static JS, CSS, fonts, icons)
api.deepseek.com
```

You should not see:

```text
An /api/* route on this site
A maintainer server
A Cloudflare Worker
A query string containing the key (?apiKey=…)
```

The key may appear only in request headers in the browser developer tools, never in the URL, preview, or response body.

### CSP and third-party resources

In production, `public/_headers` sets:

- `Content-Security-Policy`
- `script-src 'self'`
- `connect-src 'self' https://api.deepseek.com`
- `img-src 'self' data: https://www.paypalobjects.com`
- `form-action 'self' https://www.paypal.com`
- `font-src 'self' data:`
- `frame-ancestors 'none'`
- `X-Frame-Options: DENY`
- `Referrer-Policy: no-referrer`

The homepage loads only two static PayPal brand SVGs from PayPal; it loads no PayPal scripts. The PayPal payment button is a plain HTML form that posts directly to `https://www.paypal.com`. There is no site proxy, payment API, or payment-data storage.

When adding a provider, deliberately add only its official API origin to `connect-src`. Never add a proxy origin.

### Payments, the 95% rule, and key delivery

- This site does not process payments. Clicking PayPal opens a PayPal-hosted checkout page.
- The public PayPal item is a `VARIABLE_PRICE` checkout; the buyer enters the top-up amount in USD on PayPal.
- The calculator only estimates `CNY credit = USD amount × static reference rate × 100/95` locally. It does not inject an amount into PayPal or alter the payment action.
- The reference rate is a static value in `src/config.ts`; the site makes no runtime exchange-rate API request. Final rate and rounding are verified on Telegram.
- After payment, the buyer joins the Telegram group for verification. Once verified, the seller sends the API key by private message. This site does not receive, store, or display purchased keys.
- This is a manual fulfillment process, not an automatic PayPal discount or FX conversion. The seller must honour the amount actually paid.
- The API key, balance, and model data are not added to the Telegram link or PayPal form.
- Never inject an amount or alter the PayPal action from the frontend to bypass payment configuration.
- This site cannot guarantee third-party goods, fulfillment, refunds, or the security of the payment page. Buyers should verify the amount, rate, and delivery method through Telegram and PayPal before paying.

### Reporting security issues

- For issues that **do not contain secrets or sensitive data**, use GitHub Issues:
  <https://github.com/longlonglink/keylight-api-dashboard/issues>
- If private vulnerability reporting is enabled for the repository, prefer the private reporting flow under the repository's Security tab.
- Never paste a real API key, balance, personal data, or a full sensitive response into a public issue.
- If a key may have leaked, revoke and recreate it in the DeepSeek platform immediately. Clearing this page's memory does not revoke a server-side key.

### What is not promised

- That the project is free of defects.
- That the DeepSeek API will remain available or CORS-enabled.
- That the browser, extensions, or device are secure.
- That a key leaked elsewhere can be protected by this app.
