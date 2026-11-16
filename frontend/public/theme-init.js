(function () {
  var root = document.documentElement;
  root.classList.add('js');

  var theme = localStorage.getItem('theme');
  if (theme !== 'light' && theme !== 'dark') {
    theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  root.setAttribute('data-theme', theme);

  var metaTheme = document.querySelector('meta[name="theme-color"]');
  if (metaTheme) metaTheme.setAttribute('content', theme === 'dark' ? '#07070d' : '#f5f5f0');

  var hideSeoFallback = document.createElement('style');
  hideSeoFallback.id = 'js-seo-hide';
  hideSeoFallback.textContent = '.js #seo-static { display: none !important; }';
  document.head.appendChild(hideSeoFallback);
})();