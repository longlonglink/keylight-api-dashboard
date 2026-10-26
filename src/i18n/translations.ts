export type Language = 'en' | 'zh'

export const en = {
  'meta.homeTitle': 'Keylight — Privacy-first API Dashboard',
  'meta.dashboardTitle': 'Live API Data · Keylight',
  'meta.connectingTitle': 'Connecting · Keylight',

  'brand.tagline': 'Private API console',

  'common.language': 'Language',
  'common.theme': 'Theme',
  'common.chineseName': '中文',
  'common.englishName': 'EN',
  'common.system': 'System',
  'common.light': 'Light',
  'common.dark': 'Dark',
  'common.direct': 'Direct',
  'common.refresh': 'Refresh',
  'common.refreshing': 'Refreshing',
  'common.tokens': 'tokens',
  'common.dismiss': 'Dismiss',
  'common.close': 'Close',

  'theme.change': 'Change theme. Current theme: {theme}.',
  'theme.system': 'System',
  'theme.light': 'Light',
  'theme.dark': 'Dark',

  'header.privacy': 'Privacy',
  'header.apiDocs': 'API docs',
  'header.privateSession': 'Private session',
  'header.pageLinks': 'Page links',

  'provider.label': 'Provider',
  'provider.integrationCount': '1 official integration',
  'provider.requestsTo': 'Requests go to {host}',
  'provider.officialApi': 'Official API',
  'provider.deepseekDescription':
    'Official DeepSeek balance and model catalogue endpoints. No other data is requested.',

  'home.badge': 'Browser-direct API console',
  'home.title1': 'Your API.',
  'home.title2': 'Your browser.',
  'home.title3': 'No middleman.',
  'home.intro':
    'See the real balance and model catalogue behind your DeepSeek key. Requests travel directly from this tab to the official API — this website has no server to send them to.',
  'home.featureMemoryTitle': 'Memory only',
  'home.featureMemoryCopy': 'The key is never written to local storage.',
  'home.featureDirectTitle': 'Direct path',
  'home.featureDirectCopy': 'No Worker, proxy, or application server.',
  'home.featureTelemetryTitle': 'No telemetry',
  'home.featureTelemetryCopy': 'No analytics, trackers, or error reporting.',
  'home.routeOrigin': 'Request origin',
  'home.routeThisBrowser': 'This browser tab',
  'home.routeHttps': 'HTTPS',
  'home.routeOfficialApi': 'Official API',
  'home.routeNote':
    'Cloudflare Pages serves the static files above. It is not part of this request path.',
  'home.connectEyebrow': 'Connect account',
  'home.connectTitle': 'See what your key can see.',
  'home.keyLabel': 'API key',
  'home.bearerOnly': 'Bearer header only',
  'home.keyMemoryNotice': 'Kept in memory only. Reloading this page clears it.',
  'home.neverInUrl': 'Never placed in a URL',
  'home.paste': 'Paste from clipboard',
  'home.pasteEmpty': 'Your clipboard is empty.',
  'home.pasteSuccess': 'Pasted. Nothing was uploaded.',
  'home.pasteBlocked': 'Clipboard access was blocked. Use Ctrl/⌘ + V in the field instead.',
  'home.clearKeyAria': 'Clear API key input',
  'home.showKeyAria': 'Show API key',
  'home.hideKeyAria': 'Hide API key',
  'home.connectTo': 'Connect to {provider}',
  'home.privacyTitle': 'This website does not receive or store your API key.',
  'home.privacyBody':
    'The key is sent directly to {provider} when this browser calls the official API. There is no backend between this page and the provider.',
  'home.detailsSummary': 'What exactly happens when I connect?',
  'home.detailsBody':
    'Your browser sends GET requests directly to {host}. The key is carried only in an Authorization request header. The page host serves static files and never handles these API requests.',
  'home.needKey': 'Need a key?',
  'home.createKeyAt': 'Create one at {provider}',
  'home.privacyEyebrow': 'Privacy, by construction',
  'home.privacyHeading': "Privacy isn't a setting here. It's the architecture.",
  'home.privacyIntro':
    'Keylight is a static frontend with no application server. The only user data this site requests is the balance and model catalogue you explicitly load from DeepSeek.',
  'home.corsTitle': 'CORS stays honest.',
  'home.corsBody':
    'If DeepSeek ever blocks direct browser requests, the dashboard reports it. This project will never add a proxy to work around browser security.',
  'home.pillar1Title': 'Static hosting only',
  'home.pillar1Copy':
    'Cloudflare Pages delivers HTML, CSS, and JavaScript. It never receives your credential or handles the API request.',
  'home.pillar2Title': 'Browser to provider',
  'home.pillar2Copy':
    'When you connect, this tab sends HTTPS requests directly to the official DeepSeek API using the Authorization header.',
  'home.pillar3Title': 'No local key storage',
  'home.pillar3Copy':
    'The key lives in JavaScript memory for this page. It is not written to localStorage, sessionStorage, or a cookie. Reloading clears it.',
  'home.deployTitle': 'Deployed as static files on Cloudflare Pages.',
  'home.deployBody':
    'GitHub → Cloudflare Pages → your browser. API traffic skips the middle entirely.',
  'home.readDocs': 'Read the official API docs',
  'home.noAccountUsageTitle': 'Only confirmed API data',
  'home.noAccountUsageBody':
    'DeepSeek exposes balance and models through documented read-only endpoints. There is no public usage-history or account-profile endpoint, so this project does not display those cards or make those requests.',

  'footer.tagline':
    'A static site. Cloudflare Pages only serves these files. Your key goes from this browser to the official API.',
  'footer.noBackend': 'No backend',
  'footer.getKey': 'Get a DeepSeek key',
  'footer.apiDocs': 'Official API docs',
  'footer.source': 'Source',
  'footer.notAffiliated': 'Not affiliated with DeepSeek.',

  'promo.eyebrowPurchase': 'API key purchase',
  'promo.eyebrowOffer': 'API key offer',
  'promo.titleNeutral': 'DeepSeek API Keys',
  'promo.titleOffer': 'API Keys at 5% Off',
  'promo.subtitle':
    'Check supported balance and account information through the official API, without needing access to the associated account dashboard.',
  'promo.accountNote':
    'Actual queryable data depends on the official API response. The current dashboard displays balance and models.',
  'promo.discountBadge': '5% off',
  'promo.discountDefinition':
    'Top up any amount and receive API credit at 100/95. For example, pay USD 95.00 and receive USD 100.00 in credit.',
  'promo.calculatorPayLabel': 'Top-up amount (USD)',
  'promo.calculatorCreditLabel': 'Estimated API credit',
  'promo.calculatorPlaceholder': 'Enter an amount',
  'promo.calculatorNote':
    'Credit = top-up × 100/95. Final rounding and credit are confirmed on Telegram.',
  'promo.checkoutNote':
    'The PayPal page currently accepts a custom amount. Enter your chosen amount there; this calculator is informational only and does not change PayPal.',
  'promo.keyDelivery':
    'After payment, contact us on Telegram to receive the API Key with the corresponding credit.',
  'promo.featureOfficialTitle': 'Official API lookup',
  'promo.featureOfficialCopy':
    'Use the key with this dashboard. Balance and model data come directly from DeepSeek’s official API.',
  'promo.featureNoLoginTitle': 'No account dashboard login',
  'promo.featureNoLoginCopy':
    'Check what the key can access without linking the associated account dashboard.',
  'promo.checkoutEyebrow': 'Purchase & support',
  'promo.checkoutTitle': 'Get an API key',
  'promo.telegram': 'Join Telegram / Purchase Support',
  'promo.paypalButton': 'Buy Now',
  'promo.paypalCardsAlt': 'Credit and debit cards',
  'promo.paypalSupport': 'Payment support:',
  'promo.priceNote':
    'The amount actually charged is shown by PayPal. This site never changes or bypasses PayPal pricing. API keys are issued through Telegram after payment.',
  'promo.affiliation': 'Not a DeepSeek official store or authorized partner.',
  'promo.telegramHint': 'Ask about purchase, payment, or API key delivery.',
  'promo.checkoutDivider': 'or pay with',

  'githubProof.heading': 'Open Source & Transparency',
  'githubProof.body1':
    'This project uses a frontend-only architecture. The complete source code is public on GitHub.',
  'githubProof.body2':
    'You can inspect the source code, API requests, and data handling.',
  'githubProof.cta': 'View Source on GitHub ↗',
  'githubProof.aria': 'Open the full source repository on GitHub in a new tab',

  'dashboard.connected': 'API connected',
  'dashboard.title': 'API overview',
  'dashboard.lastSuccessful': 'Last successful query',
  'dashboard.directFrom': 'Direct from this browser to {host}',
  'dashboard.clearKey': 'Clear key',
  'dashboard.directBadge': 'Browser-direct',
  'dashboard.scopeTitle': 'Only confirmed data',
  'dashboard.scopeBody':
    'This dashboard shows only the two read-only datasets documented by DeepSeek: account balance and available models. No usage history, account profile, or synthetic values are displayed.',
  'dashboard.noServerKey': 'No server received the key',
  'dashboard.routeNote':
    'API requests went directly from this tab to {host}. Cloudflare Pages only served the static files.',

  'balance.title': 'Balance',
  'balance.eyebrow': 'Available balance',
  'balance.live': 'Live from API',
  'balance.ready': 'Available for API calls',
  'balance.insufficient': 'Insufficient balance',
  'balance.total': 'Total available',
  'balance.granted': 'Granted',
  'balance.toppedUp': 'Topped up',
  'balance.currency': 'Currency',
  'balance.emptyTitle': 'No balance entries',
  'balance.emptyBody':
    'The API returned a successful response without any balance entries. Nothing has been estimated.',
  'balance.source': 'Read directly from /user/balance',
  'balance.noConversion': 'No currency conversion',
  'balance.entriesNote': 'Every currency returned by the API is shown separately.',

  'models.title': 'Available models',
  'models.eyebrow': 'Model catalogue',
  'models.count': '{count} returned',
  'models.filterPlaceholder': 'Filter models…',
  'models.filterAria': 'Filter models',
  'models.columnModel': 'Model',
  'models.columnContext': 'Context',
  'models.columnMaxOutput': 'Max output',
  'models.columnModalities': 'Modalities',
  'models.columnStatus': 'Status',
  'models.contextWindow': 'Context window',
  'models.maxOutput': 'Max output',
  'models.inputModalities': 'Input',
  'models.outputModalities': 'Output',
  'models.available': 'Available',
  'models.reasoning': 'reasoning',
  'models.reasoningTitle': 'Reasoning effort levels: {levels}',
  'models.noModelsTitle': 'No models returned',
  'models.noModelsBody':
    'The provider returned no models in this response. This dashboard does not fall back to a hardcoded list.',
  'models.noResultsTitle': 'No models match “{query}”',
  'models.clearFilter': 'Clear filter',
  'models.footer':
    'Fetched live from /models. No model list is hardcoded.',
  'models.providerResponse': 'Provider response',

  'loading.eyebrow': 'Connecting to official API',
  'loading.title': 'Reading live API data…',
  'loading.body':
    'Your browser is talking directly to DeepSeek. No dashboard server is involved.',
  'loading.cancel': 'Cancel',
  'loading.status':
    'Connecting. Requests are sent directly from this browser to the official API.',

  'errors.keyRequired.title': 'API key required',
  'errors.keyRequired.message':
    'Enter your API key to connect. It is used only for direct requests from this tab.',
  'errors.invalidKey.title': 'Invalid API key',
  'errors.invalidKey.message': '{provider} rejected this key. Check it and try again.',
  'errors.forbidden.title': 'Permission denied',
  'errors.forbidden.message':
    'This key does not have permission to request that data from {provider}.',
  'errors.insufficientBalance.title': 'Insufficient balance',
  'errors.insufficientBalance.message':
    'The {provider} account has no available balance for API calls.',
  'errors.notFound.title': 'Endpoint unavailable',
  'errors.notFound.message':
    '{provider} may have changed its API. The requested endpoint was not found.',
  'errors.rateLimit.title': 'Too many requests',
  'errors.rateLimit.message':
    '{provider} is rate limiting this key. Wait a moment, then refresh.',
  'errors.server.title': 'Provider unavailable',
  'errors.server.message':
    '{provider} returned a server error. Try refreshing in a moment.',
  'errors.network.title': 'Browser request blocked or offline',
  'errors.network.message':
    'The browser could not read a response from {provider}. This can be caused by a network problem or a CORS policy.',
  'errors.network.extra':
    'A pure static frontend cannot bypass CORS. This project will never add a proxy to hide that browser restriction.',
  'errors.timeout.title': 'Request timed out',
  'errors.timeout.message': '{provider} took too long to respond. The request was stopped.',
  'errors.badResponse.title': 'Unexpected API response',
  'errors.badResponse.message':
    '{provider} returned data this dashboard could not read. No values were guessed or filled in.',
  'errors.unknown.title': 'Request failed',
  'errors.unknown.message': '{provider} could not complete the request (HTTP {status}).',
  'errors.aborted.title': 'Request cancelled',
  'errors.aborted.message': 'The request was cancelled.',
} as const

