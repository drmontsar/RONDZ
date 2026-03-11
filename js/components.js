// ============================================================
// components.js — Rounds: Reusable UI Components
// Each function returns an HTML string or DOM element.
// ============================================================
import { getFeaturedArticle, getAllArticles, getArticlesByCategory, CATEGORIES } from "./data.js";

// ── NAV ─────────────────────────────────────────────────────
export function renderNav(activePage = 'home') {
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
      <!-- Mobile Toggle -->
      <button class="nav-hamburger" id="nav-hamburger" aria-label="Menu">
        <span></span><span></span><span></span>
      </button>
    </div>
    
    <!-- Mobile Menu -->
    <div class="nav-mobile" id="nav-mobile">
      <div class="nav-mobile-inner">
        ${CATEGORIES.map(cat => `
          <a href="#" class="nav-mobile-link ${activePage === cat ? 'active' : ''}" 
             data-page="category" data-category="${cat}">${cat}</a>
        `).join('')}
        <a href="#" class="nav-mobile-link" data-page="about">About Rounds</a>
        <a href="admin.html" class="nav-mobile-link" style="color:var(--text);margin-top:1rem;">Admin Login</a>
      </div>
    </div>

    <!-- Search Overlay -->
    <div class="search-bar" id="search-bar">
      <div class="search-bar-inner">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--muted)" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
        <input type="text" id="search-input" class="search-input" placeholder="Search articles, topics, or authors..." autocomplete="off"/>
        <button class="search-close" id="search-close" aria-label="Close search">✕</button>
      </div>
      <div class="search-results" id="search-results"></div>
    </div>
  </nav>`;
}

// ── FOOTER ──────────────────────────────────────────────────
export function renderFooter() {
  return `
  <footer class="footer">
    <div class="footer-inner">
      <div class="footer-brand">
        <div class="footer-logo">Rounds</div>
        <p class="footer-desc">Independent technology journalism for physicians. Written by doctors, for doctors.</p>
      </div>
      <div class="footer-links">
        <div class="footer-col">
          <h4>Topics</h4>
          ${CATEGORIES.map(cat => `<a href="#" class="footer-link" data-page="category" data-category="${cat}">${cat}</a>`).join('')}
        </div>
        <div class="footer-col">
          <h4>Rounds</h4>
          <a href="#" class="footer-link" data-page="about">About Us</a>
          <a href="#" class="footer-link">Pitch a Story</a>
          <a href="#" class="footer-link">Sponsorships</a>
        </div>
        <div class="footer-col">
          <h4>Legal</h4>
          <a href="#" class="footer-link">Privacy Policy</a>
          <a href="#" class="footer-link">Terms of Service</a>
          <a href="admin.html" class="footer-link" style="color:var(--muted);margin-top:0.5rem">Admin</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; ${new Date().getFullYear()} Rounds Media. Not medical advice.</p>
    </div>
  </footer>`;
}

// ── SIDEBAR ──────────────────────────────────────────────────
export async function renderSidebar() {
  const articles = await getAllArticles();
  const sidebarList = articles.slice(0, 5);
  return `
  <aside class="sidebar">
    ${renderAdSlot('sidebar-top', 'Rectangle Ad', '300×250')}
    
    <div class="sidebar-trending">
      <h3 class="sidebar-heading">Trending</h3>
      <ol class="trending-list">
        ${sidebarList.map((a, i) => `
          <li class="trending-item" data-article-id="${a.id}">
            <span class="trending-num">${String(i + 1).padStart(2, '0')}</span>
            <div class="trending-info">
              <span class="trending-cat">${a.category}</span>
              <h4 class="trending-title">${a.title}</h4>
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
export function renderAdSlot(id, label, size) {
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

export function renderLeaderboardAd(id) {
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

// ── NEWSLETTER ───────────────────────────────────────────────
export function renderNewsletterWidget() {
  const id = 'nl-widget-' + Math.random().toString(36).substr(2, 5);
  return `
  <div class="newsletter-widget">
    <div class="newsletter-icon">✉️</div>
    <h3 class="newsletter-title">The Sunday Ward</h3>
    <p class="newsletter-desc">One email a week. The tech that actually matters to your clinical practice.</p>
    <div class="newsletter-form">
      <input type="email" id="${id}" class="newsletter-input" placeholder="dr@hospital.org" autocomplete="email"/>
      <button class="newsletter-btn" onclick="handleNewsletterSignup('${id}')">Subscribe</button>
    </div>
  </div>`;
}

export function renderNewsletterBanner() {
  const id = 'nl-banner-' + Math.random().toString(36).substr(2, 5);
  return `
  <section class="newsletter-banner">
    <div class="newsletter-banner-content">
      <h2>Join 14,000+ physicians</h2>
      <p>Get our weekly breakdown of healthcare technology, free from vendor spin.</p>
    </div>
    <div class="newsletter-banner-form">
      <div style="display:flex;gap:0.5rem;width:100%;max-width:400px;">
        <input type="email" id="${id}" class="newsletter-input" style="border:none" placeholder="Enter your email" autocomplete="email"/>
        <button class="btn-primary" onclick="handleNewsletterSignup('${id}')">Subscribe</button>
      </div>
    </div>
  </section>`;
}

// ── CARDS & COMPONENTS ───────────────────────────────────────
export function renderArticleCard(article, isLarge = false) {
  return `
  <article class="article-card ${isLarge ? 'article-card--large' : ''}" data-article-id="${article.id}">
    <div class="article-image">
      <img src="${article.image}" alt="${article.title}" loading="lazy" />
      <span class="article-category-badge">${article.category}</span>
    </div>
    <div class="article-content">
      <h3 class="article-title">${article.title}</h3>
      <p class="article-summary">${article.summary}</p>
      <div class="article-meta">
        <span class="article-author">${article.author}</span>
        <span class="article-date">${formatDate(article.date)} · ${article.readTime}</span>
      </div>
    </div>
  </article>`;
}

export function renderInFeedAd() {
  return `
  <div class="in-feed-ad">
    <span class="ad-label">Sponsored</span>
    <div class="ad-placeholder" style="aspect-ratio:auto;height:120px;margin-top:0.5rem;">
      <span class="ad-hint">In-Feed Native Ad</span>
    </div>
  </div>`;
}

export function renderHero(article) {
  if (!article) return '';
  return `
  <section class="hero" style="background-image: linear-gradient(to top, rgba(14,23,38,1) 0%, rgba(14,23,38,0.2) 100%), url('${article.image}')">
    <div class="hero-content">
      <span class="hero-category">${article.category}</span>
      <h1 class="hero-title">${article.title}</h1>
      <p class="hero-summary">${article.summary}</p>
      <div class="hero-meta">
        <span>By ${article.author}</span>
        <span style="opacity:0.6;margin:0 0.5rem;">|</span>
        <span>${formatDate(article.date)}</span>
      </div>
      <button class="hero-cta" data-article-id="${article.id}">Read Article →</button>
    </div>
  </section>`;
}

// ── ARTICLE VIEW ─────────────────────────────────────────────
export async function renderArticleView(article) {
  const allArticles = await getAllArticles();
  const related = allArticles
    .filter(a => a.id !== article.id && a.category === article.category)
    .slice(0, 3);

  return `
  <div class="article-view">
    ${renderLeaderboardAd('article-top')}
    
    <header class="article-header">
      <div class="article-header-inner">
        <span class="article-category">${article.category}</span>
        <h1 class="article-headline">${article.title}</h1>
        <p class="article-deck">${article.summary}</p>
        
        <div class="article-author-block">
          <div class="author-avatar">${article.author.charAt(0)}</div>
          <div class="author-info">
            <div class="author-name">${article.author}</div>
            <div class="author-title">${article.authorTitle || 'Contributor'}</div>
            <div class="author-date">${formatDate(article.date)} · ${article.readTime}</div>
          </div>
        </div>
      </div>
    </header>

    <div class="article-hero-image">
      <img src="${article.image}" alt="${article.title}" />
    </div>

    <div class="article-layout">
      <main class="article-body">
        ${article.body}
        
        <div class="article-footer">
          <div class="share-links">
            <button class="share-btn" onclick="navigator.clipboard.writeText(window.location.href);alert('Link copied!')">🔗 Copy Link</button>
            <button class="share-btn" onclick="window.open('https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}&url=${encodeURIComponent(window.location.href)}')">🐦 Twitter</button>
          </div>
        </div>

        ${related.length > 0 ? `
          <div class="related-articles">
            <h3 class="related-heading">More in ${article.category}</h3>
            <div class="articles-grid">
              ${related.map(a => renderArticleCard(a)).join('')}
            </div>
          </div>` : ''}
      </main>
      <aside class="article-sidebar">
        ${await renderSidebar()}
      </aside>
    </div>
  </div>`;
}

// ── CATEGORY PAGE ─────────────────────────────────────────────
export async function renderCategoryPage(category) {
  const articles = await getArticlesByCategory(category);
  return `
  <div class="category-page">
    <div class="category-header">
      <h1 class="category-title">${category}</h1>
      <p class="category-desc">${getCategoryDescription(category)}</p>
    </div>
    
    <div class="home-layout">
      <div class="home-main">
        ${articles.length === 0
      ? '<p class="error-state">No published articles in this category yet.</p>'
      : `<div class="articles-grid">
              ${articles.map((a, i) => {
        if (i === 2) return `</div>${renderLeaderboardAd('cat-mid')}<div class="articles-grid">` + renderArticleCard(a);
        return renderArticleCard(a);
      }).join('')}
            </div>`
    }
      </div>
      ${await renderSidebar()}
    </div>
  </div>`;
}

// ── ABOUT PAGE ────────────────────────────────────────────────
export function renderAboutPage() {
  return `
  <div class="about-page">
    <div class="about-header">
      <h1 class="about-title">About Rounds</h1>
    </div>
    <div class="about-content">
      <h2>The Signal in the Noise</h2>
      <p>Healthcare technology is evolving faster than ever. From ambient scribes to robotic surgery, AI diagnostics to interoperability mandates — the tools we use are changing the way we practice medicine.</p>
      <p>But too often, the conversation is dominated by vendor press releases and tech-evangelist hype.</p>
      <p><strong>Rounds</strong> was built to be the antidote. We provide a space for actual clinicians to discuss, dissect, and debate the technology entering our hospitals and clinics.</p>
      
      <div style="margin:3rem 0;padding:2rem;background:var(--cream);border-left:4px solid var(--teal)">
        <h3 style="margin-top:0">Our Philosophy</h3>
        <ul style="padding-left:1.5rem;line-height:1.8">
          <li><strong>Clinical utility above all else.</strong> Does it actually improve patient outcomes or physician workflow?</li>
          <li><strong>Written by doctors, for doctors.</strong> Our contributors practice medicine.</li>
          <li><strong>Off-label honesty.</strong> We talk about what the tech actually does, not what the marketing brochure promises.</li>
        </ul>
      </div>

      <h2>Pitch a Story</h2>
      <p>Are you a physician with a perspective on a new piece of technology? We want to hear from you. We accept pitches for op-eds, deep-dives, and clinical reviews of software/hardware.</p>
      <button class="btn-primary" style="margin-top:1rem" onclick="window.location.href='mailto:editor@roundsmd.com'">Email the Editor</button>
    </div>
  </div>`;
}

// ── UTILITIES ────────────────────────────────────────────────
export function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export function getCategoryDescription(category) {
  const descriptions = {
    'AI & Diagnostics': 'Honest clinical perspectives on artificial intelligence in medicine — what the algorithms get right, what they get wrong, and how to practice with them.',
    'EHR & Software': 'Unfiltered takes on the software running our hospitals. Workflows, vendors, burnout, and what actually works.',
    'Surgical Technology': 'Robotic platforms, imaging advances, and the evidence (or lack of it) behind the technology in our ORs.',
    'Wearables & Remote Care': 'Consumer devices and remote monitoring in clinical practice — the data flood, the false positives, and the genuine wins.'
  };
  return descriptions[category] || '';
}

import { collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

async function handleNewsletterSignup(inputId) {
  const input = document.getElementById(inputId);
  if (!input || !input.value.includes('@')) {
    alert('Please enter a valid email address.');
    return;
  }

  if (window.db) {
    try {
      await addDoc(collection(window.db, "subscribers"), {
        email: input.value,
        timestamp: new Date().toISOString()
      });
    } catch (e) { console.error('Error saving subscriber to Firebase:', e); }
  } else {
    // Fallback if not configured
    const emails = JSON.parse(localStorage.getItem('rounds_emails') || '[]');
    if (!emails.includes(input.value)) {
      emails.push(input.value);
      localStorage.setItem('rounds_emails', JSON.stringify(emails));
    }
  }

  input.value = '';
  const btn = input.nextElementSibling;
  const original = btn.textContent;
  btn.textContent = '✓ You\'re in!';
  btn.style.background = '#00b4a6';
  setTimeout(() => { btn.textContent = original; btn.style.background = ''; }, 3000);
}

// Make globally available since it's triggered from inline HTML
window.handleNewsletterSignup = handleNewsletterSignup;
