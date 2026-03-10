// ============================================================
// admin.js — Rounds Admin Panel Logic
// Handles auth, article CRUD, and editor interactions.
// ============================================================

const ADMIN_PASSWORD = 'offLabel1';

// ── AUTH ─────────────────────────────────────────────────────
function checkAuth() {
  return sessionStorage.getItem('rounds_admin_auth') === 'true';
}

function login(password) {
  if (password === ADMIN_PASSWORD) {
    sessionStorage.setItem('rounds_admin_auth', 'true');
    return true;
  }
  return false;
}

function logout() {
  sessionStorage.removeItem('rounds_admin_auth');
  location.reload();
}

// ── ARTICLE STORAGE ───────────────────────────────────────────
function getAdminArticles() {
  try {
    return JSON.parse(localStorage.getItem('rounds_articles') || '[]');
  } catch (e) { return []; }
}

function saveAdminArticles(articles) {
  localStorage.setItem('rounds_articles', JSON.stringify(articles));
}

function generateId() {
  return 'user-' + Date.now() + '-' + Math.random().toString(36).slice(2, 7);
}

// ── TOAST ─────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast visible' + (isError ? ' error' : '');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3000);
}

// ── NAVIGATION ────────────────────────────────────────────────
function showPage(pageId) {
  document.querySelectorAll('.admin-page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.admin-nav-item').forEach(n => n.classList.remove('active'));
  document.getElementById('page-' + pageId)?.classList.add('active');
  document.querySelector(`[data-nav="${pageId}"]`)?.classList.add('active');
}

// ── ARTICLES LIST PAGE ────────────────────────────────────────
function renderArticlesTable() {
  const userArticles = getAdminArticles();
  let deletedSeeds = [];
  try {
    deletedSeeds = JSON.parse(localStorage.getItem('rounds_deleted_seeds') || '[]');
  } catch (e) { }
  const seedArticles = SEED_ARTICLES.filter(a => !deletedSeeds.includes(a.id));
  const all = [...userArticles, ...seedArticles];

  const tbody = document.getElementById('articles-tbody');
  if (!tbody) return;

  tbody.innerHTML = all.map(article => {
    const isUser = !article.id.startsWith('seed-');
    return `
    <tr>
      <td>
        <div class="table-title">${article.title}</div>
        <div style="font-size:0.72rem;color:var(--muted);margin-top:0.2rem">${article.author}</div>
      </td>
      <td><span class="table-cat">${article.category}</span></td>
      <td class="table-date">${formatDateAdmin(article.date)}</td>
      <td>
        ${article.featured ? '<span class="table-badge table-badge--featured">Featured</span>' : ''}
        <span class="table-badge ${isUser ? 'table-badge--published' : 'table-badge--seed'}">
          ${isUser ? 'Published' : 'Seed'}
        </span>
      </td>
      <td>
        <div class="table-actions">
          ${isUser ? `
            <button class="btn-icon" onclick="editArticle('${article.id}')" title="Edit">✏️</button>
            <button class="btn-icon btn-icon--feature" onclick="toggleFeatured('${article.id}')" title="Toggle Featured">⭐</button>
            <button class="btn-icon btn-icon--delete" onclick="deleteArticle('${article.id}')" title="Delete">🗑</button>
          ` : `
            <span style="font-size:0.72rem;color:var(--muted);margin-right:0.5rem;">Built-in</span>
            <button class="btn-icon btn-icon--delete" onclick="deleteArticle('${article.id}')" title="Delete">🗑</button>
          `}
        </div>
      </td>
    </tr>`;
  }).join('');

  // Update stats
  document.getElementById('stat-total').textContent = all.length;
  document.getElementById('stat-user').textContent = userArticles.length;
  document.getElementById('stat-categories').textContent = new Set(all.map(a => a.category)).size;
  const emails = JSON.parse(localStorage.getItem('rounds_emails') || '[]');
  document.getElementById('stat-emails').textContent = emails.length;
}

function deleteArticle(id, fromForm = false) {
  if (!confirm('Delete this article? This cannot be undone.')) return;

  if (id.startsWith('seed-')) {
    let deletedSeeds = [];
    try { deletedSeeds = JSON.parse(localStorage.getItem('rounds_deleted_seeds') || '[]'); } catch (e) { }
    deletedSeeds.push(id);
    localStorage.setItem('rounds_deleted_seeds', JSON.stringify(deletedSeeds));
  } else {
    const articles = getAdminArticles().filter(a => a.id !== id);
    saveAdminArticles(articles);
  }

  renderArticlesTable();
  showToast('Article deleted.');
  if (fromForm) {
    resetForm();
    showPage('articles');
  }
}

