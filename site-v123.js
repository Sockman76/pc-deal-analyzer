/* PCDeal V12.3 shared UX layer — presentation only */
(() => {
  'use strict';
  const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('pcd-v123');
  window.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('pcd-page-ready');

    // Update visible version labels without touching application state.
    document.querySelectorAll('.badge,.ver').forEach(el => {
      if (/^V\d/i.test((el.textContent || '').trim())) el.textContent = 'V12.3';
    });

    // Reveal high-level content blocks only; dynamically rendered child UI remains untouched.
    const blocks = [...document.querySelectorAll('main > section, .wrap > section')];
    if (!reduced && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('pcd-visible');
            io.unobserve(entry.target);
          }
        });
      }, {threshold:0.06, rootMargin:'0px 0px -20px 0px'});
      blocks.forEach((el,i) => { if (i>0) { el.classList.add('pcd-reveal'); io.observe(el); } });
    }

    // Analyzer workflow motion: detection -> structured build, analysis -> result.
    const detect = document.getElementById('detect');
    const parts = document.getElementById('parts');
    if (detect && parts) detect.addEventListener('click', () => {
      setTimeout(() => parts.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'}), 150);
    });
    const analyze = document.getElementById('analyze');
    const result = document.getElementById('result');
    if (analyze && result) analyze.addEventListener('click', () => {
      setTimeout(() => {
        if (getComputedStyle(result).display !== 'none') result.scrollIntoView({behavior:reduced?'auto':'smooth',block:'start'});
      }, 180);
    });

    // Small transform-only ambient depth, disabled for reduced motion and small screens.
    if (!reduced && innerWidth > 760) {
      let ticking = false;
      const update = () => {
        const y = scrollY || 0;
        document.body.style.setProperty('--pcd-scroll-y', `${Math.min(y * .025, 28)}px`);
        ticking = false;
      };
      addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, {passive:true});
    }
  });
})();
