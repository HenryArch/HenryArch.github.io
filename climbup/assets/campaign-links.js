// ASC attribution only. No analytics SDK, cookies, storage or background requests.
(() => {
  const source = new URLSearchParams(window.location.search).get('utm_source');
  let fromProductHunt = source === 'producthunt';
  try {
    const host = new URL(document.referrer).hostname;
    fromProductHunt ||= host === 'producthunt.com' || host === 'www.producthunt.com';
  } catch { /* Direct visits have no referrer. */ }
  if (!fromProductHunt) return;

  for (const link of document.querySelectorAll('a[href]')) {
    const url = new URL(link.href);
    if (url.hostname === 'apps.apple.com' && url.pathname.endsWith('/id6761518305')) {
      url.searchParams.set('ct', 'climbup_ph_stairs');
      link.href = url.href;
    } else if (url.origin === location.origin && url.pathname.startsWith('/climbup/')) {
      // Keep this source when switching between the English and German landing pages.
      if (link.hasAttribute('lang')) {
        url.searchParams.set('utm_source', 'producthunt');
        link.href = url.href;
      }
    }
  }
  const banner = document.querySelector('meta[name="apple-itunes-app"]');
  if (banner) banner.content = banner.content.replace('climbup_web_stairs', 'climbup_ph_stairs');
})();
