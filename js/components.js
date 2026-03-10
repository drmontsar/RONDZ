// ============================================================
// components.js — Rounds: Reusable UI Components
// Each function returns an HTML string or DOM element.
// ============================================================

// ── NAV ─────────────────────────────────────────────────────
function renderNav(activePage = 'home') {
  return `
  <nav class="nav" id="main-nav">
    <div class="nav-inner">
      <a class="nav-logo" href="#" data-page="home">
        <span class="logo-rounds">Rounds</span>
        <span class="logo-sub">an off-label tech discussion</span>
      </a>
      <div class="nav-links">
        ${CATEGORIES.map(cat => `
          <a href="#" class="nav-link ${activePage === cat ? 'active' : ''}" 
             data-page="category" data-category="${cat}">${cat}</a>
        `).join('')}
      </div>
      <div class="nav-actions">
        <button class="nav-search-btn" id="search-toggle" aria-label="Search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        </button>
        <a href="admin.html" class="nav-admin-link" title="Admin">●</a>
      </div>
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile" id="nav-mobile">
      ${CATEGORIES.map(cat => `
        <a href="#" class="nav-mobile-link" data-page="category" data-category="${cat}">${cat}</a>
      `).join('')}
    </div>
    <div class="search-bar" id="search-bar">
      <div class="search-inner">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="search-input" placeholder="Search articles..." autocomplete="off"/>
        <button id="search-close">✕</button>
      </div>
      <div class="search-results" id="search-results"></div>
    </div>
  </nav>`;
}

// ── HERO ─────────────────────────────────────────────────────
function renderHero(article) {
  return `
  <section class="hero" data-article-id="${article.id}">
    <div class="hero-image-wrap">
      <img src="${article.image}" alt="${article.title}" class="hero-image"/>
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
      <span class="category-badge">${article.category}</span>
      <h1 class="hero-title">${article.title}</h1>
      <p class="hero-summary">${article.summary}</p>
      <div class="hero-meta">
        <span class="hero-author">${article.author}</span>
        <span class="hero-dot">·</span>
        <span class="hero-date">${formatDate(article.date)}</span>
        <span class="hero-dot">·</span>
        <span class="hero-readtime">${article.readTime}</span>
      </div>
      <button class="hero-cta" data-article-id="${article.id}">Read Article →</button>
    </div>
  </section>`;
}

// ── ARTICLE CARD ─────────────────────────────────────────────
function renderArticleCard(article, size = 'normal') {
  return `
  <article class="article-card ${size === 'large' ? 'article-card--large' : ''}" data-article-id="${article.id}">
    <div class="card-image-wrap">
      <img src="${article.image}" alt="${article.title}" class="card-image" loading="lazy"/>
      <span class="card-category">${article.category}</span>
    </div>
    <div class="card-body">
      <h2 class="card-title">${article.title}</h2>
      <p class="card-summary">${article.summary}</p>
      <div class="card-meta">
        <span class="card-author">${article.author}</span>
        <span class="card-dot">·</span>
        <span class="card-date">${formatDate(article.date)}</span>
        <span class="card-dot">·</span>
        <span class="card-readtime">${article.readTime}</span>
      </div>
    </div>
  </article>`;
}

// ── SIDEBAR ──────────────────────────────────────────────────
function renderSidebar() {
  const articles = getAllArticles().slice(0, 5);
  return `
  <aside class="sidebar">
    ${renderAdSlot('sidebar-top', 'Rectangle Ad', '300×250')}
    <div class="sidebar-section">
      <h3 class="sidebar-heading">Trending</h3>
      <ol class="trending-list">
        ${articles.map((a, i) => `
          <li class="trending-item" data-article-id="${a.id}">
            <span class="trending-num">${String(i + 1).padStart(2, '0')}</span>
            <div class="trending-info">
              <span class="trending-cat">${a.category}</span>
              <p class="trending-title">${a.title}</p>
            </div>
          </li>
        `).join('')}
      </ol>
    </div>
    ${renderNewsletterWidget()}
    ${renderAdSlot('sidebar-bottom', 'Rectangle Ad', '300×600')}
  </aside>`;
}