function toggleFeatured(id) {
  const articles = getAdminArticles().map(a => ({ ...a, featured: a.id === id }));
  saveAdminArticles(articles);
  renderArticlesTable();
  showToast('Featured article updated.');
}

function editArticle(id) {
  const article = getAdminArticles().find(a => a.id === id);
  if (!article) return;
  populateForm(article);
  showPage('new');
}

// ── NEW ARTICLE FORM ──────────────────────────────────────────
let editingId = null;

function populateForm(article) {
  editingId = article.id;
  document.getElementById('form-title').value = article.title || '';
  document.getElementById('form-author').value = article.author || '';
  document.getElementById('form-author-title').value = article.authorTitle || '';
  document.getElementById('form-category').value = article.category || '';
  document.getElementById('form-readtime').value = article.readTime || '';
  document.getElementById('form-date').value = article.date || '';
  document.getElementById('form-summary').value = article.summary || '';
  document.getElementById('form-image').value = article.image || '';
  document.getElementById('form-featured').checked = article.featured || false;
  document.getElementById('editor-content').innerHTML = article.body || '';
  document.getElementById('form-submit-btn').textContent = 'Update Article';
  const deleteBtn = document.getElementById('btn-delete-article');
  if (deleteBtn) deleteBtn.style.display = 'inline-block';
  showPage('new');
  window.scrollTo(0, 0);
}

function resetForm() {
  editingId = null;
  document.getElementById('article-form').reset();
  document.getElementById('editor-content').innerHTML = '';
  document.getElementById('form-submit-btn').textContent = 'Publish Article';
  const deleteBtn = document.getElementById('btn-delete-article');
  if (deleteBtn) deleteBtn.style.display = 'none';
  document.getElementById('form-success').classList.remove('visible');
}

function handleFormSubmit(e) {
  e.preventDefault();

  const title = document.getElementById('form-title').value.trim();
  const author = document.getElementById('form-author').value.trim();
  const category = document.getElementById('form-category').value;
  const body = document.getElementById('editor-content').innerHTML.trim();

  if (!title || !author || !category || !body || body === '') {
    showToast('Please fill in all required fields.', true);
    return;
  }

  const article = {
    id: editingId || generateId(),
    title,
    author,
    authorTitle: document.getElementById('form-author-title').value.trim(),
    category,
    readTime: document.getElementById('form-readtime').value.trim() || '5 min read',
    date: document.getElementById('form-date').value || new Date().toISOString().split('T')[0],
    summary: document.getElementById('form-summary').value.trim(),
    image: document.getElementById('form-image').value.trim() || 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80',
    featured: document.getElementById('form-featured').checked,
    body
  };

  let articles = getAdminArticles();

  if (editingId) {
    articles = articles.map(a => a.id === editingId ? article : a);
    showToast('Article updated successfully!');
  } else {
    articles.unshift(article);
    showToast('Article published successfully!');
  }

  // If setting as featured, unfeature others
  if (article.featured) {
    articles = articles.map(a => ({ ...a, featured: a.id === article.id }));
  }

  saveAdminArticles(articles);
  document.getElementById('form-success').classList.add('visible');
  setTimeout(() => {
    resetForm();
    showPage('articles');
    renderArticlesTable();
  }, 1500);
}

// ── RICH TEXT EDITOR ──────────────────────────────────────────
function execCmd(command, value = null) {
  document.getElementById('editor-content').focus();
  document.execCommand(command, false, value);
}

function insertHeading() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const h2 = document.createElement('h2');
    h2.textContent = selection.toString() || 'Section Heading';
    range.deleteContents();
    range.insertNode(h2);
    // Move cursor after the heading
    const newRange = document.createRange();
    newRange.setStartAfter(h2);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  }
}

function insertLink() {
  const url = prompt('Enter URL:');
  if (url) execCmd('createLink', url);
}

