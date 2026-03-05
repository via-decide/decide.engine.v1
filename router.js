/**
 * ViaDecide Router (router.js)
 * Implements the VDRouter API expected by index.html for route resolution,
 * background prefetching, and advanced overlay injection (bypassing iframe sandboxes).
 */

(function() {
  // 1. Route Registry (Derived from _redirects)
  const routeTable = {
    '404': '/404/index.html',
    'AshokVerma': '/AshokVerma/index.html',
    'CustomSwipeEngineForm': '/CustomSwipeEngineForm/index.html',
    'engine-activation-request': '/engine-activation-request/index.html',
    'HexWars': '/HexWars/index.html',
    'HivaLand': '/HivaLand/index.html',
    'Jalaram-food-court-rajkot': '/Jalaram-food-court-rajkot/index.html',
    'ONDC-demo': '/ONDC-demo/index.html',
    'StudyOS': '/StudyOS/index.html',
    'SwipeOS': '/SwipeOS/index.html',
    'the-decision-stack': '/the-decision-stack/index.html',
    'ViaGuide': '/ViaGuide/index.html',
    'Viadecide-blogs': '/Viadecide-blogs/index.html',
    'alchemist': '/alchemist/index.html',
    'app-generator': '/app-generator/index.html',
    'brief': '/brief/index.html',
    'cashback-claim': '/cashback-claim/index.html',
    'cashback-rules': '/cashback-rules/index.html',
    'cohort-apply-here': '/cohort-apply-here/index.html',
    'contact': '/contact/index.html',
    'decide-foodrajkot': '/decide-foodrajkot/index.html',
    'decide-service': '/decide-service/index.html',
    'decision-brief-guide': '/decision-brief-guide/index.html',
    'decision-brief': '/decision-brief/index.html',
    'decision-infrastructure-india': '/decision-infrastructure-india/index.html',
    'discounts': '/discounts/index.html',
    'engine-deals': '/engine-deals/index.html',
    'engine-license': '/engine-license/index.html',
    'finance-dashboard-msme': '/finance-dashboard-msme/index.html',
    'founder': '/founder/index.html',
    'indiaai-mission-2025': '/indiaai-mission-2025/index.html',
    'interview-prep': '/interview-prep/index.html',
    'laptops-under-50000': '/laptops-under-50000/index.html',
    'mars-rover-simulator-game': '/mars-rover-simulator-game/index.html',
    'memory': '/memory/index.html',
    'multi-source-research-explained': '/multi-source-research-explained/index.html',
    'ondc-for-bharat': '/ondc-for-bharat/index.html',
    'payment-register': '/payment-register/index.html',
    'pricing': '/pricing/index.html',
    'privacy': '/privacy/index.html',
    'prompt-alchemy': '/prompt-alchemy/index.html',
    'sales-dashboard': '/sales-dashboard/index.html',
    'student-research': '/student-research/index.html',
    'terms': '/terms/index.html',
    'viadecide-decision-matrix': '/viadecide-decision-matrix/index.html',
    'viadecide-opportunity-radar': '/viadecide-opportunity-radar/index.html',
    'viadecide-public-beta': '/viadecide-public-beta/index.html',
    'viadecide-reality-check': '/viadecide-reality-check/index.html',
    'why-small-businesses-dont-need-saas': '/why-small-businesses-dont-need-saas/index.html'
  };

  const prefetchCache = new Set();
  const htmlCache = new Map();
  const events = {};

  // 2. VDRouter API
  window.VDRouter = {
    
    // Returns the registered route table
    routes: function() {
      return routeTable;
    },

    // Resolves a slug to an exact file path
    resolve: function(slug) {
      if (!slug) return '';
      const cleanSlug = slug.replace(/^\/+/, '').replace(/\/+$/, '').replace(/\.html?$/i, '');
      
      // Case-insensitive lookup
      const match = Object.keys(routeTable).find(k => k.toLowerCase() === cleanSlug.toLowerCase());
      if (match) return routeTable[match];
      
      // Fallback if not mapped but resembles a valid path
      return slug.includes('/') ? slug : `/${slug}/index.html`;
    },

    // Navigation trigger
    go: function(slug, options = {}) {
      const url = this.resolve(slug);
      if (options.overlay) {
        this.openOverlay(url, options);
      } else {
        window.location.href = url;
      }
      this.emit('routechange', { slug, url, options });
    },

    // Event listener system
    on: function(event, callback) {
      if (!events[event]) events[event] = [];
      events[event].push(callback);
    },

    emit: function(event, data) {
      if (events[event]) events[event].forEach(cb => cb(data));
    },

    // Background prefetching for hover states
    prefetch: function(slug) {
      if (!slug) return;
      const url = this.resolve(slug);
      
      if (prefetchCache.has(url)) return;
      prefetchCache.add(url);

      // Fetch and cache the raw HTML to make modal opening instantaneous 
      fetch(url)
        .then(res => {
          if (res.ok) return res.text();
          throw new Error('Network error');
        })
        .then(html => htmlCache.set(url, html))
        .catch(() => {
          // Fallback to standard link prefetch if direct fetch fails
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.href = url;
          document.head.appendChild(link);
        });
    },

    // Binds router logic to any anchor tags formatted for the router
    bindLinks: function() {
      document.querySelectorAll('a[data-router]').forEach(a => {
        a.addEventListener('click', (e) => {
          e.preventDefault();
          this.go(a.getAttribute('href'), { overlay: a.hasAttribute('data-overlay') });
        });
      });
    },

    // Advanced Overlay: injects HTML into the existing modal shell to bypass iframe restrictions
    openOverlay: function(file, options = {}) {
      const titleStr = options.title || 'ViaDecide';
      const iconMatch = titleStr.match(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/);
      const icon = iconMatch ? iconMatch[0] : '✨';
      const name = titleStr.replace(icon, '').trim();

      // UI Setup (interacting with existing index.html modal elements)
      document.getElementById('m-icon').textContent = icon;
      document.getElementById('m-name').textContent = name;
      document.getElementById('m-tab').href = file;
      document.getElementById('err-open-link').href = file;
      document.getElementById('modal-err').classList.remove('show');

      const modal = document.getElementById('modal');
      const iframe = document.getElementById('modal-frame');
      
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';

      // Inject HTML if pre-fetched, otherwise fallback to iframe
      if (htmlCache.has(file)) {
        iframe.style.display = 'none'; // Hide iframe
        this._injectHTML(htmlCache.get(file), file);
      } else {
        // Fetch on the fly
        fetch(file)
          .then(res => {
            if (!res.ok) throw new Error();
            return res.text();
          })
          .then(html => {
            htmlCache.set(file, html);
            iframe.style.display = 'none';
            this._injectHTML(html, file);
          })
          .catch(() => {
            // Ultimate fallback to legacy iframe if fetch fails (CORS, etc.)
            iframe.style.display = 'block';
            iframe.src = file;
          });
      }
    },

    // Private method to handle DOM injection securely
    _injectHTML: function(html, sourceUrl) {
      let container = document.getElementById('vd-injected-container');
      if (!container) {
        container = document.createElement('div');
        container.id = 'vd-injected-container';
        container.style.cssText = 'flex:1; width:100%; height:100%; overflow-y:auto; background:var(--bg); border-radius:0 0 22px 22px;';
        document.getElementById('modal-sheet').appendChild(container);
      }
      container.style.display = 'block';

      // Parse and extract the body content to avoid injecting nested <html> tags
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      container.innerHTML = doc.body.innerHTML;

      // Ensure injected scripts run
      Array.from(container.querySelectorAll('script')).forEach(oldScript => {
        const newScript = document.createElement('script');
        Array.from(oldScript.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value));
        newScript.appendChild(document.createTextNode(oldScript.innerHTML));
        oldScript.parentNode.replaceChild(newScript, oldScript);
      });
    }
  };

  // Cleanup injected container on modal close
  const originalClose = window.closeModal;
  if (typeof originalClose === 'function') {
    window.closeModal = function() {
      originalClose();
      const container = document.getElementById('vd-injected-container');
      if (container) container.style.display = 'none';
    };
  }

  // Bind links immediately
  window.addEventListener('DOMContentLoaded', () => {
    VDRouter.bindLinks();
  });

})();
