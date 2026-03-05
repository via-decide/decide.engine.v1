/**
 * ViaDecide Router v2.0
 * ─────────────────────────────────────────────────────────────
 * HOW IT WORKS
 *   - Intercepts ALL internal <a> clicks on every page
 *   - Navigates via full-page load (window.location.assign)
 *   - No SPA injection — every subpage loads as its own HTML document
 *   - Safe to include on main page AND any subpage
 *   - VDRouter.navigate(path) works for programmatic navigation
 * ─────────────────────────────────────────────────────────────
 */

const AppRouter = (function () {
    "use strict";

    /* ── ROUTE MAP ──────────────────────────────────────────── */
    const ROUTES = {
        "/": "/index.html",
        "/404": "/404/index.html",
        "/AshokVerma": "/AshokVerma/index.html",
        "/CustomSwipeEngineForm": "/CustomSwipeEngineForm/index.html",
        "/engine-activation-request": "/engine-activation-request/index.html",
        "/HexWars": "/HexWars/index.html",
        "/HivaLand": "/HivaLand/index.html",
        "/Jalaram-food-court-rajkot": "/Jalaram-food-court-rajkot/index.html",
        "/ONDC-demo": "/ONDC-demo/index.html",
        "/StudyOS": "/StudyOS/index.html",
        "/SwipeOS": "/SwipeOS/index.html",
        "/the-decision-stack": "/the-decision-stack/index.html",
        "/ViaGuide": "/ViaGuide/index.html",
        "/Viadecide-blogs": "/Viadecide-blogs/index.html",
        "/alchemist": "/alchemist/index.html",
        "/app-generator": "/app-generator/index.html",
        "/brief": "/brief/index.html",
        "/cashback-claim": "/cashback-claim/index.html",
        "/cashback-rules": "/cashback-rules/index.html",
        "/cohort-apply-here": "/cohort-apply-here/index.html",
        "/contact": "/contact/index.html",
        "/decide-foodrajkot": "/decide-foodrajkot/index.html",
        "/decide-service": "/decide-service/index.html",
        "/decision-brief-guide": "/decision-brief-guide/index.html",
        "/decision-brief": "/decision-brief/index.html",
        "/decision-infrastructure-india": "/decision-infrastructure-india/index.html",
        "/discounts": "/discounts/index.html",
        "/engine-deals": "/engine-deals/index.html",
        "/engine-license": "/engine-license/index.html",
        "/finance-dashboard-msme": "/finance-dashboard-msme/index.html",
        "/founder": "/founder/index.html",
        "/indiaai-mission-2025": "/indiaai-mission-2025/index.html",
        "/interview-prep": "/interview-prep/index.html",
        "/laptops-under-50000": "/laptops-under-50000/index.html",
        "/mars-rover-simulator-game": "/mars-rover-simulator-game/index.html",
        "/memory": "/memory/index.html",
        "/multi-source-research-explained": "/multi-source-research-explained/index.html",
        "/ondc-for-bharat": "/ondc-for-bharat/index.html",
        "/payment-register": "/payment-register/index.html",
        "/pricing": "/pricing/index.html",
        "/privacy": "/privacy/index.html",
        "/prompt-alchemy": "/prompt-alchemy/index.html",
        "/sales-dashboard": "/sales-dashboard/index.html",
        "/student-research": "/student-research/index.html",
        "/terms": "/terms/index.html",
        "/viadecide-decision-matrix": "/viadecide-decision-matrix/index.html",
        "/viadecide-opportunity-radar": "/viadecide-opportunity-radar/index.html",
        "/viadecide-public-beta": "/viadecide-public-beta/index.html",
        "/viadecide-reality-check": "/viadecide-reality-check/index.html",
        "/why-small-businesses-dont-need-saas": "/why-small-businesses-dont-need-saas/index.html"
    };

    /* ── HELPERS ────────────────────────────────────────────── */

    /** Normalise a pathname: strip trailing slash, collapse to "/" for root */
    function cleanPath(pathname) {
        const p = pathname.replace(/\/$/, "");
        return p === "" ? "/" : p;
    }

    /** Return true if the path is a known route */
    function isKnownRoute(pathname) {
        return Object.prototype.hasOwnProperty.call(ROUTES, cleanPath(pathname));
    }

    /** Skip asset extensions — let browser handle these normally */
    const ASSET_RE = /\.(pdf|png|jpg|jpeg|gif|webp|svg|ico|css|js|json|glb|stl|woff2?|ttf|eot|mp4|mp3|webm)$/i;

    /* ── NAVIGATE ───────────────────────────────────────────── */

    /**
     * Navigate to `path`.
     * Uses full-page load so every subpage renders its own complete HTML.
     *
     * @param {string} path  - absolute path, e.g. "/pricing" or "/pricing/index.html"
     */
    function navigate(path) {
        // Resolve to canonical route path if possible
        const pathname = path.split("?")[0].split("#")[0];
        const canonical = cleanPath(pathname);
        const hash = path.includes("#") ? "#" + path.split("#")[1] : "";
        const search = path.includes("?") ? "?" + path.split("?")[1].split("#")[0] : "";

        // If it's a known route, navigate to its canonical folder URL (cleaner)
        if (isKnownRoute(canonical)) {
            window.location.assign(canonical + search + hash);
        } else {
            // Unknown path — navigate as-is and let the server / 404 handle it
            window.location.assign(path);
        }
    }

    /* ── LINK INTERCEPTION ──────────────────────────────────── */

    /**
     * Listen for any click anywhere on the page.
     * If the clicked element (or its ancestor) is an <a> pointing to an
     * internal route, hand it off to navigate() instead of the default.
     *
     * Works on BOTH the main page and subpages.
     */
    function bindLinks() {
        document.addEventListener("click", function (e) {
            // Find the nearest <a> ancestor
            const a = e.target.closest("a[href]");
            if (!a) return;

            let url;
            try {
                url = new URL(a.href, window.location.href);
            } catch (_) {
                return; // malformed href — ignore
            }

            // Only handle same-origin links
            if (url.origin !== window.location.origin) return;

            // Let hash-only jumps (#section) scroll natively
            if (!url.pathname || (url.hash && url.pathname === window.location.pathname)) return;

            // Let asset links download/open normally
            if (ASSET_RE.test(url.pathname)) return;

            // If this link points to a known route, handle it
            if (isKnownRoute(url.pathname)) {
                e.preventDefault();
                navigate(url.pathname + url.search + url.hash);
            }
            // Unknown paths fall through to default browser behaviour
        }, false);
    }

    /* ── BROWSER BACK / FORWARD ─────────────────────────────── */
    // Not needed — full-page loads mean the browser history stack is native
    // and back/forward buttons work correctly out of the box.

    /* ── PUBLIC API ─────────────────────────────────────────── */

    function routes() { return ROUTES; }

    function init() {
        bindLinks();
    }

    return { init, navigate, routes };

})();

/* ── EXPOSE ─────────────────────────────────────────────────── */
window.VDRouter   = AppRouter;   // primary global
window.AppRouter  = AppRouter;   // alias

document.addEventListener("DOMContentLoaded", function () {
    AppRouter.init();
});
