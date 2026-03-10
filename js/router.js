// ============================================================
// router.js — Rounds: Client-Side Page Navigation
// Handles all page transitions without a server.
// ============================================================

const Router = {
  currentPage: 'home',
  currentData: null,

  // Navigate to a page
  go(page, data = null) {
    this.currentPage = page;
    this.currentData = data;
    this.render();
    window.scrollTo({ top: 0, behavior: 'smooth' });
    this.updateNav(page, data);
  },

  // Render the current page into #app
  render() {
    const app = document.getElementById('app');
    if (!app) return;

    let html = '';

    switch (this.currentPage) {
      case 'home':
        html = renderHomePage();
        break;
      case 'article':
        const article = getArticleById(this.currentData);
        if (!article) { html = '<p class="error-state">Article not found.</p>'; break; }
        html = renderArticleView(article);
        break;
      case 'category':
        html = renderCategoryPage(this.currentData);
        break;
      case 'about':
        html = renderAboutPage();
        break;
      default:
        html = renderHomePage();
    }

    app.innerHTML = html;
    this.bindLinks();
    this.bindArticleClicks();
  },

  // Bind all data-page links
  bindLinks() {
    const app = document.getElementById('app');
    if (!app) return;
    app.querySelectorAll('[data-page]').forEach(el => {
      el.addEventListener('click', (e) => {
        e.preventDefault();
        const page = el.dataset.page;
        const category = el.dataset.category || null;
        const articleId = el.dataset.articleId || null;

        if (page === 'category' && category) {
          this.go('category', category);
        } else if (page === 'article' && articleId) {
          this.go('article', articleId);
        } else if (page === 'about') {
          this.go('about');
        } else if (page === 'home') {
          this.go('home');
        }
      });
    });
  },

  // Bind article card clicks
  bindArticleClicks() {
    const app = document.getElementById('app');
    if (!app) return;
    app.querySelectorAll('[data-article-id]').forEach(el => {
      // Skip buttons that already have specific click handlers
      if (el.classList.contains('hero-cta') || el.tagName === 'BUTTON') {
        el.addEventListener('click', (e) => {
          e.preventDefault();
          this.go('article', el.dataset.articleId);
        });
        return;
      }
      el.addEventListener('click', (e) => {
        // Don't trigger if clicking a button inside a card
        if (e.target.closest('button')) return;
        this.go('article', el.dataset.articleId);
      });
      el.style.cursor = 'pointer';
    });

    // Trending items
    app.querySelectorAll('.trending-item').forEach(el => {
      el.addEventListener('click', () => {
        this.go('article', el.dataset.articleId);
      });
      el.style.cursor = 'pointer';
    });
  },

  updateNav(page, data) {
    // Update active states in nav
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
      if (page === 'category' && link.dataset.category === data) {
        link.classList.add('active');
      }
    });
  }
};

// ── HOME PAGE LAYOUT ─────────────────────────────────────────
function renderHomePage() {
  const featured = getFeaturedArticle();
  const allArticles = getAllArticles();
  const nonFeatured = allArticles.filter(a => a.id !== featured.id);
  const latest = nonFeatured.slice(0, 6);

  return `
    ${renderHero(featured)}
    ${renderLeaderboardAd('home-top')}
    <div class="home-layout">
      <main class="home-main">
        <section class="home-section">
          <h2 class="section-heading">Latest</h2>
          <div class="articles-grid">
            ${latest.slice(0, 2).map(a => renderArticleCard(a)).join('')}
          </div>
          ${renderInFeedAd()}
          <div class="articles-grid">
            ${latest.slice(2, 4).map(a => renderArticleCard(a)).join('')}
          </div>
          <div class="articles-grid">
            ${latest.slice(4, 6).map(a => renderArticleCard(a)).join('')}
          </div>
        </section>
        ${renderNewsletterBanner()}
      </main>
      ${renderSidebar()}
    </div>
  `;
}
