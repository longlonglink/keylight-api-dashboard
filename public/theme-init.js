/*
 * Applies the saved appearance before the app paints to avoid a theme flash.
 * This script reads only a non-sensitive theme preference. It never reads,
 * writes, or sends an API key.
 */
(function () {
  try {
    var stored = window.localStorage.getItem('keylight.theme.v1')
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    var useDark = stored === 'dark' || ((stored === 'system' || !stored) && prefersDark)
    document.documentElement.classList.toggle('dark', useDark)
    document.documentElement.style.colorScheme = useDark ? 'dark' : 'light'
  } catch (error) {
    /* Storage can be unavailable in hardened browser contexts. */
  }
})()
