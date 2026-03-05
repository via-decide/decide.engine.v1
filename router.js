/**
 * ViaDecide SPA Router
 * Auto-generated — do not edit manually
 * Routes: 50 pages
 */
const AppRouter = (function () {
    "use strict";

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

    const MOUNT_POINT = "#app";

    function bindLinks() {
        // No-op: we use standard full-page navigation for all internal links.
        // Subpages are standalone HTML documents and must be loaded directly.
    }

    function navigate(path) {
        // Always do a full page navigation so the correct subpage HTML is loaded.
        window.location.assign(path);
    }

    function executeScripts() {
        // No-op: not used with full-page navigation.
    }

    /** Expose routes list for debugging */
    function routes() { return ROUTES; }

    function init() {
        // No SPA injection — all navigation is standard full-page.
        // popstate is handled natively by the browser.
    }

    return { init, navigate, routes };
})();

// Also expose as VDRouter for legacy compatibility
window.VDRouter = AppRouter;
document.addEventListener("DOMContentLoaded", () => AppRouter.init());