// ── AD SLOTS ─────────────────────────────────────────────────
function renderAdSlot(id, label, size) {
  return `
  <div class="ad-slot" id="ad-${id}">
    <span class="ad-label">Advertisement</span>
    <div class="ad-placeholder">
      <div class="ad-placeholder-inner">
        <span class="ad-size">${size}</span>
        <span class="ad-hint">${label} · AdSense Ready</span>
      </div>
    </div>
    <!-- Replace the div above with your Google AdSense code:
    <ins class="adsbygoogle" style="display:block" data-ad-client="ca-pub-XXXX"
         data-ad-slot="XXXX" data-ad-format="auto"></ins>
    <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
    -->
  </div>`;
}

function renderLeaderboardAd(id) {
  return `
  <div class="ad-leaderboard" id="ad-${id}">
    <span class="ad-label">Advertisement</span>
    <div class="ad-placeholder ad-placeholder--leaderboard">
      <div class="ad-placeholder-inner">
        <span class="ad-size">728×90</span>
        <span class="ad-hint">Leaderboard Banner · AdSense Ready</span>
      </div>
    </div>
  </div>`;
}

function renderInFeedAd() {
  return `
  <div class="in-feed-ad">
    <span class="ad-label">Sponsored</span>
    <div class="in-feed-ad-inner">
      <div class="in-feed-ad-image"></div>
      <div class="in-feed-ad-body">
        <span class="in-feed-ad-tag">Sponsored Content</span>
        <p class="in-feed-ad-title">Discover how leading health systems are reducing documentation burden with AI</p>
        <span class="in-feed-ad-cta">Learn More →</span>
      </div>
    </div>
  </div>`;
}

// ── NEWSLETTER WIDGET ────────────────────────────────────────
function renderNewsletterWidget() {
  return `
  <div class="newsletter-widget">
    <div class="newsletter-icon">✉</div>
    <h4 class="newsletter-title">The Weekly Rounds</h4>
    <p class="newsletter-desc">One email. The best tech stories for physicians, every Friday.</p>
    <div class="newsletter-form">
      <input type="email" class="newsletter-input" placeholder="your@hospital.edu" id="sidebar-email"/>
      <button class="newsletter-btn" onclick="handleNewsletterSignup('sidebar-email')">Subscribe</button>
    </div>
    <p class="newsletter-note">No spam. Unsubscribe anytime.</p>
  </div>`;
}

// ── NEWSLETTER BANNER ────────────────────────────────────────
function renderNewsletterBanner() {
  return `
  <section class="newsletter-banner">
    <div class="newsletter-banner-inner">
      <div class="newsletter-banner-text">
        <h2 class="newsletter-banner-title">The Weekly Rounds</h2>
        <p class="newsletter-banner-desc">The week's most important tech stories for physicians. No press releases. No sponsored summaries. Just signal.</p>
      </div>
      <div class="newsletter-banner-form">
        <input type="email" class="newsletter-banner-input" placeholder="your@email.com" id="banner-email"/>
        <button class="newsletter-banner-btn" onclick="handleNewsletterSignup('banner-email')">Get the Newsletter →</button>
        <p class="newsletter-banner-note">Joining 4,200+ physicians. Free forever.</p>
      </div>
    </div>
  </section>`;
}

// ── FOOTER ───────────────────────────────────────────────────
function renderFooter() {
  return `
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <span class="footer-logo">Rounds</span>
        <p class="footer-tagline">an off-label tech discussion</p>
        <p class="footer-desc">Independent technology journalism for physicians. Written by doctors, for doctors.</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h5 class="footer-col-heading">Categories</h5>
          ${CATEGORIES.map(cat => `
            <a href="#" class="footer-link" data-page="category" data-category="${cat}">${cat}</a>
          `).join('')}
        </div>
        <div class="footer-col">
          <h5 class="footer-col-heading">Publication</h5>
          <a href="#" class="footer-link" data-page="about">About</a>
          <a href="#" class="footer-link">Write for Us</a>
          <a href="#" class="footer-link">Advertise</a>
          <a href="#" class="footer-link">Privacy Policy</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>© ${new Date().getFullYear()} Rounds. Independent. Ad-supported. Always off-label.</p>
    </div>
  </footer>`;
}

