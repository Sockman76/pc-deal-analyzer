/* ============================================================
   PCDeal V5.1 — Visual Experience Layer
   No valuation/parser logic lives here.
   ============================================================ */
(() => {
  'use strict';

  const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia?.('(pointer: fine)').matches;
  const fxKey = 'pcdeal.v5.fx';

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  function setFx(enabled) {
    document.body.classList.toggle('pcdeal-fx-off', !enabled);
    try { localStorage.setItem(fxKey, enabled ? 'on' : 'off'); } catch {}
    const btn = $('.pcdeal-fx-toggle');
    if (btn) {
      btn.textContent = enabled ? '✦ FX On' : '✦ FX Off';
      btn.setAttribute('aria-pressed', enabled ? 'true' : 'false');
    }
  }

  function mountAmbient() {
    const ambient = document.createElement('div');
    ambient.className = 'pcdeal-ambient';
    ambient.setAttribute('aria-hidden', 'true');
    ambient.innerHTML = '<i class="pcdeal-orb one"></i><i class="pcdeal-orb two"></i><i class="pcdeal-orb three"></i>';
    document.body.prepend(ambient);

    if (finePointer && !reduced) {
      const glow = document.createElement('div');
      glow.className = 'pcdeal-cursor-glow';
      glow.setAttribute('aria-hidden', 'true');
      document.body.appendChild(glow);
      let tx = innerWidth / 2, ty = innerHeight / 2, x = tx, y = ty, raf = 0;
      const tick = () => {
        x += (tx - x) * .12; y += (ty - y) * .12;
        glow.style.left = `${x}px`; glow.style.top = `${y}px`;
        raf = requestAnimationFrame(tick);
      };
      document.addEventListener('pointermove', e => {
        tx = e.clientX; ty = e.clientY;
        document.body.classList.add('pcdeal-pointer-on');
        if (!raf) raf = requestAnimationFrame(tick);
      }, {passive:true});
      document.addEventListener('pointerleave', () => document.body.classList.remove('pcdeal-pointer-on'));
    }
  }

  function mountScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'pcdeal-scroll-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const pct = max > 0 ? Math.min(100, (scrollY / max) * 100) : 0;
      bar.style.width = `${pct}%`;
    };
    addEventListener('scroll', update, {passive:true});
    addEventListener('resize', update, {passive:true});
    update();
  }

  function mountHud() {
    const fx = document.createElement('button');
    fx.type = 'button'; fx.className = 'pcdeal-fx-toggle'; fx.title = 'Toggle ambient visual effects';
    document.body.appendChild(fx);

    const top = document.createElement('button');
    top.type = 'button'; top.className = 'pcdeal-top-button'; top.textContent = '↑ Top'; top.title = 'Back to top';
    top.addEventListener('click', () => scrollTo({top:0, behavior: reduced ? 'auto' : 'smooth'}));
    document.body.appendChild(top);

    if (finePointer) {
      const hint = document.createElement('div');
      hint.className = 'pcdeal-shortcut-hint';
      hint.textContent = document.getElementById('listingText') ? '/ focus listing • Ctrl/⌘ + Enter detect' : 'Esc clears focus • ↑ Top available';
      document.body.appendChild(hint);
    }

    let enabled = !reduced;
    try {
      const saved = localStorage.getItem(fxKey);
      if (saved === 'off') enabled = false;
      if (saved === 'on' && !reduced) enabled = true;
    } catch {}
    setFx(enabled);
    fx.addEventListener('click', () => setFx(document.body.classList.contains('pcdeal-fx-off')));

    const updateTop = () => top.classList.toggle('show', scrollY > 650);
    addEventListener('scroll', updateTop, {passive:true});
    updateTop();
  }

  function wireRipples() {
    document.addEventListener('pointerdown', e => {
      const btn = e.target.closest('button,.btn');
      if (!btn || reduced || document.body.classList.contains('pcdeal-fx-off')) return;
      const r = btn.getBoundingClientRect();
      const size = Math.max(r.width, r.height) * 1.8;
      const ripple = document.createElement('span');
      ripple.className = 'pcdeal-ripple';
      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${e.clientX - r.left}px`;
      ripple.style.top = `${e.clientY - r.top}px`;
      btn.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove(), {once:true});
    });

    document.addEventListener('click', e => {
      const btn = e.target.closest('button,.btn');
      if (!btn || btn.classList.contains('pcdeal-fx-toggle') || btn.classList.contains('pcdeal-top-button')) return;
      btn.classList.remove('pcdeal-running');
      void btn.offsetWidth;
      btn.classList.add('pcdeal-running');
      setTimeout(() => btn.classList.remove('pcdeal-running'), 760);
    });
  }

  function wireReveal() {
    const targets = $$('main .panel, main .card, main .tool-link, main .winner-panel, main .compare-system-card, main .saved-card, main .inspector-step, .hardware-card, .insight');
    if (reduced || !('IntersectionObserver' in window)) {
      targets.forEach(el => el.classList.add('pcdeal-visible'));
      return;
    }
    targets.forEach(el => el.classList.add('pcdeal-reveal'));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('pcdeal-visible');
        observer.unobserve(entry.target);
      });
    }, {threshold:.08, rootMargin:'0px 0px -30px 0px'});
    targets.forEach(el => observer.observe(el));
  }

  function wireResultPops() {
    const selectors = ['#score','#gameFps','#oneLow','#winnerScore','#compareAScore','#compareBScore','#overallScore','#listingQuality','#dealHeat','#maxBuy','#resaleEstimate','#flipProfit','#partOutValue'];
    selectors.forEach(sel => {
      const el = $(sel);
      if (!el || !('MutationObserver' in window)) return;
      let last = el.textContent;
      new MutationObserver(() => {
        const now = el.textContent;
        if (now === last) return;
        last = now;
        el.classList.remove('pcdeal-pop'); void el.offsetWidth; el.classList.add('pcdeal-pop');
      }).observe(el, {childList:true,characterData:true,subtree:true});
    });
  }

  function keyboardShortcuts() {
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') document.activeElement?.blur?.();
      const listing = document.getElementById('listingText');
      if (e.key === '/' && listing && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement?.tagName || '')) {
        e.preventDefault(); listing.focus();
      }
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter' && listing) {
        const detect = document.getElementById('detectButton');
        if (detect) { e.preventDefault(); detect.click(); }
      }
    });
  }

  function pageTransitions() {
    $$('a[href]').forEach(a => {
      const href = a.getAttribute('href') || '';
      if (!href.endsWith('.html') || a.target === '_blank') return;
      a.addEventListener('click', e => {
        if (reduced || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
        e.preventDefault();
        document.body.animate([{opacity:1,transform:'translateY(0)'},{opacity:.2,transform:'translateY(5px)'}], {duration:150,easing:'ease-out',fill:'forwards'}).finished
          .then(() => location.href = href)
          .catch(() => location.href = href);
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    mountAmbient();
    mountScrollProgress();
    mountHud();
    wireRipples();
    wireReveal();
    wireResultPops();
    keyboardShortcuts();
    pageTransitions();
  });
})();
