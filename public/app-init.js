/*
 * Applies non-sensitive appearance/language preferences before the app paints.
 * It reads only theme and language strings. It never reads, writes, or sends an
 * API key.
 */
(function () {
  try {
    var theme = window.localStorage.getItem('keylight.theme.v1')
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    var useDark = theme === 'dark' || ((theme === 'system' || !theme) && prefersDark)
    document.documentElement.classList.toggle('dark', useDark)
    document.documentElement.style.colorScheme = useDark ? 'dark' : 'light'

    var language = window.localStorage.getItem('keylight.language.v1')
    if (language === 'zh' || language === 'en') {
      document.documentElement.lang = language === 'zh' ? 'zh-CN' : 'en'
    }
  } catch (error) {
    /* Storage can be unavailable in hardened browser contexts. */
  }
})()