export type TranslationKey = keyof typeof en

const zh: Record<TranslationKey, string> = {
  'meta.homeTitle': 'Keylight — 隐私优先的 API 仪表盘',
  'meta.dashboardTitle': '实时 API 数据 · Keylight',
  'meta.connectingTitle': '正在连接 · Keylight',

  'brand.tagline': '私有 API 控制台',

  'common.language': '语言',
  'common.theme': '主题',
  'common.chineseName': '中文',
  'common.englishName': 'EN',
  'common.system': '跟随系统',
  'common.light': '浅色',
  'common.dark': '深色',
  'common.direct': '直连',
  'common.refresh': '刷新',
  'common.refreshing': '刷新中',
  'common.tokens': 'tokens',
  'common.dismiss': '关闭',
  'common.close': '关闭',

  'theme.change': '切换主题。当前主题：{theme}。',
  'theme.system': '跟随系统',
  'theme.light': '浅色',
  'theme.dark': '深色',

  'header.privacy': '隐私',
  'header.apiDocs': 'API 文档',
  'header.privateSession': '私有会话',
  'header.pageLinks': '页面链接',

  'provider.label': 'API 服务商',
  'provider.integrationCount': '1 个官方集成',
  'provider.requestsTo': '请求发往 {host}',
  'provider.officialApi': '官方 API',
  'provider.deepseekDescription':
    '仅使用 DeepSeek 官方余额与模型目录接口，不请求任何其他数据。',

  'home.badge': '浏览器直连 API 控制台',
  'home.title1': '你的 API。',
  'home.title2': '你的浏览器。',
  'home.title3': '没有中间层。',
  'home.intro':
    '查看 DeepSeek Key 背后的真实余额与模型目录。请求从当前标签页直达官方 API，本站没有可以转交请求的服务器。',
  'home.featureMemoryTitle': '只存在内存',
  'home.featureMemoryCopy': 'API Key 不会写入任何本地存储。',
  'home.featureDirectTitle': '直连官方 API',
  'home.featureDirectCopy': '没有 Worker、代理或应用服务器。',
  'home.featureTelemetryTitle': '零追踪',
  'home.featureTelemetryCopy': '没有分析、追踪或错误上报服务。',
  'home.routeOrigin': '请求发起方',
  'home.routeThisBrowser': '当前浏览器标签页',
  'home.routeHttps': 'HTTPS',
  'home.routeOfficialApi': '官方 API',
  'home.routeNote': 'Cloudflare Pages 只负责提供上方静态文件，不在这个请求路径中。',
  'home.connectEyebrow': '连接账户',
  'home.connectTitle': '只查看你的 Key 能访问的真实数据。',
  'home.keyLabel': 'API Key',
  'home.bearerOnly': '仅用于 Bearer 请求头',
  'home.keyMemoryNotice': '仅保存在内存中，刷新页面即清除。',
  'home.neverInUrl': '不会放进 URL',
  'home.paste': '从剪贴板粘贴',
  'home.pasteEmpty': '剪贴板为空。',
  'home.pasteSuccess': '已粘贴，没有上传任何内容。',
  'home.pasteBlocked': '浏览器阻止了剪贴板访问，请在输入框中使用 Ctrl/⌘ + V。',
  'home.clearKeyAria': '清空 API Key 输入框',
  'home.showKeyAria': '显示 API Key',
  'home.hideKeyAria': '隐藏 API Key',
  'home.connectTo': '连接 {provider}',
  'home.privacyTitle': '本站不会接收或存储你的 API Key。',
  'home.privacyBody':
    '当浏览器调用官方 API 时，Key 会直接发送给 {provider}。本页面与服务商之间没有后端。',
  'home.detailsSummary': '点击连接后具体会发生什么？',
  'home.detailsBody':
    '浏览器会直接向 {host} 发送 GET 请求。Key 只放在 Authorization 请求头中。本站静态托管方只提供网页文件，从不处理这些 API 请求。',
  'home.needKey': '还没有 Key？',
  'home.createKeyAt': '前往 {provider} 创建',
  'home.privacyEyebrow': '隐私由架构保证',
  'home.privacyHeading': '隐私不是这里的设置项，而是这里的架构。',
  'home.privacyIntro':
    'Keylight 是无应用服务器的纯静态前端。本站只请求你主动加载的 DeepSeek 余额和模型目录，不收集其他用户数据。',
  'home.corsTitle': '如实面对 CORS。',
  'home.corsBody':
    '如果 DeepSeek 未来禁止浏览器直连，仪表盘会明确报错。本项目绝不会为了绕过浏览器安全策略而增加代理。',
  'home.pillar1Title': '只有静态托管',
  'home.pillar1Copy':
    'Cloudflare Pages 只负责交付 HTML、CSS 和 JavaScript，不会接收你的凭证，也不处理 API 请求。',
  'home.pillar2Title': '浏览器直连服务商',
  'home.pillar2Copy':
    '连接时，当前标签页直接使用 Authorization 请求头访问 DeepSeek 官方 API。',
  'home.pillar3Title': '不保存 API Key',
  'home.pillar3Copy':
    'API Key 只存在于当前页面的 JavaScript 内存中，不写入 localStorage、sessionStorage 或 Cookie。刷新页面即清除。',
  'home.deployTitle': '以静态文件部署在 Cloudflare Pages。',
  'home.deployBody': 'GitHub → Cloudflare Pages → 你的浏览器。API 流量完全跳过中间环节。',
  'home.readDocs': '查看官方 API 文档',
  'home.noAccountUsageTitle': '只展示已确认的数据',
  'home.noAccountUsageBody':
    'DeepSeek 官方文档只提供余额与模型列表这两个适合本项目的只读接口。当前没有公开的用量历史或账户资料接口，因此本项目不展示这些卡片，也不请求这些接口。',

  'footer.tagline':
    '一个静态网站。Cloudflare Pages 只负责提供这些文件；API Key 从浏览器直接发往官方 API。',
  'footer.noBackend': '无后端',
  'footer.getKey': '获取 DeepSeek Key',
  'footer.apiDocs': '官方 API 文档',
  'footer.source': '源码',
  'footer.notAffiliated': '本项目与 DeepSeek 无隶属关系。',

  'promo.eyebrowPurchase': 'API KEY 购买',
  'promo.eyebrowOffer': 'API KEY 优惠',
  'promo.titleNeutral': 'DeepSeek API Key',
  'promo.titleOffer': '更优惠的 API Key，95 折优惠',
  'promo.subtitle':
    '官方 API 可查，方便查询支持的余额及账户信息。无需登录关联账号，即可通过本站查询 API Key 支持返回的信息。',
  'promo.accountNote':
    '实际可查询内容以官方 API 返回为准；当前 Dashboard 展示余额与模型列表。',
  'promo.discountBadge': '95 折',
  'promo.discountDefinition':
    '充值任意金额，按 100/95 倍率获得 API 额度。例如支付 USD 95.00，到账 USD 100.00 额度。',
  'promo.calculatorPayLabel': '充值金额（USD）',
  'promo.calculatorCreditLabel': '预计 API 额度',
  'promo.calculatorPlaceholder': '输入金额',
  'promo.calculatorNote': '额度 = 充值金额 × 100/95。最终取整与到账额度以 Telegram 确认为准。',
  'promo.checkoutNote':
    'PayPal 当前为自定义金额，请在付款页填写你选择的金额。此计算器仅作估算，不会修改 PayPal 金额。',
  'promo.keyDelivery': '付款后请通过 Telegram 联系我们，领取对应额度的 API Key。',
  'promo.featureOfficialTitle': '可通过官方 API 查询',
  'promo.featureOfficialCopy': '将 Key 用于本 Dashboard，余额与模型数据直接来自 DeepSeek 官方 API。',
  'promo.featureNoLoginTitle': '无需登录关联账号',
  'promo.featureNoLoginCopy': '无需登录关联账户后台，即可查询 API Key 支持返回的信息。',
  'promo.checkoutEyebrow': '购买与咨询',
  'promo.checkoutTitle': '获取 API Key',
  'promo.telegram': '加入 Telegram，咨询购买',
  'promo.paypalButton': '立即购买',
  'promo.paypalCardsAlt': '银行卡',
  'promo.paypalSupport': '技术支持提供方：',
  'promo.priceNote':
    '实际扣款金额以 PayPal 结算页为准。本站不会修改或绕过 PayPal 价格。付款后由商家通过 Telegram 发放 API Key。',
  'promo.affiliation': '非 DeepSeek 官方商店或授权合作伙伴。',
  'promo.telegramHint': '咨询购买、付款或 API Key 发放。',
  'promo.checkoutDivider': '或使用 PayPal 支付',

  'githubProof.heading': '开源透明，自行审查',
  'githubProof.body1': '本项目采用纯前端架构，完整源代码公开在 GitHub。',
  'githubProof.body2': '你可以自行查看源码，检查 API 请求逻辑与数据处理方式。',
  'githubProof.cta': '在 GitHub 查看完整源码 ↗',
  'githubProof.aria': '在新标签页打开 GitHub 完整源码仓库',

  'dashboard.connected': 'API 已连接',
  'dashboard.title': 'API 概览',
  'dashboard.lastSuccessful': '最近成功查询',
  'dashboard.directFrom': '由浏览器直连 {host}',
  'dashboard.clearKey': '清除 Key',
  'dashboard.directBadge': '浏览器直连',
  'dashboard.scopeTitle': '仅展示已确认的数据',
  'dashboard.scopeBody':
    '本仪表盘只展示 DeepSeek 官方文档中的两个只读数据集：账户余额与可用模型。不展示用量历史、账户资料，也不生成任何模拟值。',
  'dashboard.noServerKey': '本站服务器未收到 Key',
  'dashboard.routeNote':
    'API 请求从当前标签页直接发往 {host}；Cloudflare Pages 只负责提供静态文件。',

  'balance.title': '余额',
  'balance.eyebrow': '可用余额',
  'balance.live': '来自官方 API',
  'balance.ready': '可用于 API 调用',
  'balance.insufficient': '余额不足',
  'balance.total': '总可用余额',
  'balance.granted': '赠金余额',
  'balance.toppedUp': '充值余额',
  'balance.currency': '币种',
  'balance.emptyTitle': '没有余额记录',
  'balance.emptyBody': 'API 请求成功，但响应中没有余额记录。本项目没有进行任何估算。',
  'balance.source': '直接读取自 /user/balance',
  'balance.noConversion': '不做货币换算',
  'balance.entriesNote': 'API 返回的每个币种都会单独展示。',

  'models.title': '可用模型',
  'models.eyebrow': '模型目录',
  'models.count': '返回 {count} 个',
  'models.filterPlaceholder': '筛选模型…',
  'models.filterAria': '筛选模型',
  'models.columnModel': '模型',
  'models.columnContext': '上下文',
  'models.columnMaxOutput': '最大输出',
  'models.columnModalities': '模态',
  'models.columnStatus': '状态',
  'models.contextWindow': '上下文窗口',
  'models.maxOutput': '最大输出',
  'models.inputModalities': '输入',
  'models.outputModalities': '输出',
  'models.available': '可用',
  'models.reasoning': '推理',
  'models.reasoningTitle': '推理强度档位：{levels}',
  'models.noModelsTitle': '没有返回模型',
  'models.noModelsBody': '服务商此次响应没有返回任何模型。本仪表盘不会回退到硬编码的模型列表。',
  'models.noResultsTitle': '没有匹配“{query}”的模型',
  'models.clearFilter': '清除筛选',
  'models.footer': '直接从 /models 实时获取，未硬编码模型列表。',
  'models.providerResponse': '服务商返回值',

  'loading.eyebrow': '正在连接官方 API',
  'loading.title': '正在读取实时 API 数据…',
  'loading.body': '你的浏览器正在直接访问 DeepSeek，没有经过任何本站服务器。',
  'loading.cancel': '取消',
  'loading.status': '正在连接。请求由浏览器直接发往官方 API。',

  'errors.keyRequired.title': '需要 API Key',
  'errors.keyRequired.message': '请输入 API Key。它只用于当前标签页的直连请求。',
  'errors.invalidKey.title': 'API Key 无效',
  'errors.invalidKey.message': '{provider} 拒绝了这个 Key，请检查后重试。',
  'errors.forbidden.title': '权限不足',
  'errors.forbidden.message': '该 Key 没有向 {provider} 请求此数据的权限。',
  'errors.insufficientBalance.title': '余额不足',
  'errors.insufficientBalance.message': '{provider} 账户当前没有可用于 API 调用的余额。',
  'errors.notFound.title': '接口不可用',
  'errors.notFound.message': '{provider} 可能更改了 API，请求的接口不存在。',
  'errors.rateLimit.title': '请求过于频繁',
  'errors.rateLimit.message': '{provider} 正在限制该 Key 的请求频率，请稍后刷新。',
  'errors.server.title': '服务商暂时不可用',
  'errors.server.message': '{provider} 返回了服务器错误，请稍后刷新重试。',
  'errors.network.title': '浏览器请求被阻止或网络离线',
  'errors.network.message':
    '浏览器无法读取来自 {provider} 的响应。这可能由网络问题或 CORS 策略导致。',
  'errors.network.extra':
    '纯静态前端无法绕过 CORS。本项目绝不会为了隐藏浏览器限制而增加代理。',
  'errors.timeout.title': '请求超时',
  'errors.timeout.message': '{provider} 响应超时，请求已停止。',
  'errors.badResponse.title': 'API 响应格式异常',
  'errors.badResponse.message': '{provider} 返回了仪表盘无法读取的数据。没有猜测或填充任何字段。',
  'errors.unknown.title': '请求失败',
  'errors.unknown.message': '{provider} 无法完成请求（HTTP {status}）。',
  'errors.aborted.title': '请求已取消',
  'errors.aborted.message': '请求已取消。',
}

export const translations: Record<Language, Record<TranslationKey, string>> = { en, zh }

export function translate(
  language: Language,
  key: TranslationKey,
  values?: Record<string, string | number>,
): string {
  let template = translations[language][key]

  if (!values) return template

  for (const [name, value] of Object.entries(values)) {
    template = template.replaceAll(`{${name}}`, String(value))
  }

  return template
}