// ── IMAGE HANDLING ────────────────────────────────────────────
function setupImageUpload() {
  const area = document.getElementById('image-upload-area');
  const fileInput = document.getElementById('image-file-input');
  const preview = document.getElementById('image-preview');
  const urlInput = document.getElementById('form-image');

  if (!area) return;

  area.addEventListener('click', () => fileInput.click());

  area.addEventListener('dragover', (e) => { e.preventDefault(); area.style.borderColor = 'var(--teal)'; });
  area.addEventListener('dragleave', () => { area.style.borderColor = ''; });
  area.addEventListener('drop', (e) => {
    e.preventDefault();
    area.style.borderColor = '';
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) handleImageFile(file, preview, urlInput, area);
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files[0]) handleImageFile(fileInput.files[0], preview, urlInput, area);
  });

  urlInput.addEventListener('input', () => {
    if (urlInput.value.startsWith('http')) {
      preview.src = urlInput.value;
      preview.classList.add('visible');
      area.classList.add('has-image');
    }
  });
}

function handleImageFile(file, preview, urlInput, area) {
  const reader = new FileReader();
  reader.onload = (e) => {
    preview.src = e.target.result;
    preview.classList.add('visible');
    area.classList.add('has-image');
    urlInput.value = e.target.result; // base64 for local preview
  };
  reader.readAsDataURL(file);
}

// ── SETTINGS ──────────────────────────────────────────────────
function handlePasswordChange(e) {
  e.preventDefault();
  const current = document.getElementById('current-password').value;
  const newPw = document.getElementById('new-password').value;
  const confirm = document.getElementById('confirm-password').value;

  if (current !== ADMIN_PASSWORD) { showToast('Current password incorrect.', true); return; }
  if (newPw !== confirm) { showToast('New passwords do not match.', true); return; }
  if (newPw.length < 6) { showToast('Password must be at least 6 characters.', true); return; }

  showToast('Password note: to permanently change, edit ADMIN_PASSWORD in admin.js');
  e.target.reset();
}

function exportEmails() {
  const emails = JSON.parse(localStorage.getItem('rounds_emails') || '[]');
  if (emails.length === 0) { showToast('No emails collected yet.', true); return; }
  const blob = new Blob([emails.join('\n')], { type: 'text/csv' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'rounds-subscribers.csv';
  a.click();
  showToast(`Exported ${emails.length} emails.`);
}

// ── FORMAT DATE ───────────────────────────────────────────────
function formatDateAdmin(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// ── INIT ──────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const loginScreen = document.getElementById('login-screen');
  const adminApp = document.getElementById('admin-app');
  const loginForm = document.getElementById('login-form');
  const loginError = document.getElementById('login-error');

  // Auth gate
  if (checkAuth()) {
    loginScreen.style.display = 'none';
    adminApp.style.display = 'flex';
    init();
  }

  loginForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const pw = document.getElementById('login-password').value;
    if (login(pw)) {
      loginScreen.style.display = 'none';
      adminApp.style.display = 'flex';
      init();
    } else {
      loginError.style.display = 'block';
      loginError.textContent = 'Incorrect password.';
    }
  });

  function init() {
    // Nav items
    document.querySelectorAll('.admin-nav-item').forEach(item => {
      item.addEventListener('click', () => {
        if (item.dataset.nav === 'new') resetForm();
        showPage(item.dataset.nav);
      });
    });

    // Article form
    document.getElementById('article-form')?.addEventListener('submit', handleFormSubmit);
    document.getElementById('btn-new-article')?.addEventListener('click', () => { resetForm(); showPage('new'); });
    document.getElementById('btn-cancel-form')?.addEventListener('click', () => { resetForm(); showPage('articles'); });
    document.getElementById('btn-delete-article')?.addEventListener('click', () => {
      if (editingId) {
        deleteArticle(editingId, true);
      }
    });

    // Settings
    document.getElementById('password-form')?.addEventListener('submit', handlePasswordChange);
    document.getElementById('btn-export-emails')?.addEventListener('click', exportEmails);
    document.getElementById('btn-clear-articles')?.addEventListener('click', () => {
      if (confirm('Delete ALL user-created articles? Seed articles will remain (and deleted ones restored).')) {
        localStorage.removeItem('rounds_articles');
        localStorage.removeItem('rounds_deleted_seeds');
        renderArticlesTable();
        showToast('Data reset.');
      }
    });

    // Logout
    document.getElementById('btn-logout')?.addEventListener('click', logout);

    // Category options
    const catSelect = document.getElementById('form-category');
    if (catSelect) {
      CATEGORIES.forEach(cat => {
        const opt = document.createElement('option');
        opt.value = cat; opt.textContent = cat;
        catSelect.appendChild(opt);
      });
    }

    // Set default date to today
    const dateInput = document.getElementById('form-date');
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    setupImageUpload();
    renderArticlesTable();
    showPage('articles');
  }
});