// ── ARTICLE VIEW ─────────────────────────────────────────────
function renderArticleView(article) {
  const related = getAllArticles()
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return `
  <div class="article-view">
    <div class="article-hero-image">
      <img src="${article.image}" alt="${article.title}"/>
    </div>
    <div class="article-layout">
      <main class="article-main">
        <div class="article-header">
          <span class="category-badge">${article.category}</span>
          <h1 class="article-title">${article.title}</h1>
          <div class="article-byline">
            <div class="byline-info">
              <span class="byline-name">${article.author}</span>
              <span class="byline-title">${article.authorTitle}</span>
            </div>
            <div class="byline-meta">
              <span>${formatDate(article.date)}</span>
              <span class="hero-dot">·</span>
              <span>${article.readTime}</span>
            </div>
          </div>
        </div>
        ${renderLeaderboardAd('article-top')}
        <div class="article-body">${article.body}</div>
        ${renderLeaderboardAd('article-bottom')}
        ${related.length > 0 ? `
          <div class="related-articles">
            <h3 class="related-heading">More in ${article.category}</h3>
            <div class="related-grid">
              ${related.map(a => renderArticleCard(a)).join('')}
            </div>
          </div>` : ''}
      </main>
      <aside class="article-sidebar">
        ${renderSidebar()}
      </aside>
    </div>
  </div>`;
}

// ── CATEGORY PAGE ─────────────────────────────────────────────
function renderCategoryPage(category) {
  const articles = getArticlesByCategory(category);
  return `
  <div class="category-page">
    <div class="category-header">
      <span class="category-badge category-badge--large">${category}</span>
      <h1 class="category-title">${category}</h1>
      <p class="category-desc">${getCategoryDescription(category)}</p>
    </div>
    ${renderLeaderboardAd('category-top')}
    <div class="category-layout">
      <div class="category-articles">
        ${articles.length === 0
          ? '<p class="empty-state">No articles yet in this category. Check back soon.</p>'
          : articles.map((a, i) => {
              const card = renderArticleCard(a, i === 0 ? 'large' : 'normal');
              return i === 2 ? card + renderInFeedAd() : card;
            }).join('')
        }
      </div>
      ${renderSidebar()}
    </div>
  </div>`;
}

// ── ABOUT PAGE ───────────────────────────────────────────────
function renderAboutPage() {
  return `
  <div class="about-page">
    <div class="about-header">
      <h1 class="about-title">About Rounds</h1>
      <p class="about-subtitle">an off-label tech discussion</p>
    </div>
    <div class="about-body">
      <div class="about-text">
        <p>Rounds started as a simple question: why is most health tech journalism written by people who have never been on call?</p>
        <p>The publications that cover medical technology well are mostly written for investors, administrators, or developers. The people actually using the technology — physicians, nurses, residents — often get the press release version.</p>
        <p>Rounds is different. Every article here is written by a practicing clinician. The opinions are independent. The criticism is honest. The praise, when it appears, is earned.</p>
        <h2>What We Cover</h2>
        <p>We write about AI and diagnostic tools, EHR platforms and software, surgical robotics and technology, and wearables and remote monitoring — through the lens of what actually happens when these tools meet real patients in real clinical settings.</p>
        <h2>Advertise with Rounds</h2>
        <p>Rounds is supported by advertising from companies building technology for healthcare. We maintain strict editorial independence — advertisers have no influence over our coverage. If you're interested in reaching a physician audience, <a href="#">contact us</a>.</p>
      </div>
    </div>
  </div>`;
}

// ── UTILITIES ────────────────────────────────────────────────
function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

function getCategoryDescription(category) {
  const descriptions = {
    'AI & Diagnostics': 'Honest clinical perspectives on artificial intelligence in medicine — what the algorithms get right, what they get wrong, and how to practice with them.',
    'EHR & Software': 'Unfiltered takes on the software running our hospitals. Workflows, vendors, burnout, and what actually works.',
    'Surgical Technology': 'Robotic platforms, imaging advances, and the evidence (or lack of it) behind the technology in our ORs.',
    'Wearables & Remote Care': 'Consumer devices and remote monitoring in clinical practice — the data flood, the false positives, and the genuine wins.'
  };
  return descriptions[category] || '';
}

function handleNewsletterSignup(inputId) {
  const input = document.getElementById(inputId);
  if (!input || !input.value.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }
  // Store locally (replace with your email service: Mailchimp, ConvertKit, etc.)
  const emails = JSON.parse(localStorage.getItem('rounds_emails') || '[]');
  if (!emails.includes(input.value)) {
    emails.push(input.value);
    localStorage.setItem('rounds_emails', JSON.stringify(emails));
  }
  input.value = '';
  const btn = input.nextElementSibling;
  const original = btn.textContent;
  btn.textContent = '✓ You\'re in!';
  btn.style.background = '#00b4a6';
  setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 3000);
}
