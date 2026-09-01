"use strict";
(() => {
  const root = document.documentElement;
  root.classList.add("pcdeal-page-enter");

  window.addEventListener("pageshow", () => {
    root.classList.remove("pcdeal-page-exit");
    root.classList.add("pcdeal-page-enter");
  });

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link) return;
    if (event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target && link.target !== "_self") return;
    if (link.hasAttribute("download")) return;

    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("mailto:") ||
        href.startsWith("tel:") || href.startsWith("javascript:")) return;

    const target = new URL(link.href, window.location.href);
    if (target.origin !== window.location.origin) return;

    // Same-document anchors should remain instant.
    if (target.pathname === location.pathname &&
        target.search === location.search &&
        target.hash) return;

    event.preventDefault();
    root.classList.remove("pcdeal-page-enter");
    root.classList.add("pcdeal-page-exit");

    setTimeout(() => {
      window.location.href = target.href;
    }, 180);
  });
})();
