// ============================================================
// app.js — Rounds: Main Application Init
// Boots the site, wires up global interactions.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  // ── Inject nav and footer ──────────────────────────────────
  document.getElementById('nav-container').innerHTML = renderNav();
  document.getElementById('footer-container').innerHTML = renderFooter();

  // ── Initial page render ────────────────────────────────────
  Router.go('home');

  // ── Nav: link bindings (nav itself) ───────────────────────
  bindNavEvents();

  // ── Nav: mobile hamburger ──────────────────────────────────
  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('nav-mobile');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open');
    });
  }

  // ── Search ─────────────────────────────────────────────────
  const searchToggle = document.getElementById('search-toggle');
  const searchBar = document.getElementById('search-bar');
  const searchInput = document.getElementById('search-input');
  const searchClose = document.getElementById('search-close');
  const searchResults = document.getElementById('search-results');

  if (searchToggle) {
    searchToggle.addEventListener('click', () => {
      searchBar.classList.toggle('open');
      if (searchBar.classList.contains('open')) searchInput.focus();
    });
  }

  if (searchClose) {
    searchClose.addEventListener('click', () => {
      searchBar.classList.remove('open');
      searchInput.value = '';
      searchResults.innerHTML = '';
    });
  }

  if (searchInput) {
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase().trim();
      if (q.length < 2) { searchResults.innerHTML = ''; return; }
      const matches = getAllArticles().filter(a =>
        a.title.toLowerCase().includes(q) ||
        a.summary.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q) ||
        a.author.toLowerCase().includes(q)
      ).slice(0, 5);

      if (matches.length === 0) {
        searchResults.innerHTML = '<p class="search-empty">No articles found.</p>';
        return;
      }

      searchResults.innerHTML = matches.map(a => `
        <div class="search-result-item" data-article-id="${a.id}">
          <span class="search-result-cat">${a.category}</span>
          <p class="search-result-title">${a.title}</p>
          <span class="search-result-author">${a.author} · ${formatDate(a.date)}</span>
        </div>
      `).join('');

      searchResults.querySelectorAll('.search-result-item').forEach(item => {
        item.addEventListener('click', () => {
          Router.go('article', item.dataset.articleId);
          searchBar.classList.remove('open');
          searchInput.value = '';
          searchResults.innerHTML = '';
        });
      });
    });
  }

  // ── Scroll: sticky nav shadow ──────────────────────────────
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  });
});

// Bind nav logo and links
function bindNavEvents() {
  document.querySelectorAll('.nav-logo, .nav-link, .nav-mobile-link, .footer-link').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const page = el.dataset.page;
      const category = el.dataset.category;
      if (page === 'home') Router.go('home');
      else if (page === 'category' && category) Router.go('category', category);
      else if (page === 'about') Router.go('about');

      // Close mobile nav
      document.getElementById('nav-mobile')?.classList.remove('open');
      document.getElementById('nav-hamburger')?.classList.remove('open');
    });
  });
}
