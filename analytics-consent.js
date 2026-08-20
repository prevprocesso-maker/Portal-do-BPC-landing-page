/* Portal do BPC — GA4 com consentimento LGPD e eventos de conversão */
(function () {
  'use strict';

  var MEASUREMENT_ID = 'G-6RVLVTFRGT';
  var CONSENT_KEY = 'pdbpc_cookie_consent_v2';
  var loaded = false;

  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    wait_for_update: 500
  });

  function loadAnalytics() {
    if (loaded || document.querySelector('script[data-pdbpc-ga4]')) return;
    loaded = true;
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=' + MEASUREMENT_ID;
    script.setAttribute('data-pdbpc-ga4', 'true');
    document.head.appendChild(script);
    script.addEventListener('load', function () {
      gtag('js', new Date());
      gtag('config', MEASUREMENT_ID, { anonymize_ip: true, transport_type: 'beacon' });
    }, { once: true });
  }

  function setConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) {}
    var banner = document.getElementById('pdbpc-cookie-banner');
    if (banner) banner.remove();
    if (value === 'granted') {
      gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied' });
      loadAnalytics();
    }
  }

  function showBanner() {
    if (document.getElementById('pdbpc-cookie-banner')) return;
    var banner = document.createElement('div');
    banner.id = 'pdbpc-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Preferências de cookies');
    banner.innerHTML = '<p>Usamos cookies de análise para entender como o site é utilizado e melhorar a experiência. <a href="/privacidade">Saiba mais</a>.</p><div class="pdbpc-cookie-actions"><button type="button" data-consent="accept">Aceitar análise</button><button type="button" data-consent="reject">Recusar</button></div>';
    var style = document.createElement('style');
    style.textContent = '#pdbpc-cookie-banner{position:fixed;z-index:9999;left:20px;right:20px;bottom:20px;max-width:560px;margin:auto;padding:18px 20px;background:#1f1812;color:#f5ede0;border:1px solid #4a382c;border-radius:16px;box-shadow:0 16px 40px rgba(0,0,0,.5);font:15px/1.5 Inter,system-ui,sans-serif}#pdbpc-cookie-banner p{margin:0 0 14px}#pdbpc-cookie-banner a{color:#f5c845;text-decoration:underline}#pdbpc-cookie-banner .pdbpc-cookie-actions{display:flex;gap:8px;flex-wrap:wrap}#pdbpc-cookie-banner button{min-width:120px;flex:1;padding:10px 14px;border-radius:999px;border:1px solid #075e54;background:#075e54;color:#fff;font:600 14px Inter,system-ui,sans-serif;cursor:pointer}#pdbpc-cookie-banner button[data-consent="reject"]{background:transparent;border-color:#b9a995;color:#f5ede0}@media(max-width:480px){#pdbpc-cookie-banner{left:12px;right:12px;bottom:12px;padding:16px}#pdbpc-cookie-banner .pdbpc-cookie-actions{display:grid;grid-template-columns:1fr 1fr}}';
    document.head.appendChild(style);
    document.body.appendChild(banner);
    banner.querySelector('[data-consent="accept"]').addEventListener('click', function () { setConsent('granted'); });
    banner.querySelector('[data-consent="reject"]').addEventListener('click', function () { setConsent('denied'); });
  }

  function hasConsent() {
    try { return localStorage.getItem(CONSENT_KEY) === 'granted'; } catch (e) { return false; }
  }

  window.__pdbpcTrack = function (name, params) {
    if (!hasConsent()) return;
    var payload = Object.assign({ page_location: window.location.href, page_title: document.title }, params || {});
    gtag('event', name, payload);
    window.dataLayer.push(Object.assign({ event: name }, payload));
  };

  document.addEventListener('click', function (event) {
    var link = event.target && event.target.closest ? event.target.closest('a[href*="wa.me"]') : null;
    if (!link) return;
    var location = link.closest('.footer') ? 'footer' : (link.classList.contains('wa-float') ? 'floating' : (link.closest('.pp-cta') ? 'cta' : 'contact'));
    var isPathology = Boolean(document.querySelector('.pp-answer-direct, .pp-cta .institutional-bridge'));
    var pageType = isPathology ? 'patologia' : location;
    var heading = document.querySelector('h1');
    var pathology = isPathology && heading ? heading.textContent.trim().slice(0, 120) : '';
    window.__pdbpcTrack('whatsapp_click', {
      site: 'portal_bpc',
      page_type: pageType,
      pathology: pathology,
      origin: 'iraja',
      link_location: location,
      link_type: 'whatsapp',
      link_url: link.href,
      utm_source: 'portal_bpc',
      utm_medium: 'whatsapp',
      utm_campaign: isPathology ? 'bpc_patologia_iraja' : 'bpc_iraja',
      utm_content: pageType
    });
  }, true);

  function init() {
    var state = null;
    try { state = localStorage.getItem(CONSENT_KEY); } catch (e) {}
    if (state === 'granted') {
      gtag('consent', 'update', { analytics_storage: 'granted', ad_storage: 'denied' });
      loadAnalytics();
    } else if (state !== 'denied') {
      showBanner();
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();
